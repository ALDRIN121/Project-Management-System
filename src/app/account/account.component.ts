import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GithubApiService } from '../services/github-api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
accountForm = new FormGroup({
  userName: new FormControl(),
  userEmail: new FormControl(),
  githubID: new FormControl(),
  githubURL: new FormControl(),
  password: new FormControl()
})
  userID: string;
  data: any;
  isEditable: boolean;
  constructor(private service: GithubApiService) { }

  ngOnInit(): void {
    this.isEditable  =false;
    this.userID = sessionStorage.getItem('userID');
    this.getDetails();
  }

  getDetails(){
    
    this.service.getUserDetails().subscribe((response)=>{
      console.log(response);
      for(let x of response.data){
        if( x.id == this.userID){
          console.log(x);
          
          this.data = x;
          this.accountForm.setValue({
            userName: this.data.username,
            userEmail: this.data.useremail,
            githubID: this.data.githubID,
            githubURL: this.data.github,
            password: this.data.password
          })
        }
      }
      this.accountForm.controls['userName'].disable();
      this.accountForm.controls['userEmail'].disable();
      this.accountForm.controls['githubID'].disable();
      this.accountForm.controls['githubURL'].disable();
      this.accountForm.controls['password'].disable();
    })
    
    

  }
  edit(){
    this.accountForm.controls['userName'].enable();
      this.accountForm.controls['userEmail'].enable();
      this.accountForm.controls['githubID'].enable();
      this.accountForm.controls['githubURL'].enable();
      this.accountForm.controls['password'].enable();
      this.isEditable = true;
  }
  save(){
    console.log(this.accountForm.value);
    let body ={
      "username":this.accountForm.value.userName,
      "useremail":this.accountForm.value.userEmail,
      "github":this.accountForm.value.githubURL,
      "password":this.accountForm.value.password,
      "githubaccount":this.accountForm.value.githubID
    }
    console.log(body);
    
    this.service.updateUser(body,this.userID).subscribe((response)=>{
      console.log(response);
      if(response.success == true){
        this.accountForm.controls['userName'].disable();
        this.accountForm.controls['userEmail'].disable();
        this.accountForm.controls['githubID'].disable();
        this.accountForm.controls['githubURL'].disable();
        this.accountForm.controls['password'].disable();
      this.isEditable = false;

      }
      
    })
  }
}
