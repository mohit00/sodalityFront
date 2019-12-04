import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidentComponent } from './resident/resident.component';
import { ResidentAddComponent } from './resident-add/resident-add.component';
import {residentRoutingModule} from './resident.routing'
@NgModule({
  declarations: [ResidentComponent, ResidentAddComponent],
  imports: [
    CommonModule,residentRoutingModule
  ]
})
export class ResidentModule { }
