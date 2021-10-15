<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <BaseModal :open="modalOpen" @close="modalClose">
      <div v-show="mod.notice == true"></div>
    </BaseModal>
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <webIcon />
        <span class="text-2xl font-semibold text-gray-700">notice test</span>
      </div>

      <form class="mt-4" @submit.prevent="regist">
        <div class="mt-6">
          <Button class="w-full px-4 text-sm text-center" @onClick="sendNotice">
            update Notices
          </Button>
			<Button class="w-full px-4 text-sm text-center" @onClick="NoticPosts">
			announcement
	</Button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Vue, Options } from "vue-class-component";
import { Button } from "@/components/Button";
import { webIcon } from "@/components/Icons";
import BaseModal from "@/components/Modal";
import notifyState from "@/store/Notifications";
import { NoticInterface } from "@/store/Notifications/Interfaces";

import { postListItem } from "@/store/Post/interfaces";
import postListState from "@/store/Post/postList";

@Options({
  components: { webIcon, Button, BaseModal },
})
export default class NoticTest extends Vue {
  router = useRouter();
  newNotices: NoticInterface;
  //모달 트리거
  mod = {
    notice: false,
  };
  modalOpen: boolean = false;
  //#region Style
  inputStyle = ref("block rounded-md w-full ");
  cateClass = ref("mx-5");
  //#endregion Style
  async sendNotice(): Promise<void> {
    this.mod.notice = true;
    var result = await notifyState.updateNotics();
    //TODO: update notify pageView
    if (result) {
    } else {
      //TODO: alert wrong Input
      this.modalOpen = true;
      console.log(result);
    }
  }
async NoticPosts(): Promise<Array<postListItem>> {
    //TODO: filter with isNotic?
	var result = await postListState.getAnnouncement()
	console.log(result);
    //return postListState.posts.filter((item) => item.announcement).slice(4);
  }
  //#region Item Event
  modalClose(): void {
    this.modalOpen = false;
  }

  //#endregion Item Event
}
</script>
