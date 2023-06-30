import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NeltService } from 'src/app/shared/nelt-service.service';

@Component({
  selector: 'app-azuriraj-akciju',
  templateUrl: './azuriraj-akciju.component.html'
})
export class AzurirajAkcijuComponent {
  fileToUpload: File | undefined;
  isDisabled: boolean = true;
  text: string = '   '

  constructor(private neltService: NeltService, private router: Router) { }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
    this.isDisabled = false;
  }

  async uploadFile() {
    await this.neltService.excelUpload(this.fileToUpload).subscribe(r=> this.router.navigate(['/akcije']));
  }
}