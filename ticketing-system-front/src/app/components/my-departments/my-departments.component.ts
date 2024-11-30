import {Component} from '@angular/core';
import {Ticket} from "../../models/Ticket";
import {Router} from "@angular/router";
import {TicketService} from "../../services/api/ticket.service";
import {toast} from "ngx-sonner";
import {DepartmentService} from "../../services/api/department.service";
import {Department} from "../../models/Department";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EnumService} from "../../services/api/enum.service";
import {SearchTicketSimpleCriteria} from "../../models/SearchTicketSimpleCriteria";

@Component({
  selector: 'app-my-departments',
  templateUrl: './my-departments.component.html',
  styleUrl: './my-departments.component.css'
})
export class MyDepartmentsComponent {
  searchTicketForm: FormGroup;
  departments: Department[] = [];
  tickets: Ticket[] = [];
  pageNumber: number = 0;
  allPages: number = 0;
  last: boolean = false;
  sortType: string = 'newest';
  priorities: string[] = [];

  constructor(private router: Router, private ticketService: TicketService,
              private departmentService: DepartmentService, private fb: FormBuilder,
              private enumService: EnumService) {
    this.searchTicketForm = this.fb.group({
      isOpen: [null],
      isFollowed: [null],
      priority: [''],
    });

  }

  ngOnInit() {
    this.getDepartments();
    this.searchTickets();
    this.loadPriorities();
  }

  getDepartments() {
    this.departmentService.getUserDepartments().subscribe({
      next: (response) => {
        this.departments = response;
      },
      error: (error) => {
        toast.error('An error occurred while fetching departments');
      }
    });
  }


  loadPriorities(): void {
    this.enumService.getPriorities().subscribe((priorities) => {
      this.priorities = priorities;
    });
  }

  openTicketDetails($event: Ticket) {
    this.router.navigate(['/tickets/', $event.id]);
  }

  nextPage() {
    this.pageNumber++;
    this.searchTickets();
  }

  previousPage() {
    if (this.pageNumber == 0) return
    this.pageNumber--;
    this.searchTickets();
  }

  searchTickets() {
    if (this.searchTicketForm.valid) {
      const searchCriteria: SearchTicketSimpleCriteria = this.searchTicketForm.value;
      this.ticketService.getTicketFromMyDepartments(searchCriteria, this.pageNumber, 10, this.sortType).subscribe(response => {
        this.pageNumber = response.number;
        this.last = response.last;
        this.allPages = response.totalPages;
        this.tickets = response.content;
      });
    }
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortType = selectElement.value;
  }

  clearForm() {
    this.searchTicketForm.patchValue({
      priority: '',
      isOpen: true
    });
  }
}
