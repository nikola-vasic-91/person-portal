import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { HeaderComponent } from './components/header/header.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PersonComponent } from './components/person/person.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { PersonService } from './shared/person-service.service';
import { NgToastModule } from 'ng-angular-popup';
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { PersonListComponent } from './components/person-list/person-list.component';
import { LoadingInterceptor } from './shared/loading.interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HttpRequestInterceptor } from './shared/http-request.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AkcijaComponent } from './components/akcija/akcija.component';
import { AzurirajAkcijuComponent } from './components/azuriraj-akciju/azuriraj-akciju.component';
import { NeltService } from './shared/nelt-service.service';
import { PopupComponent } from './components/popup/popup.component';
import { Guard } from './shared/guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PersonDetailComponent,
    AddPersonComponent,
    PersonComponent,
    DialogModalComponent,
    PersonListComponent,
    SpinnerComponent,
    AkcijaComponent,
    AzurirajAkcijuComponent,
    
PopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [PersonService,NeltService,Guard,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}