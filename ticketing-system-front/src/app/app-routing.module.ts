import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {CustomersComponent} from "./components/customers/customers.component";
import {TicketsComponent} from "./components/tickets/tickets.component";
import {TicketDetailsComponent} from "./components/ticket-details/ticket-details.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {DepartmentsComponent} from "./components/departments/departments.component";
import {DepartmentComponent} from "./components/department/department.component";
import {authGuard} from "./guards/auth.guard";
import {LogoutComponent} from "./components/logout/logout.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'departments/:id',
    component: DepartmentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'tickets/:id',
    component: TicketDetailsComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
