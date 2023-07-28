import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';
import { Auth, authState, signOut, User, signInWithEmailAndPassword } from '@angular/fire/auth';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user: Observable<User | null> = EMPTY;
  isLoggedIn$: Observable<boolean> | undefined;
  isAdmin$: Observable<boolean> | undefined = of(false);

  constructor(
    private auth: Auth, 
    private toast: NgToastService, 
    private dialog: MatDialog, 
    private router: Router,
    private loadingService: LoaderService
  ) {
    if (auth) {
        this.user = authState(this.auth);

        this.isLoggedIn$ =  authState(this.auth).pipe(
            traceUntilFirst('auth'),
            map(u => !!u)
          );

          this.user.subscribe(user => user?.getIdTokenResult()
        .then((idTokenResult) => {
           if (idTokenResult.claims['admin'] === 'true') {
             this.isAdmin$ = of(true);
           } else {
            this.isAdmin$ = of(false);
           }
        }))
      }
  }

  async login(email: string, password: string) {
    this.loadingService.setLoading(true);
    return await signInWithEmailAndPassword(this.auth, email, password)
        .then(() => {
            this.dialog.closeAll();
            this.router.navigate(['/akcije']);
            this.loadingService.setLoading(false);
        })
        .catch(() => {
            this.toast.error({detail:"", summary:"Nevalidno korisničko ime ili lozinka.", position:'br', duration: 5000});
            this.loadingService.setLoading(false);
      });
  }

  async logout() {
    this.loadingService.setLoading(true);
    return await signOut(this.auth).then(() => {
      this.loadingService.setLoading(false);
    })
    .catch(() => {
        this.loadingService.setLoading(false);
  });
  }
}