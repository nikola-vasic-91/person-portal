import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Person } from '../models/person.model';
import { ModifiedPerson } from '../models/modified-person.model';
import { NgToastService } from 'ng-angular-popup';
import { SocialMediaAccount } from '../models/social-media-account.model';
import { environment } from '../../environments/environment';

@Injectable()
export class PersonService {

  personEndpoint: string = "/api/Persons";
  socialMediaAccountEndpoint: string = "/api/SocialMediaAccounts";
  modifiedUrlPart: string = "/modified";

  constructor(private http: HttpClient, private toast: NgToastService) { }

  getPersons() {
    return this.http.get<Array<Person>>(environment.personServiceUrl + this.personEndpoint)
        .pipe(
            catchError((err) => {
                this.toast.error({detail:"", summary:err.error, position:'br', duration: 5000});
                throw(err.error);
            })
        );
  }

  getSocialMediaAccounts() {
    return this.http.get<Array<SocialMediaAccount>>(environment.personServiceUrl + this.socialMediaAccountEndpoint)
        .pipe(
            catchError((err) => {
                this.toast.error({detail:"", summary:err.error, position:'br', duration: 5000});
                throw(err.error);
            })
        );
  }

  getPerson(personId: string) {
    return this.http.get<Person>(environment.personServiceUrl + this.personEndpoint + '/' + personId)
        .pipe(
            catchError((err) => {
                this.toast.error({detail:"", summary:err.error, position:'br', duration: 5000});
                throw(err.error);
            })
        );
  }

  getModifiedPersonData(personId: string) {
    return this.http.get<ModifiedPerson>(environment.personServiceUrl + this.personEndpoint + '/' + personId + this.modifiedUrlPart)
        .pipe(
            catchError((err) => {
                this.toast.error({detail:"", summary:err.error, position:'br', duration: 5000});
                throw(err.error);
            })
        );
  }

  addPerson(person: Person): Observable<string> {
    return this.http.post<string>(environment.personServiceUrl + this.personEndpoint, person)
        .pipe(
            catchError((err) => {
                this.toast.error({detail:"", summary:err.error, position:'br', duration: 5000});
                throw(err.error);
            })
        );
  }
}