import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { GithubApiService } from 'src/app/services/github-api.service';
@Component({
  selector: 'app-dashboard-repositories',
  templateUrl: './dashboard-repositories.component.html',
  styleUrls: ['./dashboard-repositories.component.css']
})
export class DashboardRepositoriesComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['id', 'name','experience','effort','entities','functions','Edit','Delete'];
  localRepositoryForm =new FormGroup({
    name: new FormControl(),
    experience: new FormControl(),
    duration: new FormControl(),
    effort: new FormControl(),
    entities: new FormControl(),
    functions: new FormControl()
  })
    userID: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  data: MatTableDataSource<any>;
  totalLocalRepos: any;
  data1: any =[];
  id: any;
  constructor(private service: GithubApiService) { }
  ngAfterViewInit() {
    // this.data.paginator = this.paginator;
  }
  ngOnInit() {
    this.userID = sessionStorage.getItem('userID');
    this.getLocalData();
  }
  getLocalData(){
    this.service.getLocalRepo(this.userID).subscribe((response)=>{
    
      
      this.data = new MatTableDataSource<any>(response.data)
      this.totalLocalRepos = Object.keys(this.data1).length 
      sessionStorage.setItem('totalLocalRepos',this.totalLocalRepos)
    })
  }
  editLocalRepo(data:any){
    console.log(data);
    this.id = data.id
    this.localRepositoryForm.setValue({
      "name": data.name,
      "experience": data.experience,
      "duration":data.duration,
      "effort":data.effort,
      "entities" :data.entities,
      "functions":data.functions,
    })
    
  }
  deleteLocalRepo(data:any){
    console.log(data);
    this.service.deleteLocalRepo(data.id).subscribe((response)=>{
      console.log(response);
      if(response.success == true){
        this.getLocalData()
      }
    })
    
  }
  submitEditLocalRepo(){
    console.log(this.localRepositoryForm.value);
    let body ={
      "userID":this.userID,
      "name": this.localRepositoryForm.value.name,
      "experience": this.localRepositoryForm.value.experience,
      "duration":this.localRepositoryForm.value.duration ,
      "effort":this.localRepositoryForm.value.effort,
      "entities" :this.localRepositoryForm.value.entities,
      "functions":this.localRepositoryForm.value.functions
    }
    this.service.editLocalRepo(body,this.id).subscribe((response)=>{
      console.log(response);
      if(response.success == true){
        document.getElementById("closebtn").click()
        this.getLocalData()
      }
      
    })
    
  }
}


