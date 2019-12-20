import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidentComponent } from './resident/resident.component';
import { ResidentAddComponent } from './resident-add/resident-add.component';
import { residentRoutingModule } from './resident.routing'
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { MatTableDataSource } from '@angular/material';

@NgModule({
  declarations: [ResidentComponent, ResidentAddComponent],
  imports: [
    CommonModule, residentRoutingModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, NgxDatatableModule, SharedMaterialModule
  ], providers: [MatTableDataSource]
})
export class ResidentModule { }
