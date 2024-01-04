export interface ObjectOfStrings {
  [propName: string]: string
}

export interface User {
  email?: string
  password?: string
  phone?: string
  token?: string
}

export interface SignUp {
    email?: string
    password?: string
    phone?: string
    code?: string
    saveCode?: string
  }