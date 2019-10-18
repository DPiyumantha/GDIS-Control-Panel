import { Component, OnInit } from '@angular/core';
import { LecturersService } from 'src/app/shared/lecturers.service';
import { Lecturer } from 'src/app/shared/lecturer.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-lecturer-list',
  templateUrl: './lecturer-list.component.html',
  styleUrls: ['./lecturer-list.component.css']
})
export class LecturerListComponent implements OnInit {
  list : Lecturer[];

  constructor(private service: LecturersService, private firestore:AngularFirestore, private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getLecturers().subscribe(actionArray=>(
      this.list = actionArray.map(item=>{
        return{
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Lecturer
  })
    ));
  }

  onEdit(lec:Lecturer){
    this.service.formData = Object.assign({},lec);
  }
  onDelete(id:string){
   if(confirm("Are you sure?")){
    this.firestore.doc('lecturers/'+id).delete();
    this.toastr.warning("Deleted successfully");
   }
  }
}
