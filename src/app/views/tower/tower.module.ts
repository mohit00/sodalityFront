import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TowerComponent } from './tower/tower.component';
import { TowerAddComponent } from './tower-add/tower-add.component';
import {towerRoutingModule} from './tower.routing'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import {
  MatTableDataSource 
} from '@angular/material'; 
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [TowerComponent, TowerAddComponent],
  imports: [FlexLayoutModule,
    CommonModule,towerRoutingModule,FormsModule, ReactiveFormsModule, 
     NgxDatatableModule,SharedMaterialModule
  ],providers:[MatTableDataSource]
})
export class TowerModule { }
