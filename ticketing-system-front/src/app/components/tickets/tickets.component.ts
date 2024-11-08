import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TicketService} from "../../services/ticket.service";
import {Ticket} from "../../models/Ticket";
import {EnumService} from "../../services/enum.service";
import {Channel} from "../../models/Channel";
import {UserService} from "../../services/user.service";
import {Category} from "../../models/Category";
import {Subcategory} from "../../models/Subcategory";
import {CategoryService} from "../../services/category.service";
import {TicketRequestDto} from "../../models/TicketRequestDto";
import {toast} from "ngx-sonner";
import {Customer} from "../../models/Customer";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  searchTicketForm: FormGroup;
  createTicketForm: FormGroup;
  tickets: Ticket[] = [];
  channels: Channel[] = [];
  priorities: string[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  subcategoriesCreate: Subcategory[] = [];
  pageNumber: number = 0;
  allPages: number = 0;
  last: boolean = false;
  users: any[] = [];

  selectedCustomer?: Customer;
  @ViewChild("modal_2") modal2!: ElementRef;
  @ViewChild("modal_1") modal1!: ElementRef;


  constructor(private fb: FormBuilder, private ticketService: TicketService,
              private enumService: EnumService, private userService: UserService,
              private categoryService: CategoryService) {

    const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
      .toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    this.searchTicketForm = this.fb.group({
      ticketId: [''],
      customerId: [''],
      customerEmail: [''],
      customerPhone: [''],
      content: [''],
      isOpen: [true],
      channel: [''],
      categoryId: [''],
      subcategoryId: [''],
      priority: [''],
      openedById: [''],
      closedById: [''],
      createdAfter: [lastYear],
      createdBefore: [today]
    });

    this.createTicketForm = this.fb.group({
      customerId: ['', [Validators.required, Validators.min(1)]],
      content: ['', [Validators.required]],
      channel: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      subcategoryId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadChannels();
    this.loadPriorities();
    this.loadUsers();
    this.loadCategories();
  }

  loadChannels(): void {
    this.enumService.getChannels().subscribe((channels) => {
      this.channels = channels;
    });
  }

  loadPriorities(): void {
    this.enumService.getPriorities().subscribe((priorities) => {
      this.priorities = priorities;
    });
  }

  searchTickets() {
    if (this.searchTicketForm.valid) {
      const searchCriteria = this.searchTicketForm.value;
      this.ticketService.searchTickets(searchCriteria, this.pageNumber).subscribe(response => {
        this.pageNumber = response.number;
        this.last = response.last;
        this.allPages = response.totalPages;
        this.tickets = response.content;
      });
    }
  }

  createTicket() {
    if (this.createTicketForm.valid) {
      const ticketData: TicketRequestDto = this.createTicketForm.value;

      this.ticketService.createTicket(ticketData).subscribe(
        {
          next: (response: any) => {
            toast.success('Ticket created successfully: #' + response.id);
            //TODO route to ticket details
            this.createTicketForm.reset();
            this.selectedCustomer = undefined;
            this.modal1.nativeElement.close();
          },
          error: (error: any) => {
            toast.error('Error creating ticket: ' + error.error.error);
          }
        });
    }
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  categoryChanged() {
    const selectedCategoryId = this.searchTicketForm.get('categoryId')?.value;
    const selectedCategory = this.categories.find(category => category.id === +selectedCategoryId);
    this.subcategories = selectedCategory?.subcategories || [];
    this.searchTicketForm.get('subcategoryId')?.setValue('');
  }

  categoryCreateChanged() {
    const selectedCategoryId = this.createTicketForm.get('categoryId')?.value;
    const selectedCategory = this.categories.find(category => category.id === +selectedCategoryId);
    this.subcategoriesCreate = selectedCategory?.subcategories || [];
    this.createTicketForm.get('subcategoryId')?.setValue('');
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.subcategories = [];
    });
  }

  clearForm() {
    this.searchTicketForm.patchValue({
      ticketId: '',
      customerId: '',
      customerEmail: '',
      customerPhone: '',
      content: '',
      channel: '',
      categoryId: '',
      subcategoryId: '',
      priority: '',
      openedById: '',
      closedById: '',
      isOpen: true
    });
    this.subcategories = [];
  }

  openTicketDetails(ticket: any) {
    const url = `/tickets/${ticket.id}`;
    window.open(url, '_blank');
  }

  nextPage() {
    this.pageNumber++;
    this.searchTickets()
  }

  previousPage() {
    if (this.pageNumber == 0) return
    this.pageNumber--;
    this.searchTickets()
  }

  setCustomer(customer: Customer) {
    this.selectedCustomer = customer;
    this.createTicketForm.get('customerId')?.setValue(customer.id);
    this.modal2.nativeElement.close();
  }
}
