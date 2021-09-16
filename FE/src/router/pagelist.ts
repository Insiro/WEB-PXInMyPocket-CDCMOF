import Home from "../views/Home.vue";

export interface pgobj {
  icon?: string | null;
  name: string;
  url: string;
  component: any;
}

export const List: Array<pgobj> = [
  { icon: null, name: "Home", url: "/", component: Home },
];
