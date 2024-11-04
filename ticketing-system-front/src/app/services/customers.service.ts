import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SearchCriteria} from "../models/SearchCriteria";
import {CustomerResponseDto} from "../models/CustomerResponseDto";
import {Customer} from "../models/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customerUrl = 'http://localhost:8080/api/v1/customer';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

  }

  searchCustomers(searchCriteria: SearchCriteria, pageNumber: number) {
    return this.http.get<CustomerResponseDto>(this.customerUrl +
      `/search?email=${searchCriteria.email}&firstName=${searchCriteria.firstName}&lastName=${searchCriteria.lastName}&phone=${searchCriteria.phone}&pageSize=10&pageNumber=${pageNumber}`,);
  }

  updateCustomer(id: number, editedCustomer: Customer) {
    return this.http.put(this.customerUrl + `/${id}`, editedCustomer);
  }

  getCustomerTickets(id: number, pageNumber: number, pageSize: number) {
    // TODO pagination
    return this.http.get(this.customerUrl + `/${id}/tickets?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}
