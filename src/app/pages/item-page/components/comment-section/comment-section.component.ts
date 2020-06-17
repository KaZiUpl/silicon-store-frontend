import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommentOutput } from 'src/app/models/comment.model';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { ItemOutput } from 'src/app/models/item.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent implements OnInit {
  @Input() item: ItemOutput;
  @Input() comments: CommentOutput[];
  @ViewChild('commForm') commentFormDirective: NgForm; 
  commentForm: FormGroup;
  isAuth: boolean = false;

  constructor(
    private userService: UserService,
    private commentService: CommentService,
    private itemService: ItemsService
  ) {
    userService.AuthenticatedStatus.subscribe((status: boolean) => {
      this.isAuth = status;
    });

    this.commentForm = new FormGroup({
      text: new FormControl(null, [
        Validators.required,
        Validators.maxLength(120),
      ]),
    });
  }

  ngOnInit(): void {}

  onCommentFormSubmit(): void {
    if (this.commentForm.invalid) return;

    this.commentService
      .createComment({
        item_id: this.item.id,
        text: this.commentForm.value.text,
      })
      .subscribe(
        (response: any) => {
          this.itemService.getItemComments(this.item.id).subscribe(
            (comments: CommentOutput[]) => {
              this.comments = comments;
              this.commentForm.reset();
              this.commentFormDirective.resetForm();
            },
            (error: HttpErrorResponse) => {
              console.log(error);
              
            }
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
}
