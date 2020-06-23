import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryOutput } from 'src/app/models/category.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemService } from 'src/app/services/item.service';
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
    private categoriesService: CategoryService,
    private itemsService: ItemService
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
