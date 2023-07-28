import { CanActivate, Router } from '@angular/router'; 
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService){}
  canActivate() {
    this.authService?.isAdmin$?.subscribe(isAdmin => 
      {
        if (!isAdmin) {
          this.router.navigate(['/akcije']);
        }
      });
      
    return true;
  }
}