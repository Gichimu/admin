import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { matDrawerAnimations } from '@angular/material/sidenav';
import { HttpService } from '../services/http.service';

interface Sex {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-addkid',
  templateUrl: './addkid.component.html',
  styleUrls: ['./addkid.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true, displayDefaultIndicatorType: false },
    },
  ],
})
export class AddkidComponent implements OnInit {
  opened: boolean;
  isLinear = false;
  photoUrl: string = '';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  sexes: Sex[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
  ];

  relations: Sex[] = [
    {value: 'mother', viewValue: 'Mother'},
    {value: 'father', viewValue: 'Father'},
    {value: 'aunt', viewValue: 'Aunt'},
    {value: 'uncle', viewValue: 'Uncle'},
    {value: 'grandmother', viewValue: 'Grandmother'},
    {value: 'grandfather', viewValue: 'Grandmother'},
    {value: 'guardian', viewValue: 'Guardian'},
    {value: 'other', viewValue: 'Other'}
  ]

  constructor(private _formBuilder: FormBuilder, private readonly httpService: HttpService) {}

  myFilter = (d: Date | null): boolean => {
    const day = d || new Date();
    const today = new Date().getFullYear();
    // Prevent all days after today from being selected
    return !(day.getTime() > Date.parse(Date()));
  };

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      lastCtrl: [''],
      gender: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      nokCtrlName: ['', Validators.required],
      nokCtrlLastName: ['', Validators.required],
      nokCtrlNumber: ['', Validators.required],
      relation: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  handleUpload(e) {
    this.photoUrl = e.cdnUrl;
  }

  uploadForm() {
    const data = {
      firstName: this.firstFormGroup.value.firstCtrl,
      middleName: this.firstFormGroup.value.secondCtrl,
      lastName: this.firstFormGroup.value.lastCtrl,
      gender: this.firstFormGroup.value.gender,
      nokFirstName: this.secondFormGroup.value.nokCtrlName,
      nokMiddleName: this.secondFormGroup.value.nokCtrlLastName,
      nokNumber: this.secondFormGroup.value.nokCtrlNumber,
      relation: this.secondFormGroup.value.relation,
      dob: this.thirdFormGroup.value.thirdCtrl.toJSON().slice(0,10),
      photoUrl: this.photoUrl,
    };
    // console.log(data);

    this.httpService.addKid(data).subscribe(res => {
      console.log(res)
    });
  };
}
