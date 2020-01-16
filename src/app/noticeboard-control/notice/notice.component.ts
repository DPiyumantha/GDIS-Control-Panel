import { Component, OnInit } from '@angular/core';
import { NoticesService } from 'src/app/shared/notices.service';
import { Notice } from 'src/app/shared/notice';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  constructor(public service: NoticesService, private firestore: AngularFirestore, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form!=null)
    form.resetForm();
    this.service.notice ={
      id: null,
      message:""
    };
  }

  onSubmit(form: NgForm){
    let data = Object.assign({},form.value);
    delete data.id;
    if(form.value.id==null)
    this.firestore.collection('notices').add(data);
    else
    this.firestore.doc('notices/'+form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success("Notice added!", "GDIS Control Panel");
  }

}
