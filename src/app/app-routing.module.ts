import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { DashboardCreateRepositoriesComponent } from './dashboard/dashboard-create-repositories/dashboard-create-repositories.component';
import { DashboardMainpgComponent } from './dashboard/dashboard-mainpg/dashboard-mainpg.component';
import { DashboardRepositoriesComponent } from './dashboard/dashboard-repositories/dashboard-repositories.component';
import { DashboardShedulerComponent } from './dashboard/dashboard-sheduler/dashboard-sheduler.component';
import { GithubRepositoriesComponent } from './github-repositories/github-repositories.component';
import { IssuesComponent } from './issues/issues.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {
    component: DashboardMainpgComponent,
    path:'home'
  },
  {
    component:DashboardRepositoriesComponent,
    path:'local'
  },
  {
    component: AccountComponent,
    path:'account'
  },
  {
    component:GithubRepositoriesComponent,
    path: 'github-repositories'
  },
  {
    component:TasksComponent,
    path:'task'
  },
  {
    component:IssuesComponent,
    path:'issues'
  },
  // {
  //   path:'register',
  //   component:RegisterComponent
  // },
  // {
  //   path:'login',
  //   component:LoginComponent
  // },
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
