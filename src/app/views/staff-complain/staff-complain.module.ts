import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffComplainRoutingModule } from './staff-complain-routing.module';
import { StaffComplainComponent } from './staff-complain/staff-complain.component';
import { StaffComplainAddComponent } from './staff-complain-add/staff-complain-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { MatTableDataSource } from '@angular/material'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';

@NgModule({
  declarations: [StaffComplainComponent, StaffComplainAddComponent],
  imports: [
    CommonModule,QuillModule,SharedComponentsModule,
    StaffComplainRoutingModule,FormsModule, ReactiveFormsModule,NgxDatatableModule,SharedMaterialModule,FlexLayoutModule
  ],providers:[MatTableDataSource]
})
export class StaffComplainModule { }
