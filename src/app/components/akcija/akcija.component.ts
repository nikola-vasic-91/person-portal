import { Component, OnInit } from '@angular/core';
import { Akcija } from 'src/app/models/akcija';
import { NeltService } from 'src/app/shared/nelt-service.service';


@Component({
  selector: 'app-akcija',
  templateUrl: './akcija.component.html'
})
export class AkcijaComponent implements OnInit {
  public akcijeData: Array<Akcija> = [];
  public filteredData: Array<Akcija> = [];
  public filterValue: string = '';
  public availableKupacValues: string[] = [];
  
  constructor(private neltService: NeltService) { }

  ngOnInit() {
    this.getAkcijeData();
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
  }

  private extractAvailableKupacValues() {
    const uniqueKupacValues = new Set<string>();
    for (const akcija of this.akcijeData) {
      uniqueKupacValues.add(akcija.kupac);
    }
    this.availableKupacValues = Array.from(uniqueKupacValues);
  }

  public applyFilter() {
    this.filteredData = this.filterValue == '' ? this.akcijeData : this.akcijeData.filter(akcija =>
      akcija.kupac === this.filterValue
    );
  }

  public clearFilter() {
    this.filterValue = '';
    this.filteredData = this.akcijeData;
  }
}

