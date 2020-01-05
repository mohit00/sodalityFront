import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocietyComplainRoutingModule } from './society-complain-routing.module';
import { SocietyComplainComponent } from './society-complain/society-complain.component';
import { SocietyComplainAddComponent } from './society-complain-add/society-complain-add.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { MatTableDataSource } from '@angular/material'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [SocietyComplainComponent, SocietyComplainAddComponent],
  imports: [QuillModule,FormsModule, ReactiveFormsModule,NgxDatatableModule,SharedMaterialModule,FlexLayoutModule,
    CommonModule,
    SocietyComplainRoutingModule
  ],providers:[MatTableDataSource]
})
export class SocietyComplainModule { }
