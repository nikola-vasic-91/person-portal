import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Akcija } from './../models/akcija';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class NeltService {

  getAkcijeUrl: string = "https://nelt-function.azurewebsites.net/api/GetAkcije";
  excelUploadUrl: string = "https://nelt-function.azurewebsites.net/api/ExcelUploadFunction";

  constructor(private http: HttpClient, private toast: NgToastService, private router: Router) { }

  getAkcije() {
    return this.http.get<Array<Akcija>>(this.getAkcijeUrl)
        .pipe(
            catchError((err) => {
                this.toast.error({detail:"", summary:err.error, position:'bottomRight', duration: 5000});
                throw(err.error);
            })
        );
  }

  excelUpload(fileToUpload: File | undefined): Observable<string> {
    if (fileToUpload) {
        const formData = new FormData();
        formData.append('file', fileToUpload);
  
        return this.http.post<string>(this.excelUploadUrl, formData)
        .pipe(
            catchError((err) => {
              this.router.navigate(['/akcije']);
                              throw(err.error);
            })
        );
      } else {
        this.toast.error({detail:"", summary:'No file selected.', position:'bottomRight', duration: 5000});
        return of('');
      }
  }
}