import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { GroupAddComponent } from './group-add/group-add.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
   MatTableDataSource 
 } from '@angular/material';
 import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [GroupComponent, GroupAddComponent],
  imports: [FormsModule,SharedMaterialModule, ReactiveFormsModule,FlexLayoutModule, CommonModule,
    NgxDatatableModule,
    GroupRoutingModule
  ],providers:[MatTableDataSource]
})
export class GroupModule { }
