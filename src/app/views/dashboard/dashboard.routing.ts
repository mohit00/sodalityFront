import { Routes } from "@angular/router";

import { AnalyticsComponent } from "./analytics/analytics.component";
import { DashboardDarkComponent } from "./dashboard-dark/dashboard-dark.component";
import { CryptocurrencyComponent } from "./cryptocurrency/cryptocurrency.component";
import { DefaultDashboardComponent } from "./default-dashboard/default-dashboard.component";

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
    data: { title: "Cryptocurrency", breadcrumb: "myxenius" }
  },
  {
    path: "dark",
    component: DashboardDarkComponent,
    data: { title: "Dark Cards", breadcrumb: "Dark Cards" }
  }
];
