import {Component} from '@angular/core';
import {DepartmentService} from "../../services/department.service";
import {Department} from "../../models/Department";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent {
  departments: Department[] = [];
  pageNumber: number = 0;
  allPages: number = 0;
  last: boolean = false;

  constructor(private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.departmentService.getAllDepartments(this.pageNumber, 10).subscribe(response => {
      this.pageNumber = response.number;
      this.last = response.last;
      this.allPages = response.totalPages;
      this.departments = response.content;
      console.log(this.departments);
    })
  }

  nextPage() {
    if (this.last) return;
    this.pageNumber++;
    this.getAllDepartments();
  }

  previousPage() {
    if (this.pageNumber == 0) return
    this.pageNumber--;
    this.getAllDepartments();
  }
}
