import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitTypeRoutingModule } from './unit-type-routing.module';
import { UnitTypeComponent } from './unit-type.component';
import { UnitTypeAddComponent } from './unit-type-add/unit-type-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { MatTableDataSource } from '@angular/material'; 
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [UnitTypeComponent, UnitTypeAddComponent],
  imports: [FormsModule, ReactiveFormsModule,NgxDatatableModule,SharedMaterialModule,
    CommonModule,
    UnitTypeRoutingModule,FlexLayoutModule
  ],providers:[MatTableDataSource]
})
export class UnitTypeModule { }
