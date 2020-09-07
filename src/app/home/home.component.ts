import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profiles: any[];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    
    this.getProfile();
  }

  getProfile() {
    this.http.get('profile')
    .subscribe(res => {
      console.log(res);
      this.profiles = res['data'].rows;
    }, err => {
      console.log(err);
    });
  }


}
