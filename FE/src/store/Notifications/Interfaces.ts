export interface NoticItemInterface {
  notice_id: string;
  readed: boolean;
  product_name: string;
}
export interface NoticInterface {
  info: Array<NoticItemInterface>;
}
