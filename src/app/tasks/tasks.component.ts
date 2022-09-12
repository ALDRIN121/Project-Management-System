import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GithubApiService } from '../services/github-api.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','task','dueDate','status','edit','delete'];
  taskForm= new FormGroup({
    name: new FormControl(),
    task: new FormControl(),
    dueDate: new FormControl(),
    status: new FormControl()
  })
  userID: string;
  data: any;
  data1: any = [];
  datas: any;
  id: any;
  name: any;
  task: any;
  constructor(private service: GithubApiService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userID = sessionStorage.getItem('userID');
    this.getTasks();
    this.getLocalData()
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
        document.getElementById("closebtn").click();
        this.getTasks();
        this._snackBar.open(response.msg,"OK");
      }
    })
  }

  getTasks(){
    this.service.getTask(this.userID).subscribe((response)=>{
      console.log(response);
      this.data = new MatTableDataSource<any>(response.data)
      this.task = response.data
    })
  }

  getLocalData(){
    this.service.getLocalRepo(this.userID).subscribe((response)=>{
      console.log(response);
      this.datas = response.data;
    })
  }
  editTask(data:any){
    console.log(data);
    this.id = data.id;
    this.name = data.name;
    this.taskForm.setValue({
      name: data.name,
      task: data.task,
      dueDate: data.dueDate,
      status: data.status
    })
    this.taskForm.controls['name'].disable();
    
  }
  updateTask(){
    console.log(this.taskForm.value);
    let body = {
      'userID': this.userID,
      'name': this.name,
      'task': this.taskForm.value.task,
      'dueDate': this.taskForm.value.dueDate,
      'status': this.taskForm.value.status
    }
    this.service.updateTask(body,this.id).subscribe((response)=>{
      console.log(response);
      if(response.success == true){
      document.getElementById("closebtn1").click();
      this.getTasks();
      this._snackBar.open(response.msg,"OK");
      }
      else{
      this._snackBar.open(response.msg,"OK");
      }
    })
  }
  deleteTask(data:any){
    console.log(data);
    this.service.deleteTask(data.id).subscribe((response)=>{
      console.log(response);
      if(response.success == true){
        this.getTasks()
        this._snackBar.open(response.msg,"OK");
      }
    })
  }
}
