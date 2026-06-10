export type itemInStore = {
  id: number,
  name: string,
  price_cents: number,
  producer: string,
  amount: number,
  categories: Array<string>
}

declare namespace Express {
  interface Request {
    articleList?: Array<itemInStore>;
  }
}
