import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi,} from '@angular/common/http';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import {HomeComponent} from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from './loader/loader.component';
import {CustomersComponent} from './components/customers/customers.component';
import {TicketsComponent} from './components/tickets/tickets.component';
import {NgxSonnerToaster} from "ngx-sonner";
import {CustomersSelectComponent} from './components/customers-select/customers-select.component';
import {TicketDetailsComponent} from './components/ticket-details/ticket-details.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DepartmentsComponent} from './components/departments/departments.component';
import {DepartmentComponent} from './components/department/department.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LoaderComponent,
    HomeComponent,
    CustomersComponent,
    TicketsComponent,
    CustomersSelectComponent,
    TicketDetailsComponent,
    DashboardComponent,
    DepartmentsComponent,
    DepartmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSonnerToaster,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
