import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() page: number;
  @Input() pageSize: number;
  @Input() total: number;
  lastPageNumber: number;

  @Output() pageChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.total)
    {
      this.page = 1;
    }
    this.lastPageNumber = Math.ceil(this.total/this.pageSize);
  }

  setPage(page:number, pageSize: number) {
    this.page = page;
    this.pageSize = pageSize;
    this.pageChange.emit({page: page, pageSize: pageSize});
  }
}
