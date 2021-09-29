<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <BaseModal :open="modalOpen" @close="modalClose">
      <div v-show="mod.regist">
        <div v-show="passed.id == false">군번을 확인 해주세요</div>
        <div v-show="passed.email == false">이메일을 확인 해주세요</div>
        <div v-show="passed.pwd == false">비밀번호를 확인 해주세요</div>
        등록을 기다려 주세요
      </div>
      <div v-show="mod.email">
        <div v-show="passed.email">사용 가능한 메일 입니다</div>
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
            <Button class="ml-7" @onClick="checkID"> 확인</Button>
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
              :picked="register.category"
              @pickUpdate="onCategoryUpdate"
              >병사</Radio
            >
            <Radio
              :class="[cateClass]"
              value="cadre"
              :picked="register.category"
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
  {{ mod }}
</template>
<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Vue, Options } from "vue-class-component";
import { TextInput, CheckBox, Radio } from "@/components/Inputs";
import { Button } from "@/components/Button";
import { webIcon } from "@/components/Icons";
import BaseModal from "@/components/Modal";

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
  register = {
    email: "",
    password: "",
    passwordCheck: "",
    id: "", //군번
    name: "",
    bye: "", //전역일
    category: "", //병사 | 간부
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
  regist(): void {
    //TODO: check regist value is availble
    if (this.passed.id && this.passed.email && this.passed.pwd) {
      //TODO: run regist api
      this.passed.all = true;
      this.router.push("/");
    } else {
      //TODO: alert wrong Input
      this.passed.all = false;
      this.mod.email = false;
      this.mod.regist = true;
      this.modalOpen = true;
    }
  }
  checkID(): void {
    //TODO: check ID then alert
    if (true) {
      this.passed.id = false;
    }
    //Change Contents following result
    //TODO: Bug: mod.email not changed to true
    this.mod.email = true;
    this.mod.regist = false;
    this.modalOpen = true;
  }
  //#region Item Event
  modalClose(): void {
    this.modalOpen = false;
  }
  onByeChanged(date: string): void {
    this.register.bye = date;
  }
  onNameChanged(name: string): void {
    this.register.name = name;
  }
  onEmailChanged(data: string): void {
    this.register.email = data;
    this.passed.email = false;
  }
  onIdChanged(data: string): void {
    this.register.id = data;
    this.passed.id = false;
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
    this.register.category = data;
    console.log(data);
  }

  //#endregion Item Event
}
</script>
