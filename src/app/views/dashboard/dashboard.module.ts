import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { HighchartsChartComponent } from 'highcharts-angular';
 
import { DashboardRoutes } from "./dashboard.routing";
import { AnalyticsComponent } from './analytics/analytics.component';
import { DashboardDarkComponent } from './dashboard-dark/dashboard-dark.component';
import { CryptocurrencyComponent } from './cryptocurrency/cryptocurrency.component';
import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { GroupDashboardComponent } from './group-dashboard/group-dashboard.component';
import { SocietyDashboardComponent } from './society-dashboard/society-dashboard.component';
import { ResidentDashboardComponent } from './resident-dashboard/resident-dashboard.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { FlipModule } from 'ngx-flip';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { DisccustionDialogComponent } from 'app/views/disccustion-dialog/disccustion-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MeterDetailComponent } from './meter-detail/meter-detail.component';

@NgModule({
  imports: [FlipModule,
    SharedMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ChartsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    SharedPipesModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [DisccustionDialogComponent,HighchartsChartComponent,AnalyticsComponent, DashboardDarkComponent, CryptocurrencyComponent, DefaultDashboardComponent, AdminDashboardComponent, GroupDashboardComponent, SocietyDashboardComponent, ResidentDashboardComponent, StaffDashboardComponent, MeterDetailComponent],
  exports: [],
  entryComponents:[DisccustionDialogComponent]
})
export class DashboardModule {

}