import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GithubApiService } from '../services/github-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  })
  showError: boolean;
  @Output() showDashboard = new EventEmitter();
  registerPage: boolean;
  constructor(private service: GithubApiService,
    private router: Router,) { }

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
    this.service.getUserDetails().subscribe((response)=>{
      console.log(response);
      for(let x of response.data){
        if(x.username == this.loginForm.value.userName && x.password == this.loginForm.value.password){
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
