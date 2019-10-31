import { Injectable } from '@angular/core';
// importamos la base de datos firebase
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SensoresInterface } from '../models/sensores';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataTomateService {

  datosCollection: AngularFirestoreCollection<SensoresInterface>;
  datos: Observable<SensoresInterface[]>;

  constructor(private afs: AngularFirestore) {
    // Trae la coleccion de datos de la base de datos de ('sensor')
    this.datosCollection = this.afs.collection('sensor');
    // Guardo los valores de estos datos en esta variable
    this.datos = this.datosCollection.valueChanges();
  }

  // Create
  addData() {}

  // Read
  getAllsData() {
    return this.datos = this.datosCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as SensoresInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  // Upload
  updateData() {}

  // Delete
  deleteData() {}
}
