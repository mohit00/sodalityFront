import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResidentComponent} from './resident/resident.component'
import {ResidentAddComponent} from './resident-add/resident-add.component'
const routes: Routes = [{
  path:"List",component:ResidentComponent,
  data: { title: "List", breadcrumb: "List" }


},
{
  path:"Add",
  component:ResidentAddComponent,
  data: { title: "Add", breadcrumb: "Add" }

},{
  path:"Update",
  component:ResidentAddComponent,
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
export class residentRoutingModule { }
