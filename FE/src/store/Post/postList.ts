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
      isNotic: false,
      created: "", //createdAt
    },
  ];

  @Mutation setData(data: Array<any>): void {
	  console.log('check');
    this.data = [];
	  /*
	  for(let i = 0; i < data.length; i++)
		  {
		       this.data.push({
        id: data[i].post_id,
        title: data[i].title,
        author: data[i].writer,
        created: data[i].createdAt,
        isNotic: data[i].announcement,
      });
		  }*/
    data.map((item) => {
		console.log(item);
      this.data.push({
        id: item.post_id,
        title: item.title,
        author: item.writer,
        created: item.createdAt,
        isNotic: item.announcement,
      });
	 });
  }
  @Mutation setAnnouncement(post_id : string | null) : void {
	  this.data.find(item => item.post_id === post_id).isNotic = true;
  }
  @Mutation setDataClear() : void {
	  this.data = [];
  }
//////////////
  @Action async update(): Promise<void> {
    try {
      const result = await axios.get(apiUrl + "/freeboard/list");
      const data = result.data;
      this.setData(data);
    } catch (e) {
      console.log("failed to load PostList");
    }
  }
  @Action async updateAnnouncement(post_id : string | null): Promise<void> {
	  try{
		  const result = await axios.post(apiUrl + "/admin/set-announcement", {post_id: post_id});
		  if(result.result)
			this.setAnnouncement(post_id);
		
	  }	catch (e) {
      console.log("failed set Announcement");
    }
  }
  @Action async getAnnouncement(): Promise<Array<postListItem>> {
	  try {
		  const result = await axios.get(apiUrl + "/freeboard/announcement");
		  this.setData(result.data);
		  return this.data;
	  } catch (e) {
      console.log("failed get Announcement");
		  console.log(e);
    }
  }
  get posts(): Array<postListItem> {
    return this.data;
  }
}
const postListState = getModule(postListModule);
export default postListState;
