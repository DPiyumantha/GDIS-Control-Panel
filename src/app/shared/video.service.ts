import { AngularFirestore } from '@angular/fire/firestore';
import { Video } from './video';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  video : Video;

  constructor(private firestore: AngularFirestore) { }

  getVideos(){
    return this.firestore.collection('videos').snapshotChanges();
  }
}
