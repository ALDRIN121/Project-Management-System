import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { GithubApiService } from '../services/github-api.service';
@Component({
  selector: 'app-github-repositories',
  templateUrl: './github-repositories.component.html',
  styleUrls: ['./github-repositories.component.css']
})
export class GithubRepositoriesComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['id', 'name','size','view'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userName: string;
  data: any;
  githubURL: string;
  
  constructor(private service: GithubApiService) { }
  ngAfterViewInit() {
    this.data.paginator = this.paginator;

    throw new Error('Method not implemented.');
  }
  
  
  ngOnInit(): void {
    this.userName = sessionStorage.getItem('githubID');
    this.getRepositoryData();
  }
  getRepositoryData(){
    this.service.getRepositories(this.userName).subscribe((response)=>{
      console.log(response);
      this.data = new MatTableDataSource<any>(response)
      this.githubURL = "https://github.com/"+this.userName
      // let dataSource = new MatTableDataSource<any>(this.data);
    })
  }


}

