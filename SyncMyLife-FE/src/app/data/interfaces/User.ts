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
  profilePicture: Blob;
  dateOfBirth: string;
  gender: string;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface UserLocalData{
  active: boolean;
  exp: number;
  iat: number;
  sub: string;
}
