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

  constructor(private service: NoticesService, private firestore: AngularFirestore, private toastr: ToastrService) { }

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
    let data = form.value;
    this.firestore.collection('notices').add(data);
    this.resetForm(form);
    this.toastr.success("Notice added!", "GDIS Control Panel");
  }

}
