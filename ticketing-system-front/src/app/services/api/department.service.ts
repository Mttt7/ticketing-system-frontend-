import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DepartmentsResponseDto} from "../../models/DepartmentsResponseDto";
import {UsersResponseDto} from "../../models/UsersResponseDto";
import {Department} from "../../models/Department";

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

  getUserDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.departmentUrl + `/my-departments`);
  }

  getUsersByDepartmentId(departmentId: number, pageNumber: number, pageSize: number): Observable<UsersResponseDto> {
    return this.http.get<UsersResponseDto>(this.departmentUrl + `/${departmentId}/users` + `?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getDepartmentById(departmentId: number): Observable<Department> {
    return this.http.get<Department>(this.departmentUrl + `/${departmentId}`);
  }

  addSubcategoryToDepartment(departmentId: number, subcategoryId: number): Observable<{ message: string }> {
    return this.http.post<{
      message: string
    }>(this.departmentUrl + `/add-subcategory/${departmentId}/${subcategoryId}`, {});
  }

  removeSubcategoryFromDepartment(departmentId: number, subcategoryId: number): Observable<{ message: string }> {
    return this.http.delete<{
      message: string
    }>(this.departmentUrl + `/remove-subcategory/${departmentId}/${subcategoryId}`, {});
  }

  addNewDepartment(name: { name: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.departmentUrl + "/", name);
  }

  assignUserToDepartment(departmentId: number, userId: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.departmentUrl + `/assign/${userId}/${departmentId}`, {});
  }

  removeUserFromDepartment(departmentId: number, userId: number) {
    return this.http.delete<{ message: string }>(this.departmentUrl + `/remove-user/${userId}/${departmentId}`);
  }
}
