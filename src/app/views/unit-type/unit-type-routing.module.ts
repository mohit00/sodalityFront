import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnitTypeComponent} from '../unit-type/unit-type.component';
import {UnitTypeAddComponent} from '../unit-type/unit-type-add/unit-type-add.component'
const routes: Routes = [{
  path:"List",
  component:UnitTypeComponent,
  data: { title: "List", breadcrumb: "List" }

},{
  path:"Add",
  component:UnitTypeAddComponent,
  data: { title: "Add", breadcrumb: "Add" }

},{
  path:"Update",
  component:UnitTypeAddComponent,
  data: { title: "Update", breadcrumb: "Update" }

},{ 
  path: '', 
  redirectTo: 'List', 
  pathMatch: 'full' 
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitTypeRoutingModule { }
