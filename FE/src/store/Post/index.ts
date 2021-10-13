import {
  VuexModule,
  Module,
  getModule,
  Action,
  Mutation,
} from "vuex-module-decorators";
import postDataInterface, { PostInterface } from "./interfaces";
import store from "..";
import axios from "axios";
import { apiUrl, markedOption } from "@/utils";
import marked from "marked";

@Module({ namespaced: true, store, name: "PostModule", dynamic: true })
export class PostModule extends VuexModule implements postDataInterface {
  markedOption = markedOption;
  data: PostInterface = {
    id: "",
    content: "",
    author: "",
    created: "",
    comment: [],
    title: "",
  };
  @Mutation setData(data: PostInterface): void {
    this.data = data;
  }
  @Action async setId(id: string): Promise<void> {
    const post: PostInterface = {
      id: "",
      content: "",
      author: "",
      title: "",
      created: "",
      comment: [],
    };
    try {
      const response = await axios.get(apiUrl + "/freeboard", {
        params: { post_id: id },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = response.data;
      marked.setOptions(this.markedOption);
      post.id = id;
      post.title = data.title;
      post.author = data.writer;
      post.created = data.createdAt;
      post.content = marked(data.content);
      this.setData(post);
    } catch (e) {
      post.content = "Post Can not Roaded";
      this.setData(post);
      console.log(e);
    }
  }
  get content(): string {
    return this.data.content;
  }
  get title(): string {
    return this.data.title;
  }
}
const postState = getModule(PostModule);
export default postState;
