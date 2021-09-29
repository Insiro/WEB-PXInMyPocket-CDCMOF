import SignIn from "@/views/SignIn.vue";
import Regist from "@/views/Regist.vue";
import FindAccount from "@/views/FindAccount.vue";
import { pageObj } from ".";
export const authUrl: Array<pageObj> = [
  {
    icon: null,
    name: "signIn",
    url: "/signIn",
    component: SignIn,
    meta: { noLayout: true },
  },
  {
    icon: null,
    name: "regist",
    url: "/regist",
    component: Regist,
    meta: { noLayout: true },
  },
  {
    icon: null,
    name: "reset",
    url: "/reset",
    component: FindAccount,
    meta: { noLayout: true },
  },
];
export default authUrl;
