export class CartItemOutput {
  user_id: number;
  item_id: number;
  amount: number;
  price: number;
  item_name: string;
  photo: string;
}

export class CreateCartItemInput {
  item_id: number;
}
export class UpdateCartItemInput {
  item_id: number;
  amount: number;
}
