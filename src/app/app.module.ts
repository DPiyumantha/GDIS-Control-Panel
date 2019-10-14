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

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { LecturersComponent } from './lecturers/lecturers.component';
import { LecturerComponent } from './lecturers/lecturer/lecturer.component';
import { LecturerListComponent } from './lecturers/lecturer-list/lecturer-list.component';
import { LecturersService } from './shared/lecturers.service';
import { FormsModule } from "@angular/forms";

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
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [LecturersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
