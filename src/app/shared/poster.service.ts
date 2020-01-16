import { Poster } from './poster';

import { Injectable } from '@angular/core';
import { Timetable } from "./timetable";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PosterService {
  poster: Poster
    constructor(public firestore: AngularFirestore) { }
  
    getPosters(){
      return this.firestore.collection('posters').snapshotChanges();
    }
  }
