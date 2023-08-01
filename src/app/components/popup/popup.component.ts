import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  username: string = '';
  password: string = '';
  error :string = '';
  constructor(private userService: AuthService) {}

  ngOnInit(): void {}

  async submit() {
    await this.userService.login(this.username === "neltakcije" || this.username === "neltadmin" ? this.username + "@nelt.com"
    : this.username, this.password);
  }

  @HostListener('window:keyup.Enter', ['$event'])
  async onDialogClick(event: KeyboardEvent): Promise<void> {
    await this.submit();
  }
}
