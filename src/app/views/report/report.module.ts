import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { RechargedCoupenComponent } from './recharged-coupen/recharged-coupen.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { MatTableDataSource } from '@angular/material'; 
import {SatDatepickerModule,SatNativeDateModule } from 'saturn-datepicker'

@NgModule({
  declarations: [RechargedCoupenComponent],
  imports: [FlexLayoutModule,FormsModule, ReactiveFormsModule,NgxDatatableModule,SharedMaterialModule,
    CommonModule,
    ReportRoutingModule,SatDatepickerModule,SatNativeDateModule
  ],
  providers:[MatTableDataSource]
})
export class ReportModule { }
