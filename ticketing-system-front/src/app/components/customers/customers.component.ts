import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomersService} from "../../services/api/customers.service";
import {SearchCustomerCriteria} from "../../models/SearchCustomerCriteria";
import {Customer} from "../../models/Customer";
import {toast} from 'ngx-sonner';
import {HttpErrorResponse} from "@angular/common/http";
import {Ticket} from "../../models/Ticket";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  searchForm!: FormGroup;
  editCustomerForm!: FormGroup;
  addCustomerForm!: FormGroup;
  customers: Customer[] = [];
  pageNumber: number = 0;
  allPages: number = 0;
  last: boolean = false;
  currentCustomer!: Customer;
  tickets: Ticket[] = [];
  @ViewChild('add_customer_modal') addCustomerModal: any;

  constructor(private fb: FormBuilder, private customersService: CustomersService) {
    this.searchForm = this.fb.group({
      phone: [''],
      email: [''],
      firstName: [''],
      lastName: ['']
    });
    this.editCustomerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(13),
          Validators.pattern(/^\d+$/)
        ]
      ]
    });

    this.addCustomerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(13),
          Validators.pattern(/^\d+$/)
        ]
      ]
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

  openCustomerModal(customer: Customer) {
    this.currentCustomer = customer
    this.editCustomerForm.patchValue(customer);
  }

  editCustomer() {
    if (this.editCustomerForm.valid) {
      const editedCustomer: Customer = this.editCustomerForm.value;

      this.customersService.updateCustomer(this.currentCustomer.id, editedCustomer)
        .subscribe({
          next: (res) => {
            toast.success('Customer updated successfully!');
            this.onSearch();
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 400) {
              toast.error(error.error.error + " " + error.error.message);
            } else {
              toast.error(error.error.error + "" + error.error.message);
            }
            console.error('Error response:', error);
          }
        });
    } else {
      toast.error('Please fill all required fields correctly!');
    }
  }

  addCustomer() {
    if (this.addCustomerForm.valid) {
      const newCustomer: Customer = this.addCustomerForm.value;

      this.customersService.addCustomer(newCustomer)
        .subscribe({
          next: (res) => {
            toast.success('Customer added successfully!');
            this.onSearch();
            this.addCustomerModal.nativeElement.close();
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 400) {
              toast.error(error.error.error + " " + error.error.message);
            } else {
              toast.error(error.error.error + "" + error.error.message);
            }
            console.error('Error response:', error);
          }
        });
    } else {
      toast.error('Please fill all required fields correctly!');
    }
  }

  openCustomerTicketsModal(customer: Customer) {
    // TODO pagination
    this.currentCustomer = customer;
    this.customersService.getCustomerTickets(customer.id, this.pageNumber, 10)
      .subscribe((response: any) => {
        this.tickets = response.content
      });
  }
}
