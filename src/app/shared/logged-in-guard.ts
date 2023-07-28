import { CanActivate, Router } from '@angular/router'; 
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService){}
  canActivate() {
    this.authService?.isLoggedIn$?.subscribe(isLoggedIn => 
      {
        if (!isLoggedIn) {
          this.router.navigate(['/akcije']);
        }
      });
      
    return true;
  }
}