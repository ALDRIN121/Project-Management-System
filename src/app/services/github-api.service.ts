import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  constructor(private http: HttpClient) { }
  // private url="https://api.github.com/users/ALDRIN121/repos";
  private url="https://api.github.com/users/";

  private url1 = "http://127.0.0.1:8000"
  getRepositories(userName:any){
    return this.http.get<any>(this.url+userName+"/repos");
  }
  getUserDetails(){
    return this.http.get<any>(this.url1+"/api/login");
  }
  insertRegisterData(body:any){
    return this.http.post(this.url1+"/api/register",body);
  }
  insertLocalRepo(body:any){
    return this.http.post(this.url1+"/api/localRepo",body);
  }
  getLocalRepo(id:any){
    return this.http.get<any>(this.url1+"/api/localRepo/"+id);
  }
  insertTask(body:any){
    return this.http.post(this.url1+"/api/task",body);
  }
  insertIssue(body:any){
    return this.http.post(this.url1+"/api/issue",body);
  }
  getIssues(){
    return this.http.get<any>(this.url1+"/api/issue");

  }
  getTask(){
    return this.http.get<any>(this.url1+"/api/task");
  }
  updateUser(body:any,id:any){
    return this.http.put<any>(this.url1+"/api/login/"+id,body)
  }
  setShedule(body:any){
    return this.http.post(this.url1+"/api/shedule",body);
  }
  getShedule(id:any){
    return this.http.get<any>(this.url1+"/api/shedule/"+id)
  }
  updateShedule(body:any,id:any){
    return this.http.put<any>(this.url1+"/api/shedule/"+id,body)
  }
  deleteShedule(id:any){
    return this.http.delete<any>(this.url1+"/api/shedule/"+id)
  }
  editLocalRepo(body:any,id:any){
    return this.http.put<any>(this.url1+"/api/localRepo/"+id,body)
  }
  deleteLocalRepo(id:any){
    return this.http.delete<any>(this.url1+"/api/localRepo/"+id)
  }

}
