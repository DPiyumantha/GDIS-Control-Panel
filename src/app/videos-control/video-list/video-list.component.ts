import { VideoService } from './../../shared/video.service';
import { Video } from './../../shared/video';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  list: Video[];


  constructor(private service: VideoService, private firestore: AngularFirestore, private toastr: ToastrService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.service.getVideos().subscribe(actionArray => (
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Video
        };
      })
    ));

  }

  onEdit(tt: Video) {
    this.service.video = Object.assign({}, tt);
  }




  async onDelete(id: string, title: string) {
    if (confirm('Are you sure?')) {
      AngularFireStorage
      let deletion = this.firestore.doc('videos/' + id).delete();
      let filepath = "videos/" + title;
      let filedeletion = this.storage.ref(filepath).delete();
      await deletion;
      await filedeletion;
      this.toastr.warning("Deleted successfully");
    }
  }
}