import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Akcija } from 'src/app/models/akcija';
import { NeltService } from 'src/app/shared/nelt-service.service';
import { PopupComponent } from '../popup/popup.component';


@Component({
  selector: 'app-akcija',
  templateUrl: './akcija.component.html'
})
export class AkcijaComponent implements OnInit {
  showTable: boolean | undefined;
  public akcijeData: Array<Akcija> = [];
  public filteredData: Array<Akcija> = [];
  public filterValue: string = '';
  public brendFilterValue: string = '';
  public availableKupacValues: string[] = [];
  public availableBrendValues: string[] = [];
  
  subscription: any;
  constructor(private neltService: NeltService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAkcijeData();
    const item = localStorage.getItem('auth');
        if (item === "admin" || item === "akcije") {
          this.selectedNavItem(true);

        }
    this.subscription = this.neltService.getNavChangeEmitter()
      .subscribe(item => this.selectedNavItem(item));
  }

  selectedNavItem(item: boolean) {
    this.showTable = item;
  }

  private async getAkcijeData() {
    await this.neltService.getAkcije().subscribe(
        a => this.akcije(a)
        );
  }

  private akcije(a: Array<Akcija>) {
    this.akcijeData = a;
    this.filteredData = a;
    this.extractAvailableKupacValues();
    this.extractAvailableBrendValues();
  }

  private extractAvailableKupacValues() {
    const uniqueKupacValues = new Set<string>();
    for (const akcija of this.akcijeData) {
      uniqueKupacValues.add(akcija.kupac);
    }
    this.availableKupacValues = Array.from(uniqueKupacValues);
  }

  private extractAvailableBrendValues() {
    const uniqueBrendValues = new Set<string>();
    for (const akcija of this.akcijeData) {
      uniqueBrendValues.add(akcija.brend);
    }
    this.availableBrendValues = Array.from(uniqueBrendValues);
  }

  public applyFilter() {
    this.filteredData = this.filterValue == '' && this.brendFilterValue == '' ? this.akcijeData :
    this.filterValue == '' && this.brendFilterValue !== '' ?  this.akcijeData.filter(akcija =>
      akcija.brend === this.brendFilterValue) : this.filterValue !== '' && this.brendFilterValue == '' ?
      this.akcijeData.filter(akcija =>
        akcija.kupac === this.filterValue) : this.akcijeData.filter(akcija =>
          akcija.kupac === this.filterValue && akcija.brend == this.brendFilterValue);
  }

  public clearFilter() {
    this.filterValue = '';
    this.brendFilterValue = '';
    this.filteredData = this.akcijeData;
  }
  

  public openDialog() {
    this.dialog.open(PopupComponent);
    console.log('ssss');
  }
}

