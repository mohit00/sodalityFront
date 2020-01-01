import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ComplainAddComponent} from '../complain/complain-add/complain-add.component'
import {ComplainComponent} from '../complain/complain/complain.component'
const routes: Routes =[{
  path: "List",
  component: ComplainComponent,
  data: {
       title: "List",
       breadcrumb: "List"
       }
  },{
  path:"Add",
  component: ComplainAddComponent,
  data: {
     title: "Add",
     breadcrumb: "Add"
     ,
       id:""
     }
  },{
    path:"Update",
    component:ComplainAddComponent,
    data: {
       title: "Update",
       breadcrumb: "Update",
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
export class ComplainRoutingModule { }
