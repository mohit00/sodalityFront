import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupComponent} from './group.component'
import {GroupAddComponent} from './group-add/group-add.component'
const routes: Routes = [{
  path:"List",component:GroupComponent,
  data: { title: "List", breadcrumb: "List" }


},
{
  path:"Add",
  component:GroupAddComponent,
  data: { title: "Add", breadcrumb: "Add" }

},{
  path:"Update",
  component:GroupAddComponent,
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
export class GroupRoutingModule { }
