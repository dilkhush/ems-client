import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { EmployeesViewComponent } from './employees-view';
import { EmployeesEditComponent } from './employees-edit';
import { EmployeesNewComponent } from './employees-new';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'employees/:id/show', component: EmployeesViewComponent, canActivate: [AuthGuard] },
    { path: 'employees/:id/edit', component: EmployeesEditComponent, canActivate: [AuthGuard] },
    { path: 'employees/new', component: EmployeesNewComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
