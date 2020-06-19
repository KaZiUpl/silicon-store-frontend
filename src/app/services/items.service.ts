import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemOutput } from '../models/item.model';
import { environment } from 'src/environments/environment';
import { CommentOutput } from '../models/comment.model';
import { CategoryOutput } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private httpClient: HttpClient) {}

  getAllItems(categoryId?: number): Observable<ItemOutput[]> {
    if (categoryId !== undefined) {
      return this.httpClient.get<ItemOutput[]>(environment.apiUrl + 'items', {
        params: {
          category: categoryId.toString(),
        },
      });
    } else {
      return this.httpClient.get<ItemOutput[]>(environment.apiUrl + 'items');
    }
  }

  getItem(itemId: number): Observable<ItemOutput> {
    return this.httpClient.get<ItemOutput>(
      environment.apiUrl + 'items/' + itemId.toString()
    );
  }

  getItemComments(itemId: number): Observable<CommentOutput[]> {
    return this.httpClient.get<CommentOutput[]>(
      environment.apiUrl + 'items/' + itemId.toString() + '/comments'
    );
  }

  getItemBreadcrumbs(itemId: number): Observable<CategoryOutput[]> {
    return this.httpClient.get<CategoryOutput[]>(
      environment.apiUrl + 'items/' + itemId.toString() + '/breadcrumbs'
    );
  }
}
