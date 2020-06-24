import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemOutput } from 'src/app/models/item.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryOutput } from 'src/app/models/category.model';
import { CommentOutput } from 'src/app/models/comment.model';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
})
export class ItemPageComponent implements OnInit {
  item: ItemOutput = new ItemOutput();
  breadcrumbs: CategoryOutput[];
  comments: CommentOutput[];
  isAuth: boolean = false;

  constructor(
    private toastService: ToastrService,
    private itemService: ItemService,
    private userService: UserService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {
    userService.AuthenticatedStatus.subscribe((status: boolean) => {
      this.isAuth = status;
    });
    //get item's id from route
    this.item.id = route.snapshot.params.id;
    //get item's info
    this.itemService.getItem(this.item.id).subscribe(
      (response: ItemOutput) => {
        this.item = response;
        this.titleService.setTitle(this.item.name + ' | Silicon Store');
      },
      (error: HttpErrorResponse) => {
        this.toastService.error(
          'Something went wrong when loading item for you',
          'Error'
        );
      }
    );
    //get item's breadcrumbs
    this.itemService.getItemBreadcrumbs(this.item.id).subscribe(
      (response: CategoryOutput[]) => {
        this.breadcrumbs = response;
      },
      (error: HttpErrorResponse) => {
        this.toastService.error(
          'Something went wrong when loading breadcrumbs',
          'Error'
        );
      }
    );

    //get item's comments
    this.itemService.getItemComments(this.item.id).subscribe(
      (response: CommentOutput[]) => {
        this.comments = response;
      },
      (error: HttpErrorResponse) => {
        this.toastService.error(
          "Something went wrong, we couldn't load comments for you",
          'Error'
        );
      }
    );
  }

  ngOnInit(): void {}

  onAddToCart(): void {
    this.cartService.addToCart({ item_id: this.item.id }).subscribe(
      (response: any) => {
        this.toastService.success('Added item to your cart!');
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
