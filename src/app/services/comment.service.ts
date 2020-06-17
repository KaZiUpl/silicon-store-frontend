import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateCommentInput } from '../models/comment.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }


  createComment(comment: CreateCommentInput): Observable<any> {
    return this.httpClient.post(environment.apiUrl+'comments', comment);
  }
}
