import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList: any;
  @ViewChild('resetStudentForm') myNgForm:any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  employeeForm!: FormGroup;
  titles: any = ['CEO', 'Head', 'Leader', 'Team Manager', 'Project Manager', 'Software Egineer'];


  ngOnInit() {
    this.submitBookForm();
  }
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private employeeAPI: ApiService
  ) {}

 
  submitBookForm() {
    this.employeeForm = this.fb.group({
      id: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      title: ['', [Validators.required]],
    });
  }
    /* Submit book */
    submitEmployeeForm() {
      console.log(this.employeeForm)
      if (this.employeeForm.valid) {
        console.log('ok')
        this.employeeAPI.AddEmployee(this.employeeForm.value).subscribe((res) => {
          this.router.navigateByUrl('employee')
          this.ngZone.run(() => this.router.navigateByUrl('/employee'));
        });
      }
    }


  
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  };







  
}
