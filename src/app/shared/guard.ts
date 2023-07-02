import { CanActivate, Router } from '@angular/router'; 
import { Injectable } from '@angular/core';

@Injectable()
export class Guard implements CanActivate {
    constructor(private router: Router){}
  canActivate() {
    const item = localStorage.getItem('auth');
    if (item !== 'admin') {
        this.router.navigate(['/akcije']);
      }
      return true;
  }
  
}