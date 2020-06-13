export class UserOutput {
    id: number;
    name: string;
    email: string;
}

export class CreateUserInput {
    email: string;
    name: string;
    password: string;
}

export enum UserRole {
    Customer = 'Customer'
}

export class TokenOutput {
    api_key: string;
    id: number;
    email: string;
    role: UserRole;
  }