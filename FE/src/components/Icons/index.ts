import IconSearch from "./Search.vue";
import webIcon from "./webIcon.vue";
import Refresh from "./Refresh.vue";
import Xicon from "./Xicon.vue";
import CircleGraph from "./CricleGraph.vue";
import { Component } from "vue";
export { IconSearch, webIcon, Refresh, Xicon, CircleGraph };
interface IconComponent {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Component<any, any, any, any, any>;
}
export const IconComponentList: Array<IconComponent> = [
  { name: "search-icon", component: IconSearch },
  { name: "web-icon", component: webIcon },
  { name: "refresh-icon", component: Refresh },
  { name: "x-icon", component: Xicon },
  { name: "circle-graph-icon", component: CircleGraph },
];
