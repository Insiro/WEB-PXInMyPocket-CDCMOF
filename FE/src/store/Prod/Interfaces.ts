export default interface ProdInterface {
  items: Array<ProductFormat>;
}
export interface ProductFormat {
  id: string;
  name: string;
  remain: number;
  price: number;
  limit_item: boolean;
  category: string;
  monthly_sale: number;
  weekly_sale: number;
  src: string | null;
}
