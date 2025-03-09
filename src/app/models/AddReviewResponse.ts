export type addReviewResponse = {
  success:boolean,
  user: {
    userName: string,
    email: string,
    token: string
  }
}