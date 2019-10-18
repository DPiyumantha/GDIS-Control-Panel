import { Component, OnInit } from '@angular/core';
import { LecturersService } from 'src/app/shared/lecturers.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.css']
})
export class LecturerComponent implements OnInit {

  constructor(public service: LecturersService, private firestore:AngularFirestore, private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form!=null)
    form.resetForm();
    this.service.formData = {
      id: null,
      salutation: '',
      fullName: '',
      position: '',
      qualifications: '',
      emailA: '',
      imgurl: '',
    }
  }
onSubmit(form: NgForm){
  
  let data = Object.assign({},form.value) ;
  delete data.id;
  if(form.value.id==null)
  this.firestore.collection('lecturers').add(data);
  else
  this.firestore.doc('lecturers/'+form.value.id).update(data);
  this.resetForm(form);
  this.toastr.success('Lecturer saved successfully!','Lecturer Details');
  

}



}
