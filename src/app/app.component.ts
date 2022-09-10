import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project-management-sysytem';
  isLoggedIn: boolean;
  isLogged: any;

  constructor(private route:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = false;
    this.isLogged =sessionStorage.getItem('isLogged');
    if(this.isLogged == "true"){
      this.showDashboard();
    }
    else if(this.isLogged == "false"){
      this.isLoggedIn = false;
    }
  }

  showDashboard(){
    this.isLoggedIn = true;
  }
  

  
}
