import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { Observable, Subject } from 'rxjs';
import { AlertService } from '../_services';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private router: Router, private alertService: AlertService) { }

    url = 'http://localhost:3000';

    login(email: string, password: string) {
        return this.http.post(`${this.url}/users/sign_in`, { email: email, password: password })
            .pipe(map(user => {
                if (user && user.authentication_token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('auth_token', user.authentication_token);
                }
                return user;
            }));
    }

    logout() {
        return this.http.delete(`${this.url}/users/sign_out`, { authentication_token: localStorage.getItem('auth_token') })
            .pipe(map(user => {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('auth_token');
                this.alertService.success('Registration successful', true);
            }));
    }
}
