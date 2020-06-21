export class OrderOutput {
    id: number;
    user_id: number;
    name: string;
    surname: string;
    address: string;
    city: string;
    postal_code: string;
    created_at: string;
    updated_at: string;
}

export class CreateOrderInput {
    name: string;
    surname: string;
    address: string;
    city: string;
    postal_code: string;
}