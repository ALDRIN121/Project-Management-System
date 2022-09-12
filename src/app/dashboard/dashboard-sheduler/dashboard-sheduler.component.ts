import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { GithubApiService } from 'src/app/services/github-api.service';

@Component({
  selector: 'app-dashboard-sheduler',
  templateUrl: './dashboard-sheduler.component.html',
  styleUrls: ['./dashboard-sheduler.component.css']
})
export class DashboardShedulerComponent implements AfterViewInit,OnInit {
  shedulerForm = new FormGroup({
    name: new FormControl(),
    shedule: new FormControl()
  })
  shedulerEditForm = new FormGroup({
    name: new FormControl(),
    shedule: new FormControl()
  })
  displayedColumns: string[] = ['id', 'name', 'shedule','Edit','Delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  userID: string;
  dataSource: MatTableDataSource<any>;
  name: any;
  id: any;
  data: any;
  userEmail: any;
  shedules: any;
  constructor(private service: GithubApiService,private _snackBar: MatSnackBar){}
  ngAfterViewInit() {

  }
  ngOnInit() {
    this.userID = sessionStorage.getItem('userID');
    this.userEmail = sessionStorage.getItem('email');
    this.getShedule();
    this.getLocalData();  
  }
  setShedule(){
    let body ={
      "userID": this.userID,
      "name": this.shedulerForm.value.name,
      "shedule": this.shedulerForm.value.shedule
    }
    this.service.setShedule(body).subscribe((response:any)=>{
      console.log(response);
      if(response.success == true){
        document.getElementById("closebtn1").click()
        this.getShedule()
        this._snackBar.open(response.msg,"OK");
        this.sendEmail(this.shedulerForm.value.name)
      }
      
    })
  }

  getShedule(){
    this.service.getShedule(this.userID).subscribe((response:any)=>{
      console.log(response);
  this.dataSource = new MatTableDataSource<any>(response.data);
  this.shedules = response.data;
      
    })
  }

  editShedule(data:any){
    this.shedulerEditForm.setValue({
      name: data.name,
      shedule: data.shedule
    })
    this.name = data.name;
    this.id = data.id;
    console.log(data);
    this.shedulerEditForm.controls['name'].disable();
  }
  deleteShedule(data:any){
    console.log(data);
    this.service.deleteShedule(data.id).subscribe((response)=>{
      console.log(response);
      if(response.success == true){
        this.getShedule()
        this._snackBar.open(response.msg,"OK");
      }
      
    })
    
  }
  submitEditShedule(){
    console.log(this.shedulerEditForm.value);
    let body = {
      "userID" : this.userID,
      "name": this.name,
      "shedule": this.shedulerEditForm.value.shedule
    }
    this.service.updateShedule(body,this.id).subscribe((response)=>{
      console.log(response);
      if(response.success == true){
        document.getElementById("closebtn").click()
        this.getShedule()
        this._snackBar.open(response.msg,"OK");
      }
      
    })
  }

  getLocalData(){
    this.service.getLocalRepo(this.userID).subscribe((response)=>{
      console.log(response);
      this.data = response.data;
    })
  }

  // getEmail(){
  //   this.service.getEmail(this.userID).subscribe((response)=>{
  //     console.log(response);
  //     this.userEmail = response.data.useremail;
  //     sessionStorage.se
  //   })
  // }
  sendEmail(name:any){
    console.log(this.userEmail);
    
    let body ={
      userEmail: this.userEmail,
      name: name
    }
    this.service.sendEmail(body).subscribe((response)=>{
      console.log(response);
      
    })
  }
}



