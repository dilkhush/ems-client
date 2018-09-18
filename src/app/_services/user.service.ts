import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    private url = 'http://localhost:3000/users';

    register(user: User) {
        return this.http.post<User>(this.url, user);
    }

}