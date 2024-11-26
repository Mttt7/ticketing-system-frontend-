import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DepartmentService} from "../../services/api/department.service";
import {UserProfile} from "../../models/UserProfile";
import {Department} from "../../models/Department";
import {CategoryService} from "../../services/api/category.service";
import {Category} from "../../models/Category";
import {Subcategory} from "../../models/Subcategory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {toast} from "ngx-sonner";
import {UserService} from "../../services/api/user.service";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  addSubcategoryForm: FormGroup;
  assignNewUserForm: FormGroup;
  departmentId!: number;
  assignedUsers: UserProfile[] = [];
  users: UserProfile[] = [];
  department!: Department;
  pageNumber: number = 0;
  allPages: number = 0;
  last: boolean = false;
  isAdmin: boolean = true;
  categories: Category[] = [];
  subcategories: Subcategory[] = [];


  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private departmentService: DepartmentService, private categoryService: CategoryService,
              private userService: UserService) {
    this.addSubcategoryForm = this.fb.group({
      categoryId: ['', Validators.required],
      subcategoryId: ['', Validators.required],
    });
    this.assignNewUserForm = this.fb.group({
      userId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.departmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.getDepartment();
    this.loadCategories();
    this.getAssignedUsers();
  }

  getDepartment() {
    this.departmentService.getDepartmentById(this.departmentId).subscribe((response) => {
      this.department = response;
    })
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users.filter(user => !this.assignedUsers.find(assignedUser => assignedUser.id === user.id));
    });
  }

  getAssignedUsers() {
    this.departmentService.getUsersByDepartmentId(this.departmentId, this.pageNumber, 10).subscribe((response) => {
      this.pageNumber = response.number;
      this.last = response.last;
      this.allPages = response.totalPages;
      this.assignedUsers = response.content;
      this.getAllUsers();
    })
  }

  categoryChanged() {
    const selectedCategoryId = this.addSubcategoryForm.get('categoryId')?.value;
    const selectedCategory = this.categories.find(category => category.id === +selectedCategoryId);
    this.subcategories = selectedCategory?.subcategories || [];
    this.addSubcategoryForm.get('subcategoryId')?.setValue('');
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.subcategories = [];
    });
  }

  nextPage() {
    this.pageNumber++;
    this.getAllUsers();
  }

  previousPage() {
    if (this.pageNumber == 0) return
    this.pageNumber--;
    this.getAllUsers();
  }

  removeSubcategoryFromDepartment(subcategoryId: number) {
    this.departmentService.removeSubcategoryFromDepartment(this.departmentId, subcategoryId).subscribe((response) => {
      this.getDepartment();
    });
  }

  addSubcategory() {
    try {
      this.departmentService.addSubcategoryToDepartment(this.departmentId, this.addSubcategoryForm.get('subcategoryId')?.value).subscribe((response) => {
        toast.success(response.message);
        this.getDepartment();
      });
    } catch (e) {
      toast.error('Error adding subcategory');
    } finally {
      this.addSubcategoryForm.reset();
    }
  }

  assignUserToDepartment() {
    this.departmentService.assignUserToDepartment(this.departmentId, this.assignNewUserForm.get('userId')?.value).subscribe({
      next: (response) => {
        toast.success(response.message);
        this.getAssignedUsers();
      },
      error: (error) => {
        toast.error(error.error.message);
      }
    })
  }

  removeUserFromDepartment(userId: number) {
    this.departmentService.removeUserFromDepartment(this.departmentId, userId).subscribe({
      next: (response) => {
        toast.success(response.message);
        this.getAssignedUsers();
      },
      error: (error) => {
        toast.error(error.error.message);
      }
    });
  }
}
