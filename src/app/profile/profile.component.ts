import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert/dist/sweetalert.min.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
profiles: any[] = [];
editProfile: any[];
edit_profile_form: FormGroup;
profile_id: number;
showEdit: boolean = false;
cols: any[];
name: string;
loading: boolean = false;
submitted: boolean = false;

  constructor(private http: HttpService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.profile_id = parseInt(params.get('id'));
      console.log(this.profile_id);
    });

    this.edit_profile_form = this.formBuilder.group({
      name: ['', Validators.required],
      sport: [ '', Validators.required ],
      nationality: [ '', Validators.required ],
      dob: ['', Validators.required],
      gender: ['', Validators.required ],
      description: ['', Validators.required ],
      team: ['', Validators.required ],
      association: ['', Validators.required ],
      facebook: ['', Validators.required ],
      instagram: ['', Validators.required ],
      twitter: ['', Validators.required ]
    });


    this.getProfile();
  }

  get editPartnerFormControls() {
    return this.edit_profile_form.controls;
  }

  getProfile() {
    this.http.get(`profile/${this.profile_id}`)
    .subscribe(res => {
      console.log(res);
      let selected_profile = res['data'];
      console.log(selected_profile);
      this.profiles.push(res['data']);
      this.name = res['data'].name;
      this.cols = Object.keys(res['data']);

      this.edit_profile_form = this.formBuilder.group({
        name: [selected_profile.name, Validators.required],
        sport: [ selected_profile.sport.name, Validators.required ],
        nationality: [ selected_profile.nationality, Validators.required ],
        dob: [selected_profile.dob, Validators.required],
        gender: [selected_profile.dob, Validators.required ],
        description: [selected_profile.description, Validators.required ],
        team: [selected_profile.team, Validators.required ],
        association: [selected_profile.association, Validators.required ],
        facebook_handle: [selected_profile.facebook_handle, Validators.required ],
        instagram_handle: [selected_profile.instagram_handle, Validators.required ],
        twitter_handle: [selected_profile.twitter_handle, Validators.required ]
      });

    }, err => {
      console.log(err);
    });
  }

  geteditProfile() {

    // if (this.edit_profile_form.invalid) {
    //   console.log(this.edit_profile_form);
    //   this.loading = false;
    //   return;
    // }

    // this.loading = true;

    this.http.put(`profile/edit-profile/${this.profile_id}`, {
      name: this.editPartnerFormControls.name.value,
      sport_name: this.editPartnerFormControls.sport.value,
      nationality: this.editPartnerFormControls.nationality.value,
      dob: this.editPartnerFormControls.dob.value,
      gender: parseInt(this.editPartnerFormControls.gender.value) === 0 ? 'Male' : 'Female',
      description: this.editPartnerFormControls.description.value,
      association: this.editPartnerFormControls.association.value,
      team: this.editPartnerFormControls.team.value,
      facebook_handle: this.editPartnerFormControls.facebook.value,
      instagram_handle: this.editPartnerFormControls.instagram.value,
      twitter_handle: this.editPartnerFormControls.twitter.value
    })
    .subscribe(res => {
      console.log(res['data']);
      this.editProfile = res['data'];
      swal("Good job!", "Profile edited successfully!", "success");
      this.submitted = !this.submitted;
    })
  }

  changeFlag()  {
    this.showEdit = !this.showEdit
  }

}
