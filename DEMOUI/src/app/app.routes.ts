import { authGuard } from './auth-guard';

import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { EmployeeList } from './employees/employee-list/employee-list';
import { AddEmployee } from './employees/add-employee/add-employee';  
import { EditEmployee } from './employees/edit-employee/edit-employee';


export const routes: Routes = [
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
{ path: 'employees', component: EmployeeList, canActivate: [authGuard] },
{ path: 'employees/add', component: AddEmployee, canActivate: [authGuard] },
{ path: 'employees/edit/:id', component: EditEmployee, canActivate: [authGuard] },
{ path: 'login', component: Login },
{ path: '', redirectTo: 'login', pathMatch: 'full' }



];
