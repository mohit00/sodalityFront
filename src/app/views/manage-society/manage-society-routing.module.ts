import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocietyComponent } from './society/society.component';
import { SocietyAddComponent } from './society-add/society-add.component';

const routes: Routes = [{
  path:"List",component:SocietyComponent,
  data: { title: "List", breadcrumb: "List" }


},
{
  path:"Add",
  component:SocietyAddComponent,
  data: { title: "Add", breadcrumb: "Add" }

},{
  path:"Update",
  component:SocietyAddComponent,
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
export class ManageSocietyRoutingModule { }
