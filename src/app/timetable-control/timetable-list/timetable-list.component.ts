import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { TimetableService } from './../../shared/timetable.service';
import { Timetable } from './../../shared/timetable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timetable-list',
  templateUrl: './timetable-list.component.html',
  styleUrls: ['./timetable-list.component.css']
})
export class TimetableListComponent implements OnInit {
  list: Timetable[];


  constructor(private service: TimetableService, private firestore: AngularFirestore, private toastr: ToastrService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.service.getTimetables().subscribe(actionArray => (
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Timetable
        };
      })
    ));

  }

  onEdit(tt: Timetable) {
    this.service.timetable = Object.assign({}, tt);
  }




  async onDelete(id: string, title: string) {
    if (confirm('Are you sure?')) {
      AngularFireStorage
      let deletion = this.firestore.doc('timetabledata/' + id).delete();
      let filepath = "timetables/" + title;
      let filedeletion = this.storage.ref(filepath).delete();
      await deletion;
      await filedeletion;
      this.toastr.warning("Deleted successfully");
    }
  }
}