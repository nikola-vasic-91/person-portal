import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoadingInterceptor } from './shared/loading.interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AkcijaComponent } from './components/akcija/akcija.component';
import { AzurirajAkcijuComponent } from './components/azuriraj-akciju/azuriraj-akciju.component';
import { NeltService } from './shared/nelt-service.service';
import { PopupComponent } from './components/popup/popup.component';
import { Guard } from './shared/guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    MatCardModule
  ],
  providers: [NeltService,Guard,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }