import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category/category.component';
import { CategoryAddComponent } from './category-add/category-add.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { MatTableDataSource } from '@angular/material'; 
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CategoryComponent, CategoryAddComponent],
  imports: [
    CommonModule,FlexLayoutModule,FormsModule, ReactiveFormsModule, 
    NgxDatatableModule,SharedMaterialModule,
    CategoryRoutingModule
  ],providers:[MatTableDataSource]
})
export class CategoryModule { }
