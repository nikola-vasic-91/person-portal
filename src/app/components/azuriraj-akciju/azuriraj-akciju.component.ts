import { Component } from '@angular/core';
import { Akcija } from 'src/app/models/akcija';
import { LoaderService } from 'src/app/shared/loader.service';
import { NeltService } from 'src/app/shared/nelt-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-azuriraj-akciju',
  templateUrl: './azuriraj-akciju.component.html'
})
export class AzurirajAkcijuComponent {
  fileToUpload: any;
  isDisabled: boolean = true;
  text: string = '   ';
  fileData: any;
  akcije: any[] = [];

  constructor(
    private neltService: NeltService,
    private loadingService: LoaderService) { }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
    this.isDisabled = false;
  }

  async uploadFile() {
    this.loadingService.setLoading(true);
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const data = new Uint8Array(fileReader.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array', raw: false });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const headers = this.getHeadersFromExcel(worksheet);
      if (!this.validateHeaders(headers)) {
        console.error("Excel file is not in the correct format.");
        return;
      }
      this.akcije = this.mapRowsToAkcije(worksheet, headers);

      await this.neltService.addAkcije(this.akcije)
        .then((a) => {}).finally(()=> this.loadingService.setLoading(false));
    };

    fileReader.readAsArrayBuffer(this.fileToUpload);
  }

  private getHeadersFromExcel(worksheet: any): string[] {
    const headers: string[] = [];
    const range = XLSX.utils.decode_range(worksheet['!ref']);

    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      const cellValue = worksheet[cellAddress]?.v;
      headers.push(cellValue);
    }

    return headers;
  }

  private validateHeaders(headers: string[]): boolean {
    return headers.length === 8 && headers[0] === "Kupac" && headers[1] === "Tip akcije"
      && headers[2] === "Brend" && headers[3] === "Sif Art" && headers[4] === "Artikal"
      && headers[5] === "Cijena" && headers[6].includes("etak") && headers[6].includes("akcije")
      && headers[7] === "Kraj akcije";
  }

  private mapRowsToAkcije(worksheet: any, headers: string[]): any[] {
    const akcije: Akcija[] = [];
    const range = XLSX.utils.decode_range(worksheet['!ref']);

    for (let row = range.s.r + 1; row <= range.e.r; row++) {
      const akcija: Akcija = {
        kupac: '',
        tipAkcije: '',
        brend: '',
        sifArt: '',
        artikal: '',
        cijena: '',
        pocetakAkcije: '',
        krajAkcije: ''
      };

      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        const header = headers[col];
        const value = worksheet[cellAddress]?.v;
        
        if (header == "Kupac")
          akcija.kupac = value;
        else if (header == "Tip akcije")
          akcija.tipAkcije = value;
        else if (header == "Brend")
          akcija.brend = value;
        else if (header == "Sif Art")
          akcija.sifArt = value.toString();
        else if (header == "Artikal")
          akcija.artikal = value;
        else if (header == "Cijena")
          akcija.cijena = value?.toString() ?? "";
        else if (header.includes("etak") && header.includes("akcije"))
          akcija.pocetakAkcije = value.toString();
        else if (header == "Kraj akcije")
          akcija.krajAkcije = value.toString();
      }

      akcije.push(akcija);
    }

    return akcije;
  }
}