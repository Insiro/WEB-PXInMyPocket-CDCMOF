import marked, { MarkedOptions } from "marked";

export const markedOption: MarkedOptions = {
  renderer: new marked.Renderer(),
  gfm: true,
  headerIds: false,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
};
export const apiUrl: string = "	https://rkskekfk.run.goorm.io/api";
