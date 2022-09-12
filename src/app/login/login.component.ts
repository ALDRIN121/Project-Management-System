import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GithubApiService } from '../services/github-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    userEmail: new FormControl(),
    password: new FormControl()
  })
  showError: boolean;
  @Output() showDashboard = new EventEmitter();
  registerPage: boolean;
  githubID: any;
  constructor(private service: GithubApiService,
    private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerPage = false
  }
  showLogin(){
    this.ngOnInit();
  }
  showRegister(){
    this.registerPage = true;
  }

  checkUserDetails(){
    console.log(this.loginForm.value);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!this.loginForm.value.userEmail.match(mailformat))
  {
  this._snackBar.open("Invalid email","OK");
  }
    this.service.getUserDetails().subscribe((response)=>{
      console.log(response);
      sessionStorage.setItem('email',this.loginForm.value.userEmail);
      for(let x of response.data){
        if(x.useremail == this.loginForm.value.userEmail && x.password == this.loginForm.value.password){
          // this.githubID = x.githubID;
          console.log(x.githubID);
          
          sessionStorage.setItem('githubID',x.githubID)
          sessionStorage.setItem('userID',x.id)
          this.showDashboard.emit();
          console.log("success login");
          this.showError = false
        }
        else{
          console.log("wrong password");
          this.showError = true
          
        }

        
      }
    })
  }

}
