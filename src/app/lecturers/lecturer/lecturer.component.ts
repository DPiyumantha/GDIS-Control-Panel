import { Component, OnInit } from '@angular/core';
import { LecturersService } from 'src/app/shared/lecturers.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';


@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.css'],

})
export class LecturerComponent implements OnInit {
  selectedFile = null;
  ref = null;
  task = null;
  dwnUrl = null;
  task1 = null;
  constructor(private storage: AngularFireStorage, public service: LecturersService, private firestore: AngularFirestore, private toastr: ToastrService) {
    this.ref = firebase.storage().ref();
  }

  ngOnInit(){
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if (form != null) {
      form.resetForm();}
      this.service.formData = {
        id: null,
        order: null,
        salutation: '',
        fullName: '',
        position: '',
        qualifications: '',
        emailA: '',
        imgurl: '',
        resArea: ''
      };
    
  }
  
  uploadFile(event) {
    this.selectedFile = event.target.files[0];
    // const filePath = '/lecturer-list';
    // const task = this.storage.upload(filePath, file);
    // console.log("upload function");

  }
  async onSubmit(form: NgForm) {

    let data = Object.assign({}, form.value);
    delete data.id;
    const filepath = 'lecturer-list/' + data.fullName;
    // let dwnUrl = null;

    // this.storage.ref("lecturer-list"+this.selectedFile.name).put(this.selectedFile);
    // const id = Math.random().toString(36).substring(2);
    // this.ref = this.storage.ref(id);
    // this.task = this.ref.put(this.selectedFile);
    // this.task = this.storage.upload(filepath, this.selectedFile).then(rst => {
    //   rst.ref.getDownloadURL().then(url => {
    //     console.log(data.imgurl);
    //     data.imgurl = url;
    //     console.log(data.imgurl);

    //   });
    // });
    // await this.task;
    // await this.task1;
    // data.imgurl = this.dwnUrl;
    if (form.value.position.toLowerCase().indexOf('head of the department') > -1) {
      // String B contains String A
      data.order = 0;
    } else if (form.value.position.toLowerCase().indexOf('professor') > -1) {
      data.order = 1;
    } else if (form.value.position.toLowerCase().indexOf('senior lecturer') > -1) {
      data.order = 2;
    } else {
      data.order = 9;
    }
    if (form.value.id == null) {
      // this.firestore
      this.firestore.collection('lecturers').add(data);
    } else {
      this.firestore.doc('lecturers/' + form.value.id).update(data);
    }
    this.resetForm(form);



    this.toastr.success('Lecturer saved successfully!', 'Lecturer Details');


  }



  // /////

  // var input = document.getElementById( 'file-upload' );
  // input.addEventListener( 'change', showFileName );

  // function showFileName( event ) {

  // var infoArea = document.getElementById( 'file-upload-filename' );

  //   // the change event gives us the input it occurred in
  //   var input = event.srcElement;

  //   // the input has an array of files in the `files` property, each one has a name that you can use. We're just using the name here.
  //   var fileName = input.files[0].name;

  //   // use fileName however fits your app best, i.e. add it into a div
  //   infoArea.textContent = 'File name: ' + fileName;
  // }

  // /////



}
