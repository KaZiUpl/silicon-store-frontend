import { Component, OnInit, Input } from '@angular/core';
import { ItemOutput } from 'src/app/models/item.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Input() items: ItemOutput[];
  isAuth: boolean = false;

  constructor(private userService: UserService) {
    //subscribe to auth status
    userService.AuthenticatedStatus.subscribe((status: boolean) => {
      this.isAuth = status;
    });
  }

  ngOnInit(): void {}
}
