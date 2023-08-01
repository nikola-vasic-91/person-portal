import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AdminGuard } from './shared/admin-guard';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { provideAuth, connectAuthEmulator, getAuth } from '@angular/fire/auth';
import { provideStorage, connectStorageEmulator, getStorage } from '@angular/fire/storage';
import { LoggedInGuard } from './shared/logged-in-guard';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { getPerformance, providePerformance } from '@angular/fire/performance';

@NgModule({
  declarations: [
    AppComponent,
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
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const firestore = getFirestore();

      if (environment.useEmulators) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }

      return firestore;
    }),
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      }
      return auth;
    }),
    provideStorage(() => {
      const storage = getStorage();
      if (environment.useEmulators) {
          connectStorageEmulator(storage, 'localhost', 9199);
      }
      return storage;
    }),
    providePerformance(() => getPerformance())
  ],
  providers: [NeltService,AdminGuard,LoggedInGuard,
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }