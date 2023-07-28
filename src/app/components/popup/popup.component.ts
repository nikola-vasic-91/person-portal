import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { NeltService } from 'src/app/shared/nelt-service.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  username: string = '';
  password: string = '';
  error :string = '';
  constructor(private userService: AuthService, private router: Router, private service:NeltService) { }

  ngOnInit(): void {
  }

  async submit() {
    if (this.username === "neltakcije" || this.username === "neltadmin") {
      this.username = this.username + "@nelt.com";
    }
    await this.userService.login(this.username, this.password);
  }

}
