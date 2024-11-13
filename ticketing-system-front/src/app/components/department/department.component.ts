import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DepartmentService} from "../../services/department.service";
import {UserProfile} from "../../models/UserProfile";
import {Department} from "../../models/Department";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  departmentId!: number;
  users: UserProfile[] = [];
  department!: Department;
  pageNumber: number = 0;
  allPages: number = 0;
  last: boolean = false;

  constructor(private route: ActivatedRoute, private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.departmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUsers();
    this.getDepartment();
  }

  getDepartment() {
    this.departmentService.getDepartmentById(this.departmentId).subscribe((response) => {
      this.department = response;
      console.log(this.department);
    })
  }

  getUsers() {
    this.departmentService.getUsersByDepartmentId(this.departmentId, this.pageNumber, 10).subscribe((response) => {
      this.pageNumber = response.number;
      this.last = response.last;
      this.allPages = response.totalPages;
      this.users = response.content;
      console.log(this.users);
    })
  }

  nextPage() {
    this.pageNumber++;
    this.getUsers();
  }

  previousPage() {
    if (this.pageNumber == 0) return
    this.pageNumber--;
    this.getUsers();
  }

}
