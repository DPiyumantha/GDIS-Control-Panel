import { Component, OnInit } from '@angular/core';
import { LecturersService } from 'src/app/shared/lecturers.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.css']
})
export class LecturerComponent implements OnInit {

  constructor(public service: LecturersService, private firestore:AngularFirestore) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form!=null)
    form.resetForm();
    this.service.formData = {
      id: null,
      salutation: '',
      name: '',
      position: '',
      qualifications: '',
      email: '',
      imgurl: '',
    }
  }
onSubmit(form: NgForm){
  let data = form.value;
  this.firestore.collection('lecturers').add(data);
  this.resetForm(form);

}


}
