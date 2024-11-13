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


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'departments', component: DepartmentsComponent},
  {path: 'departments/:id', component: DepartmentComponent},
  {path: 'tickets', component: TicketsComponent},
  {path: 'tickets/:id', component: TicketDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
