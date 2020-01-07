import { TimetableService } from './../../shared/timetable.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  selectedFile = null;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  hasSelected: Boolean = false;
  formevent1;
  uploadPercent1: Observable<number>;
  downloadURL1: Observable<string>;
  percentage :number =0;
  uploading:boolean=false;

  constructor(private storage: AngularFireStorage, private firebase: AngularFirestore, private service: TimetableService) { }

  ngOnInit() {
    this.resetForm();

  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.timetable = {
      id: null,
      title: "",
      imgurl: ""
    };
  }

  async onSubmit(form: NgForm) {
    // console.log(form.value.id);
    // console.log(form.value.title);
    console.log(form.value.imgurl);
    let dataa = Object.assign({}, form.value);// id, imgurl, title
    delete dataa.id;

    const filePath = "timetables/" + dataa.title;
    const fileRef = this.storage.ref(filePath);

    console.log(form.value.id);
    if (form.value.id == null) {

      const task = this.storage.upload(filePath, this.selectedFile);
      this.uploading =true;
      
      // observe percentage changes
      this.uploadPercent1 = task.percentageChanges();
      this.uploadPercent1.subscribe(prcnt => {
        this.percentage=prcnt;
      });

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            
            dataa.imgurl = url;
            this.firebase.collection('timetabledata').add(dataa);
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

        let deletionfile = this.firebase.doc('timetables/' + form.value.title).delete();
        let filepath = "timetables/" + form.value.title;
        let filedeletion = this.storage.ref(filepath).delete();
        await deletionfile;
        await filedeletion;

        const filePath = 'timetables/' + dataa.title;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.selectedFile);
        this.uploading =true;


        await task;
        // this.firestore
        // this.firestore.collection('lecturers').add(data); 

        this.uploadPercent1 = task.percentageChanges();
        this.uploadPercent1.subscribe(prcnt => {
          this.percentage=prcnt;
        });

        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {


              dataa.imgurl = url;

              this.firebase.doc('timetabledata/' + imageid).update(dataa);

            });
          })
        ).subscribe();

      } else {
        this.firebase.doc('timetabledata/' + form.value.id).update(dataa);
      }

    }
    this.resetForm();

  }

  uploadImage(event) {
    this.selectedFile = event.target.files[0];
    // console.log("sfwg");
    this.formevent1 = event;



  }

}
