import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatComponent } from './flat/flat.component';
import { FlatAddComponent } from './flat-add/flat-add.component';
import {flatRoutingModule} from './flat.routing'
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import {
  MatTableDataSource 
} from '@angular/material'; 
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [FlatComponent, FlatAddComponent],
  imports: [
    CommonModule,flatRoutingModule,FormsModule, ReactiveFormsModule,NgxDatatableModule,SharedMaterialModule,FlexLayoutModule
  ],providers:[MatTableDataSource]
})
export class FlatModule { }
