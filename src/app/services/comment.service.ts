import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateCommentInput,
  CommentOutput,
  UpdateCommentInput,
} from '../models/comment.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  createComment(comment: CreateCommentInput): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'comments', comment);
  }

  getComment(commentId: number): Observable<CommentOutput> {
    return this.httpClient.get<CommentOutput>(
      environment.apiUrl + 'comments/' + commentId
    );
  }

  deleteComment(commentId: number): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + 'comments/' + commentId);
  }

  updateComment(
    commentId: number,
    comment: UpdateCommentInput
  ): Observable<any> {
    return this.httpClient.put(
      environment.apiUrl + 'comments/' + commentId,
      comment
    );
  }
}
