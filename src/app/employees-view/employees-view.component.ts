import { Component, OnInit } from '@angular/core';
import { User, Employee } from '../_models';
import { AlertService, UserService, EmployeeService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: []
})
export class EmployeesViewComponent implements OnInit {

  currentUser: User;
  employee: Employee;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private employeeService: EmployeeService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id)
      .subscribe(employee => this.employee = employee);
  }

  delete(id: number): void {
    this.employeeService.destroy(id)
      .subscribe(data => {
          this.alertService.success('Employee deleted successful', true);
          this.router.navigate(['/']);
      },
      error => {
          this.alertService.error(error);
      });
  }

}
