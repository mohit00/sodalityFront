import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StaffComponent} from './staff/staff.component'
import {StaffAddComponent} from './staff-add/staff-add.component'

 const routes: Routes = [{
  path:"List",component:StaffComponent,
  data: { title: "List", breadcrumb: "List" }


},
{
  path:"Add",
  component:StaffAddComponent,
  data: { title: "Add", breadcrumb: "Add" }

},{
  path:"Update",
  component:StaffAddComponent,
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
export class staffRoutingModule { }
