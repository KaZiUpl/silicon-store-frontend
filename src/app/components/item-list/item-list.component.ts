import { Component, OnInit, Input } from '@angular/core';
import { ItemOutput } from 'src/app/models/item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input() items: ItemOutput[];

  constructor() { }

  ngOnInit(): void {
  }

}
