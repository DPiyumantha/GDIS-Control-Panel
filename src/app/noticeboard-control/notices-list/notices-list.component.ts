import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Notice } from 'src/app/shared/notice';
import { NoticesService } from 'src/app/shared/notices.service';


@Component({
  selector: 'app-notices-list',
  templateUrl: './notices-list.component.html',
  styleUrls: ['./notices-list.component.css']
})
export class NoticesListComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private service: NoticesService) { }
 list: Notice[];
  ngOnInit() {
    this.service.getNotices().subscribe(res=>{
      this.list = res.map(item=>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()

        }as Notice
      })
    });
  }

  onEdit(lec: Notice){
    this.service.notice = Object.assign({},lec);
  }

  onDelete(id: string){
    if(confirm("Are you sure?")){
      this.firestore.doc('notices/'+id).delete();
    }
  }

  

}
