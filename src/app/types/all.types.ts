export type NavigationMenuItem = {
  icon: string, 
  label: string, 
  route: string
}

export type User = {
  userName: string,
  email: string,
  token: string
}

export type userResponse = {
  success:boolean,
  user: {
    userName: string,
    email: string,
    token: string
  }
}

export type serviceError = {
  statusCode: number,
  message: string
}