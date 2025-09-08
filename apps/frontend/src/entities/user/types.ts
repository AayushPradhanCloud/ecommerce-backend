export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',
  CUSTOMER = 'customer'
}

export interface User {
  id: number
  email: string
  name: string
  role: UserRole
}