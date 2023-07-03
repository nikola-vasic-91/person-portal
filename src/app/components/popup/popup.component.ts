import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  constructor(private dialog: MatDialog, private router: Router, private service:NeltService) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.username == "neltakcije" && this.password == "Sinergija2023.") {
      localStorage.setItem('auth','akcije')
      this.router.navigate(['/akcije']);
      this.service.emitNavChangeEvent(true);
      this.dialog.closeAll();
    } else if (this.username == "neltadmin" && this.password == "AdminPass6713") {
      localStorage.setItem('auth','admin')
      this.dialog.closeAll();
      this.router.navigate(['/akcije']);
      this.service.emitNavChangeEvent(true);
    } else {
      this.error = 'Nevalidno korisnicko ime ili lozinka';
    }
  }

}
