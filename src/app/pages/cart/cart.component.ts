import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Cart | Silicon Store');
  }

  ngOnInit(): void {}
}
