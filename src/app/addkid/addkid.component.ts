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
  isPrimary: boolean;
  isChecked: boolean;
  checkvalue: string = 'not enrolled';
  photoUrl: string = '';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  sexes: Sex[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  levels: Sex[] = [
    { value: 'primary', viewValue: 'Primary School' },
    { value: 'secondary', viewValue: 'High School' },
  ];

  relations: Sex[] = [
    { value: 'mother', viewValue: 'Mother' },
    { value: 'father', viewValue: 'Father' },
    { value: 'aunt', viewValue: 'Aunt' },
    { value: 'uncle', viewValue: 'Uncle' },
    { value: 'grandmother', viewValue: 'Grandmother' },
    { value: 'grandfather', viewValue: 'Grandmother' },
    { value: 'guardian', viewValue: 'Guardian' },
    { value: 'other', viewValue: 'Other' },
  ];

  primarySchools: Sex[] = [
    { value: 'st peters', viewValue: 'St Peters Kandara' },
    { value: 'st charles', viewValue: 'St Charles Lwanga' },
    { value: 'muraga', viewValue: 'Muraga' },
    { value: 'kibage', viewValue: 'Kibage' },
  ];

  classes: Sex[] = [
    { value: 'pp1', viewValue: 'PP1' },
    { value: 'pp2', viewValue: 'PP2' },
    { value: 'one', viewValue: 'One' },
    { value: 'two', viewValue: 'Two' },
    { value: 'three', viewValue: 'Three' },
    { value: 'four', viewValue: 'Four' },
    { value: 'five', viewValue: 'Five' },
    { value: 'six', viewValue: 'Six' },
    { value: 'seven', viewValue: 'Seven' },
    { value: 'eight', viewValue: 'Eight' },
  ];

  schools: Sex[] = [
    { value: 'st peters', viewValue: 'St Peters Kandara' },
    { value: 'st charles', viewValue: 'St Charles Lwanga' },
    { value: 'muraga', viewValue: 'Muraga' },
    { value: 'kibage', viewValue: 'Kibage' },
  ];

  forms: Sex[] = [
    { value: 'form one', viewValue: 'Form one' },
    { value: 'form two', viewValue: 'Form two' },
    { value: 'form three', viewValue: 'Form three' },
    { value: 'form four', viewValue: 'Form four' },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private readonly httpService: HttpService
  ) {}

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
      gender: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      nokCtrlName: ['', Validators.required],
      nokCtrlLastName: ['', Validators.required],
      nokCtrlNumber: ['', Validators.required],
      relation: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      enrolled: ['', Validators.required],
      level: ['', Validators.required],
      school: ['', Validators.required],
      form: ['', Validators.required],
    });
  }

  changed() {
    this.isChecked
      ? (this.checkvalue = 'enrolled')
      : (this.checkvalue = 'not enrolled');
  }

  checkLevel(){
    console.log(this.fourthFormGroup.value.level.value)
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
      dob: this.thirdFormGroup.value.thirdCtrl.toJSON().slice(0, 10),
      photoUrl: this.photoUrl,
    };
    // console.log(data);

    this.httpService.addKid(data).subscribe((res) => {
      console.log(res);
    });
  }
}
