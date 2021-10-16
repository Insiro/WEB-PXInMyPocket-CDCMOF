import userState from "@/store/User";
import marked, { MarkedOptions } from "marked";
import { useToast } from "vue-toastification";

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
  if (!SignRequired()) return false;
  return userState.info.authority;
}
