import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RechargedCoupenComponent} from './recharged-coupen/recharged-coupen.component'
const routes: Routes = [{
  path:"RechargedCoupen",
  component:RechargedCoupenComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
