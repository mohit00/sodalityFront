import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/services/auth/auth.guard';

export const rootRouterConfig: Routes = [
  { 
    path: '', 
    redirectTo: 'sessions/Login', 
    pathMatch: 'full' 
  },
   
  {
    path: '', 
    component: AuthLayoutComponent,
    children: [
      { 
        path: 'sessions', 
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session'} 
      }
    ]
  },
  {
    path: '', 
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'dashboard', 
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule), 
        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD'}
      } , {
        path: 'search', 
        loadChildren: () => import('./views/search-view/search-view.module').then(m => m.SearchViewModule)
      },{
        path:'society',
        loadChildren: () => import('./views/manage-society/manage-society.module').then(m => m.ManageSocietyModule),
                data: { title: 'Sociey', breadcrumb: 'Sociey'}


      },{
        path:'Tower',
        loadChildren: () => import('./views/tower/tower.module').then(m => m.TowerModule),
                data: { title: 'Tower', breadcrumb: 'Tower'}


      },{
        path:'Unit',
        loadChildren: () => import('./views/flat/flat.module').then(m => m.FlatModule),
                data: { title: 'Flat', breadcrumb: 'Flat'}


      },{
        path:'Category',
        loadChildren: () => import('./views/category/category.module').then(m => m.CategoryModule),
                data: { title: 'Category', breadcrumb: 'Category'}

      },{
        path:'Staff',
        loadChildren: () => import('./views/staff/staff.module').then(m => m.StaffModule),
                data: { title: 'Staff', breadcrumb: 'Staff'}

      },{
        path:'Resident',
        loadChildren: () => import('./views/resident/resident.module').then(m => m.ResidentModule),
                data: { title: 'Resident', breadcrumb: 'Resident'}

      },{
        path:'UnitType',
        loadChildren: () => import('./views/unit-type/unit-type.module').then(m => m.UnitTypeModule),
                data: { title: 'Unit Type', breadcrumb: 'UnitType'}

      },{
        path:'Complain',
        loadChildren: () => import('./views/complain/complain.module').then(m => m.ComplainModule),
                data: { title: 'Complain', breadcrumb: 'Complain'}

      },
     
    ]
  }
];

