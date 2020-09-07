import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get(path: string) {
    return this.http.get(environment.apiurl + path);
  }

  public post(path: string, body: any) {
    return this.http.post(environment.apiurl + path, body);
  }

  public put(path: string, body: any) {
    return this.http.put(environment.apiurl + path, body);
  }
}
