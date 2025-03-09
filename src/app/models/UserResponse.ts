export type userResponse = {
  success:boolean,
  user: {
    userName: string,
    email: string,
    token: string
  }
}