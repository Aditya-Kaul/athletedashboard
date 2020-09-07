import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import swal from 'sweetalert/dist/sweetalert.min.js';
import { HttpService } from '../services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreateProfileComponent implements OnInit {
basicInfoForm: FormGroup;
aboutForm: FormGroup;
socialMediaForm: FormGroup;
newProfile: any[];
name: string;
sport: string;
sport_id: string;
nationality: string;
dob: string;
gender: string;
description: string;
location: string;
team: string;
association: string;
facebook: string;
twitter: string;
instagram: string;
loading: boolean = false;
submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpService) { }

  ngOnInit(): void {

    // $(document).ready(() => {
    //   $('#select-sport').select2({
    //     allowClear: true,
    //     placeholder: '',
    //     width: '100px',
    //     ajax: {
    //       url: environment.apiurl + '/sport',
    //       data: (params) => {
    //         let query = {
    //           name: params.term,
    //         };
    //         return query;
    //       },
    //       processResults: (data) => {
    //         // Tranforms the top-level key of the response object from 'items' to 'results'
    //         let dataArray = $.map(data, function(obj) {
    //           obj.text = obj.text || obj.name;
    //           return obj;
    //         });
    //         let sports= {
    //           results: dataArray
    //         };
    //         return sports;
    //       }
    //     }
    //   })
    //   .on('select2:select', (e) => {
    //     this.sport_id = e.params.data.id;
    //   })
    //   .on('select2:unselect', (e) => {
    //     this.sport_id = undefined;
    //   });
    // });

    this.basicInfoForm = this.formBuilder.group({
      name: ['', Validators.required],
      sport: [ '', Validators.required ],
      nationality: [ '', Validators.required ],
      dob: ['', Validators.required],
      gender: ['', Validators.required ]
    });

    this.aboutForm = this.formBuilder.group({
      description: ['', Validators.required ],
      team: ['', Validators.required ],
      association: ['', Validators.required ]
    });

    this.socialMediaForm = this.formBuilder.group({
      facebook: ['', Validators.required ],
      instagram: ['', Validators.required ],
      twitter: ['', Validators.required ]
    });
    
  }

  get basicInfoFormControls() {
    // console.log(this.basicInfoForm.invalid + ' basicInfoForm');
    return this.basicInfoForm.controls;
  }

  get aboutFormControls() {
    // console.log(this.aboutForm.invalid + ' aboutForm');
    return this.aboutForm.controls;
  }

  get socialMediaFormControls() {
    // console.log(this.socialMediaForm.invalid + ' socialMediaForm');
    return this.socialMediaForm.controls;
  }

  getSummary() {
    this.name = this.basicInfoFormControls.name.value;
    this.sport = this.basicInfoFormControls.sport.value;
    this.nationality = this.basicInfoFormControls.nationality.value;
    this.dob = this.basicInfoFormControls.dob.value;
    this.gender = parseInt(this.basicInfoFormControls.gender.value) === 0 ? 'Male' : parseInt(this.basicInfoFormControls.gender.value) === 1 ? 'Female' : null;
    this.description = this.aboutFormControls.description.value;
    this.association = this.aboutFormControls.association.value;
    this.team = this.aboutFormControls.team.value;
    this.facebook = this.socialMediaFormControls.facebook.value;
    this.instagram = this.socialMediaFormControls.instagram.value;
    this.twitter = this.socialMediaFormControls.twitter.value;
  }

  createProfile() {

    if (this.basicInfoForm.invalid && this.aboutForm.invalid && this.socialMediaForm.invalid) {
      this.loading = false;
      return;
    }

    this.loading = true;

    this.http.post('profile/create-profile', {
      name: this.name,
      sport_name: this.sport,
      nationality: this.nationality,
      dob: this.dob,
      gender: this.gender,
      description: this.description,
      location: this.location,
      association: this.association,
      team: this.team,
      facebook_handle: this.facebook,
      instagram_handle: this.instagram,
      twitter_handle: this.twitter
    })
    .subscribe(res => {
      console.log(res['data']);
      this.newProfile = res['data'];
      swal("Good job!", "Profile created successfully!", "success");
      this.submitted = !this.submitted;
    })
  }
}
