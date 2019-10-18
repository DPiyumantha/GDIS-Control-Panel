import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LecturersControlComponent } from './lecturers-control/lecturers-control.component';
import { TimetableControlComponent } from './timetable-control/timetable-control.component';
import { NoticeboardControlComponent } from './noticeboard-control/noticeboard-control.component';
import { AttendanceControlComponent } from './attendance-control/attendance-control.component';
import { TeamComponent } from './team/team.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddLecturerComponent } from './add-lecturer/add-lecturer.component';

import { CommonModule} from '@angular/common';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { LecturersComponent } from './lecturers/lecturers.component';
import { LecturerComponent } from './lecturers/lecturer/lecturer.component';
import { LecturerListComponent } from './lecturers/lecturer-list/lecturer-list.component';
import { LecturersService } from './shared/lecturers.service';
import { FormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { NoticesService } from './shared/notices.service';
import { NoticeComponent } from './noticeboard-control/notice/notice.component';
import { NoticesListComponent } from './noticeboard-control/notices-list/notices-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LecturersControlComponent,
    TimetableControlComponent,
    NoticeboardControlComponent,
    AttendanceControlComponent,
    TeamComponent,
    LoginComponent,
    DashboardComponent,
    AddLecturerComponent,
    LecturersComponent,
    LecturerComponent,
    LecturerListComponent,
    NoticeComponent,
    NoticesListComponent,
    
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  

  ],
  providers: [LecturersService,
  NoticesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
