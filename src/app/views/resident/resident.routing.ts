import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResidentComponent } from './resident/resident.component'
import { ResidentAddComponent } from './resident-add/resident-add.component'
import { FamilyMemberComponent } from './family-member/family-member.component'
import { FamilyMemberAddComponent } from './family-member-add/family-member-add.component'

const routes: Routes = [{
  path: "List", component: ResidentComponent,
  data: { title: "List", breadcrumb: "List" }


},
{
  path: "Add",
  component: ResidentAddComponent,
  data: { title: "Add", breadcrumb: "Add" }

}, {
  path: "Update",
  component: ResidentAddComponent,
  data: { title: "Update", breadcrumb: "Update" }
}, {
  path: "Family/Member/Add",
  component: FamilyMemberAddComponent,
  data: { title: "Family Add", breadcrumb: "Family Add" }
}, {
  path: "Family/Member/Update",
  component: FamilyMemberAddComponent,
  data: { title: "Family Update", breadcrumb: "Family Update" }
}, {
  path: "Family/Member/List",
  component: FamilyMemberComponent,
  data: { title: "Family List", breadcrumb: "Family List" }
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
