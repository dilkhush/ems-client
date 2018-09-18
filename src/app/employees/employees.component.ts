import { Component, OnInit } from '@angular/core';
import { Employee } from '../_models/employee';
import { EmployeeService } from '../_services';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [ ];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees)
  }

  delete(id: number) {
    this.employeeService.destroy(id).subscribe(employee => {
      let employee: Employ = of(this.employees.find(employee => employee.id === id));
      this.employees.pop(employee);
    })
  }

}