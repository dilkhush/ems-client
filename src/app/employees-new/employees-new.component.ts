import { Component, OnInit } from '@angular/core';
import { UserService, EmployeeService, AlertService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Employee } from '../_models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employees-new',
  templateUrl: './employees-new.component.html',
  styleUrls: []
})
export class EmployeesNewComponent implements OnInit {
  currentUser: User;
  employee: Employee;
  employeeForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private location: Location,
    private employeeService: EmployeeService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required]
    });
  }

  get f() { return this.employeeForm.controls; }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.employeeForm.invalid) {
          return;
      }

      this.loading = true;
      this.employeeService.create(this.employeeForm.value)
          .subscribe(
              data => {
                  this.alertService.success('create successful', true);
                  this.router.navigate(['/']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}
