import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RechargedCoupenComponent} from './recharged-coupen/recharged-coupen.component'
import { CouponRequestComponent } from './coupon-request/coupon-request.component';
import { PrintedCouponComponent } from './printed-coupon/printed-coupon.component';
import { DailyFlatWiseComponent } from './daily-flat-wise/daily-flat-wise.component';
import { DailyDateWiseComponent } from './daily-date-wise/daily-date-wise.component';
import { MonthlyFlatWiseComponent } from './monthly-flat-wise/monthly-flat-wise.component';
import { MonthlyDateWiseComponent } from './monthly-date-wise/monthly-date-wise.component';
import { AlarmingBalanceComponent } from './alarming-balance/alarming-balance.component';
import { MeterStatusComponent } from './meter-status/meter-status.component';
import { MemberDetailsTowerWiseComponent } from './member-details-tower-wise/member-details-tower-wise.component';
import { DetailedDgRunningComponent } from './detailed-dg-running/detailed-dg-running.component';
import { DailyDataCsvComponent } from './daily-data-csv/daily-data-csv.component';
import { MonthlyDataFlatWiseCsvComponent } from './monthly-data-flat-wise-csv/monthly-data-flat-wise-csv.component';
import { MonthlyDataDateWiseCsvComponent } from './monthly-data-date-wise-csv/monthly-data-date-wise-csv.component';
import { CouponRechargeCsvComponent } from './coupon-recharge-csv/coupon-recharge-csv.component';
import { CouponGenerationCsvComponent } from './coupon-generation-csv/coupon-generation-csv.component';
import { FlatDebitCreditComponent } from './flat-debit-credit/flat-debit-credit.component';
import { MonthlyBillComponent } from './monthly-bill/monthly-bill.component';
const routes: Routes = [{
  path:"RechargedCoupen",
  component:RechargedCoupenComponent
}, {
  path:"CouponRequest",
  component:CouponRequestComponent
}, {
  path:"PrintedCoupon",
  component:PrintedCouponComponent
}, {
  path:"DailyFlatWise",
  component:DailyFlatWiseComponent
}, {
  path:"DailyDateWise",
  component:DailyDateWiseComponent
}, {
  path:"MonthlyFlatWise",
  component:MonthlyFlatWiseComponent
}, {
  path:"MonthlyDateWise",
  component:MonthlyDateWiseComponent
}, {
  path:"DetailedDgRunning",
  component:DetailedDgRunningComponent
}
, {
  path:"MemberDetailsTowerWise",
  component:MemberDetailsTowerWiseComponent
}
, {
  path:"MeterStatus",
  component:MeterStatusComponent
}
, {
  path:"AlarmingBalance",
  component:AlarmingBalanceComponent
},{
  path:"DailyData",
  component:DailyDataCsvComponent
}, {
  path:"MonthlyDataFlatWise",
  component:MonthlyDataFlatWiseCsvComponent
}, {
  path:"MonthlyDataDateWise",
  component:MonthlyDataDateWiseCsvComponent
}, {
  path:"CouponRecharge",
  component:CouponRechargeCsvComponent
}, {
  path:"CouponGeneration",
  component:CouponGenerationCsvComponent
}, {
  path:"FlatDebitCredit",
  component:FlatDebitCreditComponent
}, {
  path:"MonthlyBill",
  component:MonthlyBillComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
