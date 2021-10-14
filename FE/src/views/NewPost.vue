<template>
  <div class="flex flex-col h-full w-full mx-5">
    <div class="flex mt-3 postItem flex-row">
      <TextInput
        placeholder="제목"
        class="flex-grow"
        :value="title"
        @updates="onTitleChanged"
      />
      <div v-show="is_admin" class="flex-grow-0">
        <span class="inline-block">분류 : </span>
        <select v-model="isNotic" class="ui dropdown inline-block">
          <option :value="true">Notic</option>
          <option :value="false">Normal</option>
        </select>
      </div>
    </div>

    <WideFrame class="flex-grow postItem">
      <textarea
        v-model="content"
        class="h-full"
        placeholder="게시글을 입력하세요"
      ></textarea>
    </WideFrame>
    <Button class="flex-grow-0 mt-5" @Click="submitPost">게시</Button>
  </div>
</template>
<script lang="ts">
import { WideFrame } from "@/components/CardFrame";
import { TextInput } from "@/components/Inputs";
import { Options, Vue } from "vue-class-component";
import userState from "@/store/User";
import Button from "@/components/Button";
import axios from "axios";
import { apiUrl } from "@/utils";
import { useToast } from "vue-toastification";
@Options({ components: { WideFrame, TextInput, Button } })
export default class NewPost extends Vue {
  content = "";
  title = "";
  toast = useToast();
  isNotic = false;
  onTitleChanged(data: string): void {
    this.title = data;
  }
  get isSigned(): boolean {
    return userState.bSigned;
  }
  get is_admin(): boolean {
    return userState.UserData?.authority ?? false;
  }
  async submitPost(): Promise<void> {
    try {
      await axios.post(apiUrl + "/freeboard", {
        title: this.title,
        content: this.content,
        isNotic: this.isNotic,
      });
      this.toast.success("success to Upload Post");
    } catch (error) {
      console.log(error);
      this.toast.error("failed to upload Post");
    }
    //
  }
}
</script>
<style scoped>
.postItem {
  max-width: 750px;
}
</style>
