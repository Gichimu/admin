import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { matDrawerAnimations } from '@angular/material/sidenav';

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

  constructor(private _formBuilder: FormBuilder) {}

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
      lastCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      nokCtrlName: ['', Validators.required],
      nokCtrlLastName: ['', Validators.required],
      nokCtrlNumber: ['', Validators.required],
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
      nokName: this.secondFormGroup.value.nokCtrlName,
      nokLastName: this.secondFormGroup.value.nokCtrlLastName,
      nokNumber: this.secondFormGroup.value.nokCtrlNumber,
      dob: this.thirdFormGroup.value.thirdCtrl,
      photoUrl: this.photoUrl,
    };
    console.log(data);
  }
}
