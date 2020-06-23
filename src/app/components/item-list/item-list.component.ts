import { Component, OnInit, Input } from '@angular/core';
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
export class ItemListComponent implements OnInit {
  @Input() items: ItemOutput[];
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
}
