export default interface CartInterface {
  items: Array<CartItemInterface>;
}
export interface CartItemInterface {
  img: string;
  name: string;
  id: string;
  amount: number;
  checked: boolean;
  price: number;
}
export interface CartCheckedInterface {
  id: string;
  amount: number;
}
export interface ItemInterface {
  //TODO: use ItemIterface with Items store;
  name: string;
  price: number;
  img: string;
  amount: number;
}
