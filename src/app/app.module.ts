import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
// import { ToastrModule } from 'ngx-toastr';
import {MatSnackBarModule} from '@angular/material/snack-bar';



import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardMainpgComponent } from './dashboard/dashboard-mainpg/dashboard-mainpg.component';
import { DashboardRepositoriesComponent } from './dashboard/dashboard-repositories/dashboard-repositories.component';
import { DashboardSidebarComponent } from './dashboard/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardShedulerComponent } from './dashboard/dashboard-sheduler/dashboard-sheduler.component';
import { DashboardCreateRepositoriesComponent } from './dashboard/dashboard-create-repositories/dashboard-create-repositories.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GithubRepositoriesComponent } from './github-repositories/github-repositories.component';
import { TasksComponent } from './tasks/tasks.component';
import { IssuesComponent } from './issues/issues.component';
import { AccountComponent } from './account/account.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardSidebarComponent,
    DashboardMainpgComponent,
    DashboardRepositoriesComponent,
    DashboardShedulerComponent,
    DashboardCreateRepositoriesComponent,
    LoginComponent,
    RegisterComponent,
    GithubRepositoriesComponent,
    TasksComponent,
    IssuesComponent,
    AccountComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
