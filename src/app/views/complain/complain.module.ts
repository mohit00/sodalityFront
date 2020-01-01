import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplainRoutingModule } from './complain-routing.module';
import { ComplainAddComponent } from './complain-add/complain-add.component';
import { ComplainComponent } from './complain/complain.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { MatTableDataSource } from '@angular/material'; 
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ComplainAddComponent, ComplainComponent],
  imports: [FormsModule, ReactiveFormsModule,NgxDatatableModule,SharedMaterialModule, 
    FlexLayoutModule,
    CommonModule,
    ComplainRoutingModule
  ],providers:[MatTableDataSource]
})
export class ComplainModule { }
