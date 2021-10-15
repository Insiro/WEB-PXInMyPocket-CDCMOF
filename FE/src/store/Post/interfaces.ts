export default interface postDataInterface {
  data: PostInterface;
}
export interface PostInterface extends postListItem {
  content: string;
  isNotic: boolean;
  comment: Array<CommentInterface>;
}
export interface CommentInterface {
  id: string;
  author: string;
  content: string;
}
export interface postListInterface {
  data: Array<postListItem>;
}
export interface postListItem {
  id: string;
  author: string;
  title: string;
  created: string;
  isNotic: boolean;
}
