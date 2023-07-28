import { Injectable, EventEmitter } from '@angular/core';
import { Akcija } from './../models/akcija';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { collection, collectionData, Firestore, addDoc, Timestamp, orderBy, query } from '@angular/fire/firestore';

@Injectable()
export class NeltService {
  navchange: EventEmitter<boolean> = new EventEmitter();

  getAkcijeUrl: string = "https://nelt-function.azurewebsites.net/api/GetAkcije";
  excelUploadUrl: string = "https://nelt-function.azurewebsites.net/api/ExcelUploadFunction";

  constructor(
    private db: Firestore, 
    private toast: NgToastService, 
    private router: Router) { }

  emitNavChangeEvent(boolean:boolean) {
    this.navchange.emit(boolean);
  }
  getNavChangeEmitter() {
    return this.navchange;
  }

  getAkcije() {
    const ref = query(collection(this.db, 'akcije'), orderBy('timestamp', 'desc'));
    return collectionData(ref);
  }

  async addAkcije(akcije: Akcija[]) {
    const ref = collection(this.db, 'akcije')
    var map = akcije.map((obj)=> {return Object.assign({}, obj)});
    
    return await addDoc(ref, {akcije: map, timestamp: Timestamp.now()})
      .then(async () => {
        this.toast.success({detail:"", summary:"Akcije su uspješno ažurirane.", position:'br', duration: 5000});
        this.router.navigate(['/akcije']);
      }).catch(() => {
        this.toast.error({detail:"", summary:"Dogodila se greška tokom ažuriranja akcija, pokušajte ponovo kasnije.", position:'br', duration: 5000});
    });
  }
}