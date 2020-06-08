import { Component, OnInit, Input } from '@angular/core';
import { CategoryOutput } from 'src/app/models/category.model';

@Component({
  selector: 'app-main-category-menu',
  templateUrl: './main-category-menu.component.html',
  styleUrls: ['./main-category-menu.component.scss'],
})
export class MainCategoryMenuComponent implements OnInit {
  @Input() categories: CategoryOutput[];
  constructor() {}

  ngOnInit(): void {}
}
