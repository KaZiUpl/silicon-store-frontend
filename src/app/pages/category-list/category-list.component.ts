import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ActivatedRoute } from '@angular/router';
import { ItemOutput } from 'src/app/models/item.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoryOutput } from 'src/app/models/category.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  appLoading: number = 0;
  categoryId: number;
  items: ItemOutput[];
  mainCategories: CategoryOutput[];
  breadcrumbs: CategoryOutput[];
  childCategories: CategoryOutput[];
  parentCategory: CategoryOutput;

  constructor(
    private toastService: ToastrService,
    private itemService: ItemsService,
    private categoryService: CategoriesService,
    private route: ActivatedRoute
  ) {
    //get category id from params
    route.queryParams.subscribe((params: any) => {
      this.categoryId = params['category'];
      itemService.getAllItems(this.categoryId).subscribe(
        (response: ItemOutput[]) => {
          this.items = response;
          this.appLoading++;
        },
        (error: HttpErrorResponse) => {
          this.toastService.error('Something went wrong', 'Error');
        }
      );

      //get categories for main menu
      categoryService.getMainCategories().subscribe(
        (response: CategoryOutput[]) => {
          this.mainCategories = response;
        },
        (error: HttpErrorResponse) => {
          this.toastService.error('Something went wrong', 'Error');
        }
      );
      //get category breadcrumbs
      categoryService.getCategoryBreadcrumbs(this.categoryId).subscribe(
        (response: CategoryOutput[]) => {
          this.breadcrumbs = response;
          this.parentCategory =
            this.breadcrumbs.length > 2
              ? this.breadcrumbs[this.breadcrumbs.length - 2]
              : this.breadcrumbs[0];
          this.appLoading++;
        },
        (error: HttpErrorResponse) => {
          this.toastService.error('Something went wrong', 'Error');
        }
      );
      //get child categories
      categoryService.getChildCategories(this.categoryId).subscribe(
        (response: CategoryOutput[]) => {
          this.childCategories = response;
        },
        (error: HttpErrorResponse) => {
          this.toastService.error('Something went wrong', 'Error');
        }
      );
    });
  }

  ngOnInit(): void {}
}
