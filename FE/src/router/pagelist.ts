import Home from "../views/Home.vue";

export interface pgobj {
  icon?: string | null;
  name: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
}

export const list: Array<pgobj> = [
  { icon: null, name: "Home", url: "/", component: Home },
  { icon: null, name: "test", url: "/", component: Home },
];
