<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <BaseModal :open="modalOpen" @close="modalClose">
      <div v-show="mod.regist == true">
        <div v-show="passed.id == false">군번을 확인 해주세요</div>
        <div v-show="passed.email == false">이메일을 확인 해주세요</div>
        <div v-show="passed.pwd == false">비밀번호를 확인 해주세요</div>
        등록을 기다려 주세요
      </div>
      <div v-show="mod.email == true">
        <div v-show="passed.email == true">사용 가능한 메일 입니다</div>
        <div v-show="passed.email == false">이미 가입된 메일 입니다</div>
      </div>
    </BaseModal>
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <webIcon />
        <span class="text-2xl font-semibold text-gray-700">회원가입</span>
      </div>

      <form class="mt-4" @submit.prevent="regist">
        <label class="block">
          <span class="text-sm text-gray-700">
            Email

            <Button class="ml-7" @click.self.prevent="" @onClick="check_id"
              >확인</Button
            >
          </span>
          <TextInput
            v-model="register.email"
            placeholder="email@example.com"
            input_type="email"
            :value="register.email"
            :class="inputStyle"
            @updates="onEmailChanged"
          />
        </label>
        <label class="block mt-3">
          <span class="text-sm text-gray-700">Password</span>
          <TextInput
            placeholder="****"
            input_type="password"
            :value="register.password"
            :class="inputStyle"
            @updates="onPwdChanged"
          />
        </label>
        <label class="block mt-3">
          <span class="text-sm text-gray-700"
            >Password Check {{ isPwdSuccessString }}</span
          >
          <TextInput
            placeholder="****"
            input_type="password"
            :value="register.passwordCheck"
            :class="inputStyle"
            @updates="onPwdCheckChanged"
          />
        </label>
        <label class="block mt-3">
          <span class="text-sm text-gray-700">이름</span>
          <TextInput
            placeholder="name"
            input_type="text"
            :value="register.name"
            :class="inputStyle"
            @updates="onNameChanged"
          />
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">군번</span>
          <TextInput
            placeholder="군번"
            input_type="text"
            :value="register.id"
            :class="inputStyle"
            @updates="onIdChanged"
          />
        </label>
        <label class="block mt-3">
          <span class="text-sm text-gray-700">전역일</span>
          <TextInput
            placeholder="전역일"
            input_type="text"
            :value="register.bye"
            :class="inputStyle"
            @updates="onByeChanged"
          />
        </label>
        <label calss="block mt-3">
          <span class="text-sm text-gray-700 block">구분</span>
          <span class="flex">
            <Radio
              :class="[cateClass]"
              value="normal"
              :picked="register.rank"
              @pickUpdate="onCategoryUpdate"
              >병사</Radio
            >
            <Radio
              :class="[cateClass]"
              value="cadre"
              :picked="register.rank"
              @pickUpdate="onCategoryUpdate"
              >간부</Radio
            >
          </span>
        </label>
        <div class="mt-6">
          <Button class="w-full px-4 text-sm text-center" @onClick="regist">
            가입 신청
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
import { TextInput, CheckBox, Radio } from "@/components/Inputs";
import { Button } from "@/components/Button";
import { webIcon } from "@/components/Icons";
import BaseModal from "@/components/Modal";
import UserState from "@/store/User";
import { RegistInterface } from "@/store/User/Interfaces";

@Options({
  components: { TextInput, webIcon, CheckBox, Button, Radio, BaseModal },
})
export default class Regist extends Vue {
  router = useRouter();
  passed = {
    id: false,
    email: false,
    pwd: false,
    all: false,
  };
  register: RegistInterface = {
    email: "",
    password: "",
    passwordCheck: "",
    id: "", //군번
    name: "",
    bye: "", //전역일
    rank: false, //병사 | 간부
    profileImg: null,
    authority: false,
  };
  //모달 트리거
  mod = {
    email: false,
    regist: false,
  };
  modalOpen: boolean = false;
  isPwdSuccessString: string = "";
  //#region Style
  inputStyle = ref("block rounded-md w-full ");
  cateClass = ref("mx-5");
  //#endregion Style
  async regist(): Promise<void> {
    this.mod.regist = true;
    this.passed.all = true;
    var result = await UserState.regist(this.register);
    if (result) {
      this.router.push("/");
    } else {
      this.passed.all = false;
      this.modalOpen = true;
    }
  }

  async check_id(): Promise<void> {
    this.mod.email = true;
    this.mod.regist = false;

    var result = await UserState.isExist(this.register.email ?? "");
    if (result) this.passed.email = false;
    else this.passed.email = true;
    //Change Contents following result
    this.modalOpen = true;
  }
  //#region Item Event
  modalClose(): void {
    this.modalOpen = false;
    this.mod.email = false;
    this.mod.regist = false;
  }
  onByeChanged(date: string): void {
    this.register.bye = date;
  }
  onNameChanged(name: string): void {
    this.register.name = name;
  }
  onEmailChanged(data: string): void {
    this.register.email = data;
    this.passed.email = true;
  }
  onIdChanged(data: string): void {
    this.register.id = data;
    this.passed.id = true;
  }
  onPwdChanged(data: string): void {
    this.register.password = data;
    if (this.register.passwordCheck !== data) {
      this.passed.pwd = false;
      this.isPwdSuccessString = "";
    }
  }
  onPwdCheckChanged(data: string): void {
    this.register.passwordCheck = data;
    this.passed.pwd = this.register.password === data ? true : false;
    this.isPwdSuccessString = this.passed.pwd ? "Passed" : "Fail";
  }
  onCategoryUpdate(data: string): void {
    this.register.rank = data === "normal";
  }

  //#endregion Item Event
}
</script>
