import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { SessionInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService, EmployeeService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesViewComponent } from './employees-view/employees-view.component';
import { EmployeesEditComponent } from './employees-edit/employees-edit.component';
import { EmployeesNewComponent } from './employees-new/employees-new.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        EmployeesComponent,
        EmployeesViewComponent,
        EmployeesEditComponent,
        EmployeesNewComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        EmployeeService,
        { provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
