import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ItemOutput } from 'src/app/models/item.model';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit, OnChanges {
  @Input() items: ItemOutput[];
  @Input() pageSize: number;
  displayedItems: ItemOutput[];
  isAuth: boolean = false;

  constructor(
    private toastService: ToastrService,
    private userService: UserService,
    private cartService: CartService
  ) {
    //subscribe to auth status
    userService.AuthenticatedStatus.subscribe((status: boolean) => {
      this.isAuth = status;
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {   
    if (this.items !== undefined) {      
     this.displayedItems = this.getItemsFromPage(1, this.pageSize);
     console.log();
     
    }
  }

  onAddToCart(itemId: number): void {
    this.cartService.addToCart({ item_id: itemId }).subscribe(
      (response: any) => {
        this.toastService.success('Added this item to your cart!', 'Oh yea!');
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

  pageChange(event: any): void {
    this.displayedItems = this.getItemsFromPage(event.page, event.pageSize);
  }

  getItemsFromPage(page: number, pageSize: number): ItemOutput[] {   
    return this.items.slice((page-1) * pageSize, (page-1) * pageSize + pageSize);
  }
}
