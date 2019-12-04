import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TowerComponent} from './tower/tower.component'
import {TowerAddComponent} from './tower-add/tower-add.component'

 const routes: Routes = [{
  path:"List",component:TowerComponent,
  data: { title: "List", breadcrumb: "List" }


},
{
  path:"Add",
  component:TowerAddComponent,
  data: { title: "Add", breadcrumb: "Add" }

},{
  path:"Update",
  component:TowerAddComponent,
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
export class towerRoutingModule { }
