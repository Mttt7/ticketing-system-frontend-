import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/Category";
import {Subcategory} from "../models/Subcategory";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/v1/category';

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/`);
  }

  getSubcategories(categoryId: number): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${this.baseUrl}/${categoryId}/subcategories`);
  }
}
