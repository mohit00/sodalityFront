import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeRoutingModule } from './notice-routing.module';
import { NoticeComponent } from './notice.component';
import { NoticePostComponent } from '../notice-post/notice-post.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
   MatTableDataSource 
 } from '@angular/material';
 import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  declarations: [NoticeComponent, NoticePostComponent],
  imports: [SharedMaterialModule,FormsModule, ReactiveFormsModule,FlexLayoutModule,NgxDatatableModule,
    CommonModule,
    NoticeRoutingModule
  ],providers:[MatTableDataSource]
})
export class NoticeModule { }
