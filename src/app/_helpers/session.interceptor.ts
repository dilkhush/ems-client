import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable()
export class SessionInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.authentication_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token token=${currentUser.authentication_token}`
                }
            });
        }
        return next.handle(request);
    }
}
