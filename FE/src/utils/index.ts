import userState from "@/store/User";
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
export const apiUrl: string = "/api";
export function SignRequired(): boolean {
  return userState.bSigned;
}
export function AuthorityRequired(): boolean {
  return SignRequired() && userState.info.authority;
}
export const Title = "내손의 PX";
