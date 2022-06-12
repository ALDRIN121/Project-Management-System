import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';



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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardSidebarComponent,
    DashboardMainpgComponent,
    DashboardRepositoriesComponent,
    DashboardShedulerComponent,
    DashboardCreateRepositoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
