
import { Injectable } from '@angular/core';
import { Timetable } from "./timetable";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  timetable: Timetable
    constructor(private firestore: AngularFirestore) { }
  
    getTimetables(){
      return this.firestore.collection('timetabledata').snapshotChanges();
    }
  }
