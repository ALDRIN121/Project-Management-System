import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GithubApiService } from '../services/github-api.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','task','dueDate','status'];
  taskForm= new FormGroup({
    name: new FormControl(),
    task: new FormControl(),
    dueDate: new FormControl(),
    status: new FormControl()
  })
  userID: string;
  data: any;
  data1: any = [];
  constructor(private service: GithubApiService) { }

  ngOnInit(): void {
    this.userID = sessionStorage.getItem('userID');
    this.getTasks()
  }

  setTask(){
    let body ={
      'userID': this.userID,
      'name': this.taskForm.value.name,
      'task': this.taskForm.value.task,
      'dueDate': this.taskForm.value.dueDate,
      'status': this.taskForm.value.status
    }
    console.log(body);
    console.log(this.taskForm.value.dueDate);
    
    
    this.service.insertTask(body).subscribe((response:any)=>{
      console.log(response);
      if(response.success == true){
        document.getElementById("closebtn").click()
        location.reload()
      }
      
    })
  }

  getTasks(){
    this.service.getTask().subscribe((response)=>{
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
