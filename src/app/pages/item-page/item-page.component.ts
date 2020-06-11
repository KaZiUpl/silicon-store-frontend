import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemOutput } from 'src/app/models/item.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryOutput } from 'src/app/models/category.model';
import { CommentOutput } from 'src/app/models/comment.model';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
})
export class ItemPageComponent implements OnInit {
  item: ItemOutput = new ItemOutput();
  breadcrumbs: CategoryOutput[];
  comments: CommentOutput[];

  constructor(
    private itemService: ItemsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //get item's id from route
    this.item.id = route.snapshot.params.id;
    //get item's info
    this.itemService.getItem(this.item.id).subscribe(
      (response: ItemOutput) => {
        this.item = response;
      },
      (error: HttpErrorResponse) => {
        router.navigate(['/index']);
      }
    );
    //get item's breadcrumbs
    this.itemService.getItemBreadcrumbs(this.item.id).subscribe(
      (response: CategoryOutput[]) => {
        this.breadcrumbs = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

    //get item's comments
    this.itemService.getItemComments(this.item.id).subscribe(
      (response: CommentOutput[]) => {
        this.comments = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
