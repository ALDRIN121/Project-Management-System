import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GithubApiService } from '../services/github-api.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','description','Issue Type'];
  issueForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    issueType: new FormControl()
  })
  userID: any;
  data: any;
  data1: any = [];
  constructor(private service: GithubApiService) { }

  ngOnInit(): void {
    this.userID = sessionStorage.getItem('userID');
    this.getIssues()
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
        location.reload();
      }
      
    })
  }

  getIssues(){
    this.service.getIssues().subscribe((response)=>{
      console.log(response);
      for(let x of response.data){
        if(x.userID == this.userID){
          this.data1.push(x)
        }
      }
      
      this.data = new MatTableDataSource<any>(this.data1)
    })
  }

}
