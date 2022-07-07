import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { matDrawerAnimations } from '@angular/material/sidenav';
import { HttpService } from '../services/http.service';

interface Sex {
  value: string;
  viewValue: string;
}

interface Kid {
  firstName: string;
  middleName: string;
  lastName?: string;
  gender: string;
  nokFirstName: string;
  nokMiddleName: string;
  nokNumber: number;
  relation: string;
  dob: Date;
  isEnrolled: boolean;
  level?: string;
  primarySchool?: string;
  class?: string;
  school?: string;
  form?: string;
  photoUrl: string;
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
  isOptional = true;
  isPrimary: boolean;
  isEnrolled: boolean = false;
  checkvalue: string = 'not enrolled';
  photoUrl: string = '';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

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
    { value: 'st emma', viewValue: 'St Emma' },
    { value: 'kiboro', viewValue: 'Kiboro' },
    { value: 'mathari', viewValue: 'Mathari' },
    { value: 'valley view', viewValue: 'Valley View' },
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
      level: [''],
      school: [''],
      form: [''],
      primarySchool: [''],
      class: [''],
    });
    // this.fifthFormGroup = this._formBuilder.group({
    //   pic: ['', Validators.required]
    // })

    this.fourthFormGroup.get('level').valueChanges.subscribe(values => {
      if(values == 'primary'){
        this.isPrimary = true
      }else{
        this.isPrimary = false
      }
    })
    
    // remove all validation if child is not enrolled
    if(!this.isEnrolled){
      this.fourthFormGroup.get('level').clearValidators();
      this.fourthFormGroup.get('level').updateValueAndValidity();
      this.fourthFormGroup.get('primarySchool').clearValidators();
      this.fourthFormGroup.get('primarySchool').updateValueAndValidity();
      this.fourthFormGroup.get('class').clearValidators();
      this.fourthFormGroup.get('class').updateValueAndValidity();
      this.fourthFormGroup.get('school').clearValidators();
      this.fourthFormGroup.get('school').updateValueAndValidity();
      this.fourthFormGroup.get('form').clearValidators();
      this.fourthFormGroup.get('form').updateValueAndValidity();
    }
  }

  changed() {
    this.isEnrolled ? this.isOptional = false : this.isOptional = true;
    this.isEnrolled
      ? (this.checkvalue = 'enrolled')
      : (this.checkvalue = 'not enrolled');
    
      // remove values from form if previously entered
    if(!this.isEnrolled){
      this.fourthFormGroup.value.level = "";
      this.fourthFormGroup.value.primarySchool = "";
      this.fourthFormGroup.value.class = "";
      this.fourthFormGroup.value.school = "";
      this.fourthFormGroup.value.form = "";
    }
  }


  handleUpload(e) {
    this.photoUrl = e.cdnUrl;
  }

  uploadForm() {
    const data: Kid = {
      firstName: this.firstFormGroup.value.firstCtrl,
      middleName: this.firstFormGroup.value.secondCtrl,
      lastName: this.firstFormGroup.value.lastCtrl,
      gender: this.firstFormGroup.value.gender,
      nokFirstName: this.secondFormGroup.value.nokCtrlName,
      nokMiddleName: this.secondFormGroup.value.nokCtrlLastName,
      nokNumber: this.secondFormGroup.value.nokCtrlNumber,
      relation: this.secondFormGroup.value.relation,
      dob: this.thirdFormGroup.value.thirdCtrl.toJSON().slice(0, 10),
      isEnrolled: this.isEnrolled,
      level: this.fourthFormGroup.value.level,
      primarySchool: this.fourthFormGroup.value.primarySchool,
      class: this.fourthFormGroup.value.class,
      school: this.fourthFormGroup.value.school,
      form: this.fourthFormGroup.value.form,
      photoUrl: this.photoUrl,
    };

    console.log(data);

    // this.httpService.addKid(data).subscribe((res) => {
    //   console.log(res);
    // });
  }


  reset(){
    
  }
}
