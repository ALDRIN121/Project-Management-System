import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-mainpg',
  templateUrl: './dashboard-mainpg.component.html',
  styleUrls: ['./dashboard-mainpg.component.css']
})
export class DashboardMainpgComponent implements OnInit {

  constructor() { }

  userName:any="aldrin121";
  data:any =[];
  gitHubRepositoryCount: number =11;
  ngOnInit(): void {
  }

}
