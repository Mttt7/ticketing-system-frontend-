import {Component} from '@angular/core';
import {DepartmentService} from "../../services/department.service";
import {Department} from "../../models/Department";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {toast} from "ngx-sonner";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent {
  addNewDepartmentForm: FormGroup;
  departments: Department[] = [];
  pageNumber: number = 0;
  allPages: number = 0;
  last: boolean = false;

  constructor(private departmentService: DepartmentService, private fb: FormBuilder) {

    this.addNewDepartmentForm = this.fb.group({
      name: ['', Validators.required]
    });
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

  addNewDepartment() {

    this.departmentService.addNewDepartment(this.addNewDepartmentForm.value).subscribe({
      next: (response) => {
        toast.success(response.message);
        this.getAllDepartments();
      },
      error: (e: { error: { error: string } }) => {
        toast.error(e.error.error);
      }
    });
  }
}
