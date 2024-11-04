import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomersService} from "../../services/customers.service";
import {SearchCriteria} from "../../models/SearchCriteria";
import {Customer} from "../../models/Customer";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  searchForm!: FormGroup;
  customers: Customer[]=[];
  pageNumber: number = 0;
  allPages: number = 0;
  last: boolean = false;

  constructor(private fb: FormBuilder, private customersService: CustomersService) {
    this.searchForm = this.fb.group({
      phone: [''],
      email: [''],
      firstName: [''],
      lastName: ['']
    });
  }

  onSearch() {
    const searchCriteria: SearchCriteria = this.searchForm.value;
    this.customersService.searchCustomers(searchCriteria,this.pageNumber).subscribe(response => {
      this.pageNumber = response.number;
      this.last = response.last;
      this.allPages = response.totalPages;
      this.customers = response.content;
    });
  }

  nextPage() {
    this.pageNumber++;
    this.onSearch();
  }

  previousPage() {
    if (this.pageNumber == 0) return
    this.pageNumber--;
    this.onSearch();
  }
}
