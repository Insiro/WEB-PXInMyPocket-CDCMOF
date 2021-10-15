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
import { useToast } from "vue-toastification";

@Module({ namespaced: true, store, name: "postListModule", dynamic: true })
export class postListModule extends VuexModule implements postListInterface {
  markedOption = markedOption;
  data: Array<postListItem> = [
    {
      id: "",
      author: "",
      title: "",
      isNotic: false,
      created: "", //createdAt
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Mutation setData(data: Array<any>): void {
    this.data = postListfy(data);
  }
  @Mutation setAnnouncement(post_id: string | null): void {
    const post = this.data.find((item) => item.id === post_id);
    if (post !== null && post !== undefined) post.isNotic = true;
  }
  @Mutation setDataClear(): void {
    this.data = [];
  }
  @Action async update(): Promise<void> {
    try {
      const result = await axios.get(apiUrl + "/freeboard/list");
      const data = result.data;
      this.setData(data);
    } catch (e) {
      console.log("failed to load PostList");
      useToast().error("게시글 목록을 가져오는데 실패하였습니다");
    }
  }
  @Action async updateAnnouncement(post_id: string | null): Promise<void> {
    try {
      const result: any = await axios.post(apiUrl + "/admin/set-announcement", {
        post_id: post_id,
      });
      if (result.result.data) this.setAnnouncement(post_id);
    } catch (e) {
      console.log("failed set Announcement");
    }
  }
  @Action async getAnnouncement(): Promise<Array<postListItem>> {
    try {
      const result = await axios.get(apiUrl + "/freeboard/announcement");
      return postListfy(result.data);
    } catch (e) {
      console.log("failed get Announcement");
      return [];
    }
  }
  get posts(): Array<postListItem> {
    return this.data;
  }
}
const postListState = getModule(postListModule);
export default postListState;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function postListfy(data: Array<any>): Array<postListItem> {
  const out_data: Array<postListItem> = [];
  data.map((item) => {
    out_data.push({
      id: item.post_id,
      title: item.title,
      author: item.writer,
      created: item.createdAt,
      isNotic: item.announcement === true,
    });
  });
  return out_data;
}
