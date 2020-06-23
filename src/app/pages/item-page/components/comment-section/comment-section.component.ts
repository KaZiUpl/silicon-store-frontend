import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { CommentOutput } from 'src/app/models/comment.model';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { ItemOutput } from 'src/app/models/item.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemsService } from 'src/app/services/items.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent implements OnInit, OnChanges {
  @Input() item: ItemOutput;
  @Input() comments: CommentOutput[];
  @ViewChild('commForm') commentFormDirective: NgForm;
  userComment: CommentOutput;
  commentForm: FormGroup;
  isAuth: boolean = false;

  constructor(
    private toastService: ToastrService,
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

  ngOnInit(): void {
    
  }

  ngOnChanges(changes):void {
    if(changes.comments && changes.comments.currentValue && changes.comments.currentValue.length > 0 && this.userService.getLocalUser() != null)
    {
      let userComment:CommentOutput = changes.comments.currentValue.filter((element:CommentOutput) => element.user_id == this.userService.getLocalUser().id)[0];
      
      
      this.commentForm.patchValue({
        text: userComment.text
      });
      this.userComment = userComment;
    }
    
    
  }

  onCommentFormSubmit(): void {
    if (this.commentForm.invalid) return;

    if(this.userComment) {
      //update comment
      this.commentService.updateComment(this.userComment.id, {text: this.commentForm.value.text}).subscribe(
        (data:any) => {
          this.toastService.success('Updated your comment');
          /// update comment text on the list
          this.comments.forEach(comment => {
            if(comment.id == this.userComment.id) {
              comment.text = this.commentForm.value.text;
            }
          });
        },
        (error: HttpErrorResponse) => {
          this.toastService.error('Something went wrong and we couldn\'t update your comment');
        }
      );
    }
    else {
      //create comment
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
              this.comments.forEach(comment => {
                if(comment.user_id == this.userService.getLocalUser().id)
                {
                  this.userComment = comment;
                }
              });
              this.commentForm.reset();
              this.commentFormDirective.resetForm();
            },
            (error: HttpErrorResponse) => {
              this.toastService.error('Something went wrong', 'Error');
            }
          );
        },
        (error: HttpErrorResponse) => {
          if (error.status == 400) {
            this.toastService.error(error.error.message, 'Error');
          } else {
            this.toastService.error('Something went wrong', 'Error');
          }
        }
      );
    }
    
  }
}
