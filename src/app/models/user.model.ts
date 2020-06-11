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
    token: string;
    refresh_token: string;
    id: number;
    email: string;
    role: UserRole;
  }