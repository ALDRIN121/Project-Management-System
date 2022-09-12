import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GithubApiService } from '../services/github-api.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','description','Issue Type','edit','delete'];
  issueForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    issueType: new FormControl()
  })
  userID: any;
  data: any;
  data1: any = [];
  datas: any;
  name: any;
  id: any;
  issue: any;
  constructor(private service: GithubApiService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userID = sessionStorage.getItem('userID');
    this.getIssues();
    this.getLocalData()
  }

  setIssue(){
    let body = {
      'userID': this.userID,
      'name': this.issueForm.value.name,
      'description': this.issueForm.value.description,
      'issueType': this.issueForm.value.issueType
    }
    this.service.insertIssue(body).subscribe((response:any)=>{
      
      console.log(response);
      if(response.success == true){
        document.getElementById("closebtn").click();
        this.getIssues();
        this._snackBar.open(response.msg,"OK");
      }
      
    })
  }

  getIssues(){
    this.service.getIssues(this.userID).subscribe((response)=>{
      console.log(response);
      this.data = new MatTableDataSource<any>(response.data)
      this.issue = response.data;
    })
  }

  getLocalData(){
    this.service.getLocalRepo(this.userID).subscribe((response)=>{
      console.log(response);
      this.datas = response.data;
    })
  }

  editIssue(data:any){
    console.log(data);
    this.id = data.id;
    this.name = data.name;
    this.issueForm.setValue({
      name: data.name,
      description: data.description,
      issueType: data.issueType
    })
    this.issueForm.controls['name'].disable();
    
  }
  updateIssue(){
    console.log(this.issueForm.value);
    let body = {
      'userID': this.userID,
      'name': this.name,
      'description': this.issueForm.value.description,
      'issueType': this.issueForm.value.issueType
    }
    this.service.updateIssue(body,this.id).subscribe((response)=>{
      console.log(response);
      if(response.success == true){
        document.getElementById("closebtn1").click();
      this.getIssues();
      this._snackBar.open(response.msg,"OK");
      }
      else{
      this._snackBar.open(response.msg,"OK");
      }


    })
  }
  deleteIssue(data:any){
    console.log(data);
    this.service.deleteIssue(data.id).subscribe((response)=>{
      console.log(response);
      if(response.success == true){
        this.getIssues()
        this._snackBar.open(response.msg,"OK");
      }
      
    })
    
  }
}
