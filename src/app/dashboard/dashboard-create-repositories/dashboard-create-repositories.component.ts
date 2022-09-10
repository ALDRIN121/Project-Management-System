import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GithubApiService } from 'src/app/services/github-api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-create-repositories',
  templateUrl: './dashboard-create-repositories.component.html',
  styleUrls: ['./dashboard-create-repositories.component.css']
})
export class DashboardCreateRepositoriesComponent implements OnInit {
localRepositoryForm =new FormGroup({
  name: new FormControl(),
  experience: new FormControl(),
  duration: new FormControl(),
  effort: new FormControl(),
  entities: new FormControl(),
  functions: new FormControl()
})
  userID: any;
  constructor(private service: GithubApiService,
    private _snackBar: MatSnackBar) {
   }

  ngOnInit(): void {
    this.userID = sessionStorage.getItem('userID');
  }
  createLocalRepo(){
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
    this.service.insertLocalRepo(body).subscribe((response:any)=>{
      console.log(response);
      if(response.success == true){
        this._snackBar.open(response.msg, "OK");
        this.localRepositoryForm.setValue({
          "name": "",
          "experience": "",
          "duration":"",
          "effort":"",
          "entities" :"",
          "functions":"",
        })
      }
      else{
        this._snackBar.open(response.msg, "OK");
      }
    })
    
  }

}
