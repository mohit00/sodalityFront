import { Routes } from "@angular/router";

import { AnalyticsComponent } from "./analytics/analytics.component";
import { DashboardDarkComponent } from "./dashboard-dark/dashboard-dark.component";
import { CryptocurrencyComponent } from "./cryptocurrency/cryptocurrency.component";
import { DefaultDashboardComponent } from "./default-dashboard/default-dashboard.component";
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component'
import {GroupDashboardComponent} from './group-dashboard/group-dashboard.component';
import {ResidentDashboardComponent} from './resident-dashboard/resident-dashboard.component';
import {SocietyDashboardComponent} from './society-dashboard/society-dashboard.component';
import {StaffDashboardComponent} from './staff-dashboard/staff-dashboard.component';
import {MeterDetailComponent} from './meter-detail/meter-detail.component'
export const DashboardRoutes: Routes = [
  {
    path: "default",
    component: DefaultDashboardComponent,
    data: { title: "Default", breadcrumb: "Default" }
  },
  {
    path: "facility",
    component: AnalyticsComponent,
    data: { title: "Analytics", breadcrumb: "Analytics" }
  },
  {
    path: "myxenius",
    component: CryptocurrencyComponent,
    data: { title: "Cryptocurrency", breadcrumb: "NoticeBoard" }
  },
  {
    path: "dark",
    component: DashboardDarkComponent,
    data: { title: "Dark Cards", breadcrumb: "Dark Cards" }
  }, {
    path: "Admin",
    component: AdminDashboardComponent,
    data: { title: "Admin", breadcrumb: "Admin" }
  }, {
    path: "Group",
    component: GroupDashboardComponent,
    data: { title: "Group", breadcrumb: "Group" }
  }, {
    path: "Resident",
    component: ResidentDashboardComponent,
    data: { title: "Resident", breadcrumb: "Resident" }
  }, {
    path: "Society",
    component: SocietyDashboardComponent,
    data: { title: "Society", breadcrumb: "Society" }
  }, {
    path: "Staff",
    component: StaffDashboardComponent,
    data: { title: "Staff", breadcrumb: "Staff" }
  },{
    path:"meter/detail",
    component:MeterDetailComponent,
    data: { title: "meter", breadcrumb: "Meter" }

  }
];
