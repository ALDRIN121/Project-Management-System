import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { GithubApiService } from 'src/app/services/github-api.service';
import { DashboardRepositoriesComponent } from '../dashboard-repositories/dashboard-repositories.component';

@Component({
  selector: 'app-dashboard-mainpg',
  templateUrl: './dashboard-mainpg.component.html',
  styleUrls: ['./dashboard-mainpg.component.css']
})
export class DashboardMainpgComponent implements OnInit {
  githubID: string;
  totalLocalRepos: any;
  userID: any;
  data1: any = [];

  constructor(private route: Router,
    private service: GithubApiService) { }

  userName:any;
  data:any =[];
  gitHubRepositoryCount: any;
  @Output() logoutbtn = new EventEmitter()
  @ViewChild (DashboardRepositoriesComponent) localRep : DashboardRepositoriesComponent;
  ngOnInit(): void {
    this.userName = sessionStorage.getItem('githubID')
    this.userID = sessionStorage.getItem('userID');
    this.getRepositoryData()
    this.getLocalData()
    
    // this.localRep.ngOnInit();
    // this.totalLocalRepos = sessionStorage.getItem('totalLocalRepos');
    console.log(this.githubID);
  }
  getLocalData(){
    this.service.getLocalRepo(this.userID).subscribe((response)=>{
      console.log(response);
      this.totalLocalRepos = Object.keys(response.data).length 
    })
  }


  logout(){
    sessionStorage.setItem('isLogged',"false")
    this.route.navigate(['/'])
    location.reload();
  }
  getRepositoryData(){
    this.service.getRepositories(this.userName).subscribe((response)=>{
      console.log(response);
      this.gitHubRepositoryCount = Object.keys(response).length
    })
  }

}
