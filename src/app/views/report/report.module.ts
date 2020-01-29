import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { RechargedCoupenComponent } from './recharged-coupen/recharged-coupen.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { MatTableDataSource } from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { CouponRequestComponent } from './coupon-request/coupon-request.component';
import { PrintedCouponComponent } from './printed-coupon/printed-coupon.component';
import { DailyFlatWiseComponent } from './daily-flat-wise/daily-flat-wise.component';
import { DailyDateWiseComponent } from './daily-date-wise/daily-date-wise.component';
import { MonthlyFlatWiseComponent } from './monthly-flat-wise/monthly-flat-wise.component';
import { MonthlyDateWiseComponent } from './monthly-date-wise/monthly-date-wise.component';
import { DetailedDgRunningComponent } from './detailed-dg-running/detailed-dg-running.component';
import { MemberDetailsTowerWiseComponent } from './member-details-tower-wise/member-details-tower-wise.component';
import { MeterStatusComponent } from './meter-status/meter-status.component';
import { AlarmingBalanceComponent } from './alarming-balance/alarming-balance.component';
import { MonthlyBillComponent } from './monthly-bill/monthly-bill.component';
import { FlatDebitCreditComponent } from './flat-debit-credit/flat-debit-credit.component';
import { DailyDataCsvComponent } from './daily-data-csv/daily-data-csv.component';
import { CouponRechargeCsvComponent } from './coupon-recharge-csv/coupon-recharge-csv.component';
import { CouponGenerationCsvComponent } from './coupon-generation-csv/coupon-generation-csv.component';
import { MonthlyDataFlatWiseCsvComponent } from './monthly-data-flat-wise-csv/monthly-data-flat-wise-csv.component';
import { MonthlyDataDateWiseCsvComponent } from './monthly-data-date-wise-csv/monthly-data-date-wise-csv.component'

@NgModule({
  declarations: [RechargedCoupenComponent, CouponRequestComponent, PrintedCouponComponent, DailyFlatWiseComponent, DailyDateWiseComponent, MonthlyFlatWiseComponent, MonthlyDateWiseComponent, DetailedDgRunningComponent, MemberDetailsTowerWiseComponent, MeterStatusComponent, AlarmingBalanceComponent, MonthlyBillComponent, FlatDebitCreditComponent, DailyDataCsvComponent, CouponRechargeCsvComponent, CouponGenerationCsvComponent, MonthlyDataFlatWiseCsvComponent, MonthlyDataDateWiseCsvComponent],
  imports: [FlexLayoutModule, FormsModule, ReactiveFormsModule, NgxDatatableModule, SharedMaterialModule,
    CommonModule,
    ReportRoutingModule, SatDatepickerModule, SatNativeDateModule
  ],
  providers: [MatTableDataSource,DatePipe]
})
export class ReportModule { }
