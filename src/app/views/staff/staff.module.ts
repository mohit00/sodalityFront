import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff/staff.component';
import { StaffAddComponent } from './staff-add/staff-add.component';
import {staffRoutingModule} from './staff.routing'
@NgModule({
  declarations: [StaffComponent, StaffAddComponent],
  imports: [
    CommonModule,staffRoutingModule
  ]
})
export class StaffModule { }
