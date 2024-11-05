import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TicketService} from "../../services/ticket.service";
import {Ticket} from "../../models/Ticket";
import {EnumService} from "../../services/enum.service";
import {Priority} from "../../models/Priority";
import {Channel} from "../../models/Channel";
import {UserService} from "../../services/user.service";
import {Category} from "../../models/Category";
import {Subcategory} from "../../models/Subcategory";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  searchTicketForm: FormGroup;
  tickets: Ticket[] = [];
  channels: Channel[] = [];
  priorities: Priority[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  pageNumber: number = 0;
  allPages: number = 0;
  last: boolean = false;
  users: any[] = [];


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

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  categoryChanged() {
    const selectedCategoryId = this.searchTicketForm.get('categoryId')?.value;
    const selectedCategory = this.categories.find(category => category.id === +selectedCategoryId);
    this.subcategories = selectedCategory?.subcategories || [];
    console.log(this.categories)
    console.log(selectedCategory)
    console.log(this.subcategories);
    this.searchTicketForm.get('subcategoryId')?.setValue('');
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories);
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
    throw new Error('Method not implemented.');
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
}
