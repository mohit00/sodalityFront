import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StaffComplainComponent} from '../staff-complain/staff-complain/staff-complain.component';
import {StaffComplainAddComponent} from '../staff-complain/staff-complain-add/staff-complain-add.component'
const routes: Routes = [
  {
    path:"Add",
    component:StaffComplainAddComponent,
    data: {
      title: "Add",
      breadcrumb: "Add"
      ,
        id:""
      }
  },{
    path:"Update",
    component:StaffComplainAddComponent,
    data: {
      title: "Update",
      breadcrumb: "Update"
      ,
        id:""
      }
  },{
    path:"List",
    component:StaffComplainComponent,
    data: {
      title: "List",
      breadcrumb: "List"
      ,
        id:""
      }
  },{ 
    path: '', 
    redirectTo: 'List', 
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffComplainRoutingModule { }
