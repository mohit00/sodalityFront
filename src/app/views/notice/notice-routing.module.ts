import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoticeComponent } from './notice.component';
import { NoticePostComponent } from '../notice-post/notice-post.component';

const routes: Routes = [
  {
    path:"List",component:NoticeComponent,
    data: { title: "List", breadcrumb: "List" }
  
  
  },
  {
    path:"Add",
    component:NoticePostComponent,
    data: { title: "Add", breadcrumb: "Add" }
  
  },{
    path:"Update",
    component:NoticePostComponent,
    data: { title: "Update", breadcrumb: "Update" }
  
  },
  { 
    path: '', 
    redirectTo: 'List', 
    pathMatch: 'full' 
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeRoutingModule { }
