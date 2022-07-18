import { Component, OnInit, Output, EventEmitter, ViewChild, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { matDrawerAnimations } from '@angular/material/sidenav';
import { HttpService } from '../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SharedService } from '../services/shared.service';
import { Observable } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UcWidgetComponent } from 'ngx-uploadcare-widget';
import { CheckDialogComponent } from '../check-dialog/check-dialog.component';
import { Kid } from '../kid';

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
  @ViewChild(UcWidgetComponent) uploadcareWidget: UcWidgetComponent;
  @ViewChild('stepper') stepper;
  opened: boolean;
  isLinear = false;
  isOptional: boolean = true;
  isPrimary: boolean;
  isEnrolled: boolean = false;
  picIsset: boolean = false;
  checkvalue: string = 'not enrolled';
  data: Kid;
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
    { value: 'st emma academy', viewValue: 'St Emma' },
    { value: 'kiboro primary school', viewValue: 'Kiboro' },
    { value: 'thika prime academy', viewValue: 'Thika Prime Academy' },
    { value: 'valley view academy', viewValue: 'Valley View' },
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
    { value: 'st teresas boys', viewValue: 'St Teresas Boys' },
    { value: 'maina wanjigi girls hs', viewValue: 'Maina Wanjigi Sec Sch.' },
    { value: 'chania boys', viewValue: 'Chania Boys' },
    { value: 'kibage', viewValue: 'Kibage' }
  ];

  forms: Sex[] = [
    { value: 'form one', viewValue: 'Form one' },
    { value: 'form two', viewValue: 'Form two' },
    { value: 'form three', viewValue: 'Form three' },
    { value: 'form four', viewValue: 'Form four' },
  ];

  // @ViewChild(UcWidgetComponent)
  // private widgetComponent: UcWidgetComponent;

  constructor(
    private _formBuilder: FormBuilder,
    private readonly httpService: HttpService,
    private readonly sharedService: SharedService,
    public dialog: MatDialog
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
      primarySchool: ['', Validators.required],
      class: ['', Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      pic: '',
    });

  }


  changed(event: MatSlideToggleChange) {
    this.isEnrolled = event.checked;
    this.isOptional = event.checked;
    this.isEnrolled
      ? (this.checkvalue = 'enrolled')
      : (this.checkvalue = 'not enrolled');

    // remove values from form if previously entered
    if (!this.isEnrolled) {
      this.fourthFormGroup.reset();
      this.isOptional = true;

    }else {
      this.isOptional = false;
    }

  }

  // set the uploadcare cdnUrl
  handleUpload(e) {
    this.photoUrl = e.cdnUrl;
  }

  // send data to db
  uploadData() {
    this.httpService.addKid(this.data).subscribe((res) => {
      console.log(res);
    });
  }

  // open confirm dialog
  openDialog() {
    this.data = {
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

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.uploadData();
        this.resetForm();
        this.dialog.open(CheckDialogComponent)
      }else {
        this.resetForm();
      }
    });


  }

  checkLevel($e, level: string) {
    if ($e.isUserInput) {
      if (level == 'primary') {
        this.isPrimary = true;
        this.fourthFormGroup.patchValue({
          school: " ",
          form: " "
        })
      } else {
        this.isPrimary = false;
        this.fourthFormGroup.patchValue({
          primarySchool: " ",
          class: " "
        })
      }
    }
  
  }


  resetForm(){
   this.uploadcareWidget.clearUploads();
   this.stepper.reset()
  }
}
