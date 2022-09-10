import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
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
  constructor(private service: GithubApiService){}
  ngAfterViewInit() {

  }
  ngOnInit() {
    this.userID = sessionStorage.getItem('userID');
    this.getShedule();
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
      }
      
    })
  }

  getShedule(){
    this.service.getShedule(this.userID).subscribe((response:any)=>{
      console.log(response);
  this.dataSource = new MatTableDataSource<any>(response.data);

      
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
      }
      
    })
    
  }
}



