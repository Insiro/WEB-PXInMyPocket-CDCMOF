export interface NoticItemInterface {
  orderId: string | null;
  orderDate: string | null;
  productName: string | null;
  quantity: number | null;
  totalPrice: number | null;
}
export interface NoticInterface {
  info: Array<NoticItemInterface>;
}
