import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SocietyComplainAddComponent} from './society-complain-add/society-complain-add.component'
import {SocietyComplainComponent} from './society-complain/society-complain.component';
const routes: Routes = [
  {
    path:"Add",
    component:SocietyComplainAddComponent,
    data: {
      title: "Add",
      breadcrumb: "Add"
      ,
        id:""
      }
  },{
    path:"Update",
    component:SocietyComplainAddComponent,
    data: {
      title: "Update",
      breadcrumb: "Update"
      ,
        id:""
      }
  },{
    path:"List",
    component:SocietyComplainComponent,
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
export class SocietyComplainRoutingModule { }
