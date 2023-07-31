import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dialog: MatDialog, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$?.subscribe(x => {
      if (!x) {
        this.dialog.open(PopupComponent, {
        hasBackdrop:true,
        disableClose: true,
        backdropClass: 'bdro'
      });
      }
    })
  }

  async logout() {
      await this.authService.logout();
  }
}
