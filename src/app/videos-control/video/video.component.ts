import { VideoService } from './../../shared/video.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  selectedFile = null;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  hasSelected: Boolean = false;
  formevent1;
  uploadPercent1: Observable<number>;
  downloadURL1: Observable<string>;
  percentage :number =0;
  uploading:boolean=false;
//virtual tour
constructor(private storage: AngularFireStorage, private firebase: AngularFirestore, private service: VideoService) { }

ngOnInit() {
  this.resetForm();

}

resetForm(form?: NgForm) {
  if (form != null)
    form.resetForm();
  this.service.video = {
    id: null,
    title: "",
    vdourl: ""
  };
}

async onSubmit(form: NgForm) {
  // console.log(form.value.id);
  // console.log(form.value.title);
  console.log(form.value.vdourl);
  let dataa = Object.assign({}, form.value);// id, vdourl, title
  delete dataa.id;

  const filePath = "videos/" + dataa.title;
  const fileRef = this.storage.ref(filePath);

  console.log(form.value.id);
  if (form.value.id == null) {

    const task = this.storage.upload(filePath, this.selectedFile);
    this.uploading =true;
    
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    this.uploadPercent.subscribe(prcnt => {
      this.percentage=prcnt;
    });

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          
          dataa.vdourl = url;
          this.firebase.collection('videos').add(dataa);
        });
      })
    ).subscribe();
    this.resetForm();
    // form.reset();
    

    // dataa.imgurl = "fg";
    // console.log(fileRef.getDownloadURL());
    // this.firebase.collection('timetabledata').add(dataa);

  } else {

    if (this.selectedFile != null) {
      
      let imageid = form.value.id;
      console.log(form.value.title);

      let deletionfile = this.firebase.doc('videos/' + form.value.title).delete();
      let filepath = "videos/" + form.value.title;
      let filedeletion = this.storage.ref(filepath).delete();
      await deletionfile;
      await filedeletion;

      const filePath = 'videos/' + dataa.title;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);
      this.uploading =true;


      await task;
      // this.firestore
      // this.firestore.collection('lecturers').add(data); 

      this.uploadPercent = task.percentageChanges();
      this.uploadPercent.subscribe(prcnt => {
        this.percentage=prcnt;
      });

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {


            dataa.imgurl = url;

            this.firebase.doc('videos/' + imageid).update(dataa);

          });
        })
      ).subscribe();

    } else {
      this.firebase.doc('videos/' + form.value.id).update(dataa);
    }

  }
  this.resetForm();

}

uploadVideo(event) {
  this.selectedFile = event.target.files[0];
  // console.log("sfwg");
  this.formevent1 = event;



}

}
