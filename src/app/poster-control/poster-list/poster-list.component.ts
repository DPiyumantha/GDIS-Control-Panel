import { Poster } from './../../shared/poster';
import { Component, OnInit } from '@angular/core';
import { PosterService } from 'src/app/shared/poster.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-poster-list',
  templateUrl: './poster-list.component.html',
  styleUrls: ['./poster-list.component.css']
})
export class PosterListComponent implements OnInit {
  list: Poster[];


  constructor(private service: PosterService, private firestore: AngularFirestore, private toastr: ToastrService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.service.getPosters().subscribe(actionArray => (
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Poster
        };
      })
    ));

  }

  onEdit(tt: Poster) {
    this.service.poster = Object.assign({}, tt);
  }




  async onDelete(id: string) {
    if (confirm('Are you sure?')) {
      AngularFireStorage
      let deletion = this.firestore.doc('posters/' + id).delete();
      let filepath = "posters/" + id;
      let filedeletion = this.storage.ref(filepath).delete();
      await deletion;
      await filedeletion;
      this.toastr.warning("Deleted successfully");
    }
  }
}