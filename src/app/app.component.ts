import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService, private dialog: MatDialog) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    const item = localStorage.getItem('auth');
    if (item !== 'akcije' && item !== 'admin') {
      this.dialog.open(PopupComponent, {position: {left:'10px', top: '10px'} });
    }
  }
}
