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

  constructor(private storage: AngularFireStorage, private firebase: AngularFirestore, private service: TimetableService) { }

  ngOnInit() {
    this.resetForm();

  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.timetable = {
      id: "",
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

    const filePath = 'timetables/' + dataa.title;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedFile);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          // console.log(url); // <-- do what ever you want with the url..
          dataa.imgurl = url;
          this.firebase.collection('timetabledata').add(dataa);
        });
      })
    ).subscribe();
    // this.resetForm();
    // form.reset();
    this.ngOnInit();

    // dataa.imgurl = "fg";
    // console.log(fileRef.getDownloadURL());
    // this.firebase.collection('timetabledata').add(dataa);

  }

  uploadImage(event) {
    this.selectedFile = event.target.files[0];
    // console.log("sfwg");
    this.formevent1 = event;
    


  }

}
