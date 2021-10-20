<template>
  <BaseModal
    class="md:hidden"
    :open="show_search_modal"
    action="검색"
    @close="searchModalClose"
  >
  </BaseModal>
  <header
    class="
      flex
      items-center
      justify-between
      px-6
      py-4
      bg-white
      border-b-4 border-indigo-600
    "
  >
    <div class="flex items-center">
      <button
        class="text-gray-500 focus:outline-none lg:hidden"
        @click="is_open = true"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <h2>
        <span class="text-3xl font-medium font-semibold text-gray-700">
          {{ PageName }}</span
        >
      </h2>
    </div>

    <div class="flex items-center">
      <div class="headBar flex items-center">
        <router-link to="/cart">
          <CartIcon />
        </router-link>
      </div>
      <Menu>
        <template #icon>
          <RingIcon />
        </template>
        <template #menu>
          <!--TODO: Add Notify Items Here-->
          <MenuItem
            v-for="item in notices"
            :key="item.notice_id"
            :class="item.readed ? 'bg-gray-200' : ''"
          >
            <div class="flex flex-row mx-3 justify-between">
              <span class="flex-grow" @click="setRead(item.notice_id)">
                {{ item.product_name }}
              </span>
              <Xicon @click="removeNotic(item.notice_id)" />
            </div>
          </MenuItem>
          <MenuItem @click="removeReaded">읽은 알람 삭제</MenuItem>
        </template>
      </Menu>
      <Menu>
        <template #icon>
          <ProfileIcon v-show="!is_signed" />
          <img
            v-show="is_signed"
            class="object-cover w-full h-full"
            :src="user?.profileImg ?? ''"
            alt="Your avatar"
          />
        </template>
        <template #menu>
          <MenuItem :class="[menuItemClass]">
            <router-link to="/cart">
              <CartIcon :class="[menuiconClass]" /> 장바구니
            </router-link>
          </MenuItem>
          <MenuItem v-show="is_signed">
            <router-link to="/changeInfo">개인정보 수정</router-link>
          </MenuItem>
          <MenuItem v-show="is_signed" @click="signOut()">Log out</MenuItem>
          <MenuItem v-show="is_signed === false" to="/signIn">
            Log In
          </MenuItem>
        </template>
      </Menu>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { ref } from "vue";
import Menu, { MenuItem } from "./Menu";
import { TextInput } from "@/components/Inputs";
import { RingIcon, CartIcon, ProfileIcon, Xicon } from "@/components/Icons";
import BaseModal from "@/components/Modal";
import globalState from "@/store/global";
import userState from "@/store/User/Module";
import notifyState from "@/store/Notifications";
import { NoticItemInterface } from "@/store/Notifications/Interfaces";
@Options({
  components: {
    MenuItem,
    TextInput,
    RingIcon,
    CartIcon,
    BaseModal,
    Menu,
    ProfileIcon,
    Xicon,
  },
})
export default class Header extends Vue {
  show_search_modal = false;
  user = userState.UserData;
  menuItemClass = ref("lg:hidden");
  menuiconClass = ref("inline-block");
  get PageName(): string {
    return globalState.pageName;
  }
  get is_open(): boolean {
    return globalState.isSideBarOpend;
  }
  set is_open(state: boolean) {
    globalState.setSideBar(state);
  }
  get is_signed(): boolean {
    return userState.bSigned;
  }
  get notices(): Array<NoticItemInterface> {
    return notifyState.infos;
  }
  signOut(): void {
    userState.signOut();
  }
  openSearch(): void {
    this.show_search_modal = true;
  }
  searchModalClose(): void {
    this.show_search_modal = false;
  }
  removeNotic(id: string): void {
    notifyState.remove_Notice(id);
    //TODO remove Notic with Notic Sotr
  }
  removeReaded(): void {
    notifyState.remove_readed();
    //
  }
  setRead(id: string): void {
    notifyState.setRead(id);
  }
}
</script>
<style scoped>
@media (max-width: 1024px) {
  .headBar {
    display: none;
  }
}
.headBar {
  vertical-align: middle;
}
</style>
