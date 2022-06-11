import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  constructor(private http: HttpClient) { }
  private url="https://api.github.com/users/ALDRIN121/repos";
  getRepositories(){
    return this.http.get<any>(this.url);
  }

}
