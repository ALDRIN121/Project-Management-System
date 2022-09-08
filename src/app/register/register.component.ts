import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GithubApiService } from '../services/github-api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    userName: new FormControl(),
    gitHubURL: new FormControl(),
    password: new FormControl()
  })
  @Output() loginPage = new EventEmitter();
  constructor(
    private service: GithubApiService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.registerForm.value);

    // let body = new URLSearchParams;
    // body.set('username',this.registerForm.value.userName)
    // body.set('github',this.registerForm.value.gitHubURL)
    // body.set('password',this.registerForm.value.password)
    let body ={
      "username":this.registerForm.value.userName,
      "github":this.registerForm.value.gitHubURL,
      "password":this.registerForm.value.password
    }
    this.service.insertRegisterData(body).subscribe((response:any)=>{
            if(response.success == true){
              this.router.navigate(['/login'])
              this._snackBar.open("SignUp DONE","OK");
            }
            else{
            }

    }) 
  }
  showLogin(){
    this.loginPage.emit()
  }

}
