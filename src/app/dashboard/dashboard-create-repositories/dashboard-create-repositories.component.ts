import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-create-repositories',
  templateUrl: './dashboard-create-repositories.component.html',
  styleUrls: ['./dashboard-create-repositories.component.css']
})
export class DashboardCreateRepositoriesComponent implements OnInit {

  bsValue = new Date();
   bsRangeValue: Date[];
   maxDate = new Date();
   minDate = new Date();
  constructor() {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
   }

  ngOnInit(): void {
  }

}
