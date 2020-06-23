import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoryOutput } from 'src/app/models/category.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemsService } from 'src/app/services/items.service';
import { ItemOutput } from 'src/app/models/item.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  mainCategories: CategoryOutput[];
  allItems: ItemOutput[];

  constructor(
    private toastService: ToastrService,
    private categoriesService: CategoriesService,
    private itemsService: ItemsService
  ) {
    //fetch main categories
    categoriesService.getMainCategories().subscribe(
      (categories: CategoryOutput[]) => {
        this.mainCategories = categories;
      },
      (error: HttpErrorResponse) => {
        this.toastService.error('Something went wrong', 'Error');
      }
    );
    //fetch all items
    itemsService.getAllItems().subscribe(
      (items: ItemOutput[]) => {
        this.allItems = items;
      },
      (error: HttpErrorResponse) => {
        this.toastService.error('Something went wrong', 'Error');
      }
    );
  }

  ngOnInit(): void {}
}
