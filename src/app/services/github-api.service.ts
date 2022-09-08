import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  constructor(private http: HttpClient) { }
  private url="https://api.github.com/users/ALDRIN121/repos";
  private url1 = "http://127.0.0.1:8000"
  getRepositories(){
    return this.http.get<any>(this.url);
  }
  getUserDetails(){
    return this.http.get<any>(this.url1+"/api/login");
  }
  insertRegisterData(body:any){
    return this.http.post(this.url1+"/api/register",body);
  }

}
