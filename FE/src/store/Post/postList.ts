import {
  VuexModule,
  Module,
  getModule,
  Action,
  Mutation,
} from "vuex-module-decorators";
import { postListInterface, postListItem } from "./interfaces";
import store from "..";
import axios from "axios";
import { apiUrl, markedOption } from "@/utils";

@Module({ namespaced: true, store, name: "postListModule", dynamic: true })
export class postListModule extends VuexModule implements postListInterface {
  markedOption = markedOption;
  data: Array<postListItem> = [
    {
      id: "",
      author: "",
      title: "",
      created: "", //createdAt
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Mutation setData(data: Array<any>): void {
    this.data = [];
    data.map((item) => {
      this.data.push({
        id: item.post_id,
        title: item.title,
        author: item.writer,
        created: item.createdAt,
      });
    });
  }
  @Action async update(): Promise<void> {
    try {
      const result = await axios.get(apiUrl + "/freeboard/list");
      const data = result.data;
      this.setData(data);
    } catch (e) {
      console.log("failed to load PostList");
    }
  }
  get posts(): Array<postListItem> {
    return this.data;
  }
}
const postListState = getModule(postListModule);
export default postListState;
