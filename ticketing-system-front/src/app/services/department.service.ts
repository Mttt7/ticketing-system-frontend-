import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DepartmentsResponseDto} from "../models/DepartmentsResponseDto";
import {UsersResponseDto} from "../models/UsersResponseDto";
import {Department} from "../models/Department";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departmentUrl = 'http://localhost:8080/api/v1/department';

  constructor(private http: HttpClient) {
  }

  getAllDepartments(pageNumber: number, pageSize: number): Observable<DepartmentsResponseDto> {
    return this.http.get<DepartmentsResponseDto>(this.departmentUrl + `/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getUsersByDepartmentId(departmentId: number, pageNumber: number, pageSize: number): Observable<UsersResponseDto> {
    return this.http.get<UsersResponseDto>(this.departmentUrl + `/${departmentId}/users` + `?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getDepartmentById(departmentId: number): Observable<Department> {
    return this.http.get<Department>(this.departmentUrl + `/${departmentId}`);
  }

  addSubcategoryToDepartment(departmentId: number, subcategoryId: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.departmentUrl + `/add-subcategory/${departmentId}/${subcategoryId}`, {});
  }

  removeSubcategoryFromDepartment(departmentId: number, subcategoryId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.departmentUrl + `/remove-subcategory/${departmentId}/${subcategoryId}`, {});
  }
}
