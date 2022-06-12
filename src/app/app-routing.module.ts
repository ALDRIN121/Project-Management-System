import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardCreateRepositoriesComponent } from './dashboard/dashboard-create-repositories/dashboard-create-repositories.component';
import { DashboardMainpgComponent } from './dashboard/dashboard-mainpg/dashboard-mainpg.component';
import { DashboardRepositoriesComponent } from './dashboard/dashboard-repositories/dashboard-repositories.component';
import { DashboardShedulerComponent } from './dashboard/dashboard-sheduler/dashboard-sheduler.component';

const routes: Routes = [
  {
    component: DashboardMainpgComponent,
    path:'home'
  },
  {
    component:DashboardRepositoriesComponent,
    path:'repositories'
  },
  {
    component:DashboardShedulerComponent,
    path:'sheduler'
  },
  {
    component:DashboardCreateRepositoriesComponent,
    path:'create'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
