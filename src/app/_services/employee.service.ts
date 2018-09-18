import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Employee } from '../_models/employee';

@Injectable()
export class EmployeeService {
    constructor(private http: HttpClient) { }
    private employeesUrl = 'http://localhost:3000/api/employees';

    getEmployees() {
      return this.http.get<any>(this.employeesUrl);
    }

    getEmployee(id: number) {
      let url = `${this.employeesUrl}/${id}`;
      return this.http.get<any>(url);
    }

    update(employee: Employee) {
      let url = `${this.employeesUrl}/${employee.id}`;
      return this.http.put<Employee>(url, employee);
    }

    create(employee: Employee) {
      return this.http.post<Employee>(this.employeesUrl, employee);
    }

    destroy(id: number) {
      let url = `${this.employeesUrl}/${id}`;
      return this.http.delete<any>(url);
    }
}
