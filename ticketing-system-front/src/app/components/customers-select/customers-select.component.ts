import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Customer} from "../../models/Customer";
import {Ticket} from "../../models/Ticket";
import {CustomersService} from "../../services/api/customers.service";
import {SearchCustomerCriteria} from "../../models/SearchCustomerCriteria";

@Component({
  selector: 'app-customers-select',
  templateUrl: './customers-select.component.html',
  styleUrl: './customers-select.component.css'
})
export class CustomersSelectComponent {

  searchForm!: FormGroup;
  @Output() selectedCustomer = new EventEmitter<Customer>();
  customers: Customer[] = [];
  pageNumber: number = 0;
  allPages: number = 0;
  last: boolean = false;
  tickets: Ticket[] = [];

  constructor(private fb: FormBuilder, private customersService: CustomersService) {
    this.searchForm = this.fb.group({
      phone: [''],
      email: [''],
      firstName: [''],
      lastName: ['']
    });
  }

  onSearch() {
    const searchCriteria: SearchCustomerCriteria = this.searchForm.value;
    this.customersService.searchCustomers(searchCriteria, this.pageNumber).subscribe(response => {
      this.pageNumber = response.number;
      this.last = response.last;
      this.allPages = response.totalPages;
      this.customers = response.content;
    });
  }

  nextPage() {
    if (this.last) return;
    this.pageNumber++;
    this.onSearch();
  }

  previousPage() {
    if (this.pageNumber == 0) return
    this.pageNumber--;
    this.onSearch();
  }

  setCustomer(customer: Customer) {
    this.selectedCustomer.emit(customer);
  }
}
