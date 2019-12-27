import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LecturersComponent } from './lecturers/lecturers.component';
import { NoticeboardControlComponent } from './noticeboard-control/noticeboard-control.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children:[
      {
        path:'lecturers',
        component:LecturersComponent
      },
      {
        path:'notices',
        component:NoticeboardControlComponent,
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
