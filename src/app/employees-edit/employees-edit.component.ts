import { Component, OnInit } from '@angular/core';
import { UserService, EmployeeService, AlertService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Employee } from '../_models';

@Component({
  selector: 'app-employees-edit',
  templateUrl: './employees-edit.component.html',
  styleUrls: []
})
export class EmployeesEditComponent implements OnInit {
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
    private employeeService: EmployeeService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  get f() { return this.employeeForm.controls; }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required]
    });
    this.getEmployee();
  }

  getEmployee(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id)
      .subscribe(employee => this.employee = employee);
  }

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
      this.employeeService.update(this.employee)
          .subscribe(
              data => {
                  this.alertService.success('Update successful', true);
                  this.router.navigate(['/']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}
