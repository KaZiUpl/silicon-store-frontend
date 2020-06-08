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
    exp: string;
    id: string;
    email: string;
    role: UserRole;
  }