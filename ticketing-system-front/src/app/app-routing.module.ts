import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {CustomersComponent} from "./components/customers/customers.component";
import {TicketsComponent} from "./components/tickets/tickets.component";
import {TicketDetailsComponent} from "./components/ticket-details/ticket-details.component";


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: HomeComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'tickets', component: TicketsComponent},
  {path: 'tickets/:id', component: TicketDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
