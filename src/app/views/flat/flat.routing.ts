import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import {FlatComponent} from './flat/flat.component'
 import {FlatAddComponent} from './flat-add/flat-add.component'

const routes: Routes = [{
  path:"List",component:FlatComponent,
  data: { title: "List", breadcrumb: "List" }


},
{
  path:"Add",
  component:FlatAddComponent,
  data: { title: "Add", breadcrumb: "Add" }

},{
  path:"Update",
  component:FlatAddComponent,
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
export class flatRoutingModule { }
