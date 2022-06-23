import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  myFilter = (d: Date | null): boolean => {
    const day = d || new Date();
    const today = new Date().getFullYear();
    // Prevent all days after today from being selected
    return !(day.getTime() > Date.parse(Date()))
    
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      lastCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      nokCtrl: ['', Validators.required],
      nokCtrlNumber: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

    
  }

  handleUpload(e){
    console.log(e)
  }

}
