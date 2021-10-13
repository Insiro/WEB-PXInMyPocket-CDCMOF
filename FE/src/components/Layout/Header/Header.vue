<template>
  <BaseModal
    class="md:hidden"
    :open="show_search_modal"
    action="검색"
    @close="searchModalClose"
  >
    <TextInput type="text" placeholder="Search">
      <IconSearch />
    </TextInput>
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
        <TextInput type="text" placeholder="Search">
          <IconSearch />
        </TextInput>
        <router-link to="/cart">
          <CartIcon />
        </router-link>
      </div>
      <IconSearch class="ml-4" :class="[menuItemClass]" @click="openSearch" />
      <Menu>
        <template #icon>
          <RingIcon />
        </template>
        <template #menu>
          <!--TODO: Add Notify Items Here-->
          <MenuItem>읽은 알람 삭제</MenuItem>
        </template>
      </Menu>
      <Menu>
        <template #icon>
          <!-- TODO: change to profileImg -->
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
import {
  IconSearch,
  RingIcon,
  CartIcon,
  ProfileIcon,
} from "@/components/Icons";
import BaseModal from "@/components/Modal";
import globalState from "@/store/global";
import userState from "@/store/User/Module";

@Options({
  components: {
    MenuItem,
    TextInput,
    IconSearch,
    RingIcon,
    CartIcon,
    BaseModal,
    Menu,
    ProfileIcon,
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
  signOut(): void {
    userState.signOut();
  }
  openSearch(): void {
    this.show_search_modal = true;
  }
  searchModalClose(): void {
    this.show_search_modal = false;
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
