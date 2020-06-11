import { Component, OnInit, Input } from '@angular/core';
import { CategoryOutput } from 'src/app/models/category.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() breadcrumbs: CategoryOutput[];

  constructor() { }

  ngOnInit(): void {
  }

}
