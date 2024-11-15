import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DepartmentService} from "../../services/department.service";
import {UserProfile} from "../../models/UserProfile";
import {Department} from "../../models/Department";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/Category";
import {Subcategory} from "../../models/Subcategory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {toast} from "ngx-sonner";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  addSubcategoryForm: FormGroup;
  departmentId!: number;
  users: UserProfile[] = [];
  department!: Department;
  pageNumber: number = 0;
  allPages: number = 0;
  last: boolean = false;
  isAdmin: boolean = true;
  categories: Category[] = [];
  subcategories: Subcategory[] = [];


  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private departmentService: DepartmentService, private categoryService: CategoryService) {
    this.addSubcategoryForm = this.fb.group({
      categoryId: ['', Validators.required],
      subcategoryId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.departmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUsers();
    this.getDepartment();
    this.loadCategories();
  }

  getDepartment() {
    this.departmentService.getDepartmentById(this.departmentId).subscribe((response) => {
      this.department = response;
    })
  }

  getUsers() {
    this.departmentService.getUsersByDepartmentId(this.departmentId, this.pageNumber, 10).subscribe((response) => {
      this.pageNumber = response.number;
      this.last = response.last;
      this.allPages = response.totalPages;
      this.users = response.content;
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
    this.getUsers();
  }

  previousPage() {
    if (this.pageNumber == 0) return
    this.pageNumber--;
    this.getUsers();
  }

  removeSubcategoryFromDepartment(subcategoryId: number) {
    this.departmentService.removeSubcategoryFromDepartment(this.departmentId, subcategoryId).subscribe((response) => {
      console.log(response);
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
}
