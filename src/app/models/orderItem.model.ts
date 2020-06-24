import { ItemOutput } from './item.model';

export class OrderItemOutput {
  order_id: number;
  item_id: number;
  amount: number;
  price: number;
  item_name: string;
}
