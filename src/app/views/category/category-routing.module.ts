import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CategoryAddComponent } from './category-add/category-add.component';

const routes: Routes = [{
  path: "List",
  component: CategoryComponent,
  data: {
       title: "List",
       breadcrumb: "List"
       }
  },{
  path:"Add",
  component: CategoryAddComponent,
  data: {
     title: "Add",
     breadcrumb: "Add"
     ,
       id:""
     }
  },{
    path:"Update",
    component:CategoryAddComponent,
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
export class CategoryRoutingModule { }
