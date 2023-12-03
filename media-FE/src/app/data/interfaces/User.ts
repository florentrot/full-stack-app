export interface UserLocalData {
  active: boolean;
  exp: number;
  iat: number;
  sub: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verificationCode: string;
  registrationDate: string;
  isActive: boolean;
  role: Role;
}

export enum Role {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
}
