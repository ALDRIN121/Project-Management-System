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
  functions: new FormControl(),
  status: new FormControl()
})
  userID: any;
  efforRequired: any;
  showRecco: boolean;
  totalDays: number;
  constructor(private service: GithubApiService,
    private _snackBar: MatSnackBar) {
   }

  ngOnInit(): void {
    this.userID = sessionStorage.getItem('userID');
    this.showRecco = false;
    this.localRepositoryForm.setValue({
      "name": "",
      "experience": 0,
      "duration": 1,
      "effort": "",
      "entities": 5,
      "functions": 70,
      "status": ""
    })
    
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
      "functions":this.localRepositoryForm.value.functions,
      "projectStatus": this.localRepositoryForm.value.status
    }
    this.service.insertLocalRepo(body).subscribe((response:any)=>{
      console.log(response);
      if(response.success == true){
        this._snackBar.open(response.msg, "OK");
        
      }
      else{
        this._snackBar.open(response.msg, "OK");
      }
    })
    let body1 = {
      "experience": this.localRepositoryForm.value.experience, // 0-10
      "duration":this.localRepositoryForm.value.duration , //1 -39
      "entities" :this.localRepositoryForm.value.entities, //5-387
      "functions":this.localRepositoryForm.value.functions, //70 - 1127
    }
    this.service.localRepoAI(body1).subscribe((response)=>{
      console.log(response);
      this.totalDays = Number(this.localRepositoryForm.value.duration) * 30
      this.efforRequired = Number(response.data)/Number(this.localRepositoryForm.value.effort);
      this.efforRequired = Math.round(this.efforRequired/30);
      // this.efforRequired / this.localRepositoryForm.value.effort
      // if(this.efforRequired < this.localRepositoryForm.value.effort)
      this.showRecco = true;
    })
    
  }

}
