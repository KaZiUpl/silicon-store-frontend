import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryOutput } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<CategoryOutput[]> {
    return this.httpClient.get<CategoryOutput[]>(
      environment.apiUrl + 'categories'
    );
  }

  getCategory(categoryId: number): Observable<CategoryOutput> {
    return this.httpClient.get<CategoryOutput>(
      environment.apiUrl + 'categories/' + categoryId.toString()
    );
  }

  getCategoryBreadcrumbs(categoryId: number): Observable<CategoryOutput[]> {
    return this.httpClient.get<CategoryOutput[]>(
      environment.apiUrl +
        'categories/' +
        categoryId.toString() +
        '/breadcrumbs'
    );
  }

  getMainCategories(): Observable<CategoryOutput[]> {
    return this.httpClient.get<CategoryOutput[]>(
      environment.apiUrl + 'categories/main-categories'
    );
  }

  getChildCategories(categoryId: number): Observable<CategoryOutput[]> {
    return this.httpClient.get<CategoryOutput[]>(
      environment.apiUrl +
        'categories/' +
        categoryId.toString() +
        '/child-categories'
    );
  }
}
