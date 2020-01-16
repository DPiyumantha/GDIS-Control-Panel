import { PosterService } from './../../shared/poster.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css']
})
export class PosterComponent implements OnInit {
  selectedFile = null;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  hasSelected: Boolean = false;
  formevent1;
  uploadPercent1: Observable<number>;
  downloadURL1: Observable<string>;
  percentage :number =0;
  uploading:boolean=false;
  constructor(private storage: AngularFireStorage, private firebase: AngularFirestore, public service: PosterService) { }
  ngOnInit() {
    this.resetForm();

  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.poster = {
      id: null,
      
      posurl: ""
    };
  }

  async onSubmit(form: NgForm) {

    console.log(form.value.posurl);
    let dataa = Object.assign({}, form.value);// id, posurl
    delete dataa.id;
    let r = Math.random().toString(36).substring(7);
    const filePath = "posters/" + r;
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
            
            dataa.posurl = url;
            this.firebase.collection('posters').add(dataa);
          });
        })
      ).subscribe();
      this.resetForm();


    } else {

      if (this.selectedFile != null) {
        
        let imageid = form.value.id;
        

        let deletionfile = this.firebase.doc('posters/' + form.value.id).delete();
        let filepath = "posters/" + form.value.id;
        let filedeletion = this.storage.ref(filepath).delete();
        await deletionfile;
        await filedeletion;

        const filePath = 'posters/' + dataa.id;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.selectedFile);
        this.uploading =true;


        await task;


        this.uploadPercent = task.percentageChanges();
        this.uploadPercent.subscribe(prcnt => {
          this.percentage=prcnt;
        });

        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {


              dataa.posurl = url;

              this.firebase.doc('posters/' + imageid).update(dataa);

            });
          })
        ).subscribe();

      } else {
        this.firebase.doc('posters/' + form.value.id).update(dataa);
      }

    }
    this.resetForm();

  }

  uploadPoster(event) {
    this.selectedFile = event.target.files[0];
    // console.log("sfwg");
    this.formevent1 = event;



  }

}
