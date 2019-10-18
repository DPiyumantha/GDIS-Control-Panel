import { Injectable } from '@angular/core';
import { Notice } from './notice';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class NoticesService {
notice : Notice;
  constructor(private firestore: AngularFirestore) { }

  getNotices(){
    return this.firestore.collection('notices').snapshotChanges();
  }
}
