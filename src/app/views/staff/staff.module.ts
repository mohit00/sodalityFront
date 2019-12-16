import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff/staff.component';
import { StaffAddComponent } from './staff-add/staff-add.component';
import {staffRoutingModule} from './staff.routing'
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { MatTableDataSource } from '@angular/material'; 

@NgModule({
  declarations: [StaffComponent, StaffAddComponent],
  imports: [
    CommonModule,staffRoutingModule,FlexLayoutModule,
    FormsModule, ReactiveFormsModule, 
     NgxDatatableModule,SharedMaterialModule
    ],providers:[MatTableDataSource]
})
export class StaffModule { }
