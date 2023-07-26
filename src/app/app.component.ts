import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    const item = localStorage.getItem('auth');
    if (item !== 'akcije' && item !== 'admin') {
      this.dialog.open(PopupComponent, {position: {left:'10px', top: '10px'} });
    }
  }
}
