import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageSocietyRoutingModule } from './manage-society-routing.module';
import { SocietyComponent } from './society/society.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
 import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

import {
   MatTableDataSource 
 } from '@angular/material';
 import { MaterialTableComponent } from '../../views/material-table/material-table.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SocietyAddComponent } from './society-add/society-add.component';
@NgModule({
  declarations: [SocietyComponent,MaterialTableComponent, SocietyAddComponent],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule,FlexLayoutModule,FileUploadModule,
    ManageSocietyRoutingModule, NgxDatatableModule,SharedMaterialModule
  ],providers:[MatTableDataSource]
})
export class ManageSocietyModule { }
