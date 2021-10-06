<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <BaseModal :open="modalOpen" @close="modalClose">
      <div v-show="mod.submitNewInfo">
        <div v-show="passed.pwd == false">현재 비밀번호를 확인 해주세요</div>
        <div v-show="passed.newPwd == false">
          새로운 비밀번호가 확인 비밀번호와 동일하지 않습니다.
        </div>
        <div v-show="passed.all == true">수정이 완료되었습니다</div>
      </div>
      <div v-show="mod.checkPrevPwd">
        <div v-show="passed.pwd">비밀번호를 확인했습니다.</div>
        <div v-show="passed.pwd == false">비밀번호가 틀렸습니다.</div>
      </div>
      <div v-show="mod.raiseAuthority">
        <div>
          관리자 권한 신청이 접수되었습니다. <br />
          3일이내 승입됩니다.
        </div>
      </div>
    </BaseModal>
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <webIcon />
        <span class="text-2xl font-semibold text-gray-700">개인정보 수정</span>
      </div>

      <form class="mt-4" @submit.prevent="changeInfo">
        <label class="block">
          <span class="text-sm text-gray-700">
            비밀번호 확인
            <Button class="ml-7" @onClick="checkCurPwd"> 확인</Button>
          </span>
          <TextInput
            v-model="Pwd.password"
            placeholder="*****"
            input_type="password"
            :value="Pwd.password"
            :class="inputStyle"
            @updates="onPwdCheck"
          />
        </label>
        <label class="block mt-3">
          <span class="text-sm text-gray-700">New Password</span>
          <TextInput
            placeholder="****"
            input_type="password"
            :value="Pwd.newPassword"
            :class="inputStyle"
            @updates="onPwdChanged"
          />
        </label>
        <label class="block mt-3">
          <span class="text-sm text-gray-700"
            >New Password Check {{ isPwdSuccessString }}</span
          >
          <TextInput
            placeholder="****"
            input_type="password"
            :value="Pwd.passwordCheck"
            :class="inputStyle"
            @updates="onPwdCheckChanged"
          />
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">군번</span>
          <TextInput
            placeholder="20-12345678"
            input_type="text"
            :value="changeInfo.id"
            :class="inputStyle"
            @updates="onIdChanged"
          />
        </label>
        <label class="block mt-3">
          <span class="text-sm text-gray-700">전역일</span>
          <TextInput
            placeholder="2022-01-01"
            input_type="text"
            :value="changeInfo.bye"
            :class="inputStyle"
            @updates="onByeChanged"
          />
        </label>
        <div class="mt-6">
          <Button
            class="w-full px-4 text-sm text-center"
            @onClick="giveAuthority"
          >
            관리자 권한 신청
          </Button>
        </div>
        <div class="mt-6">
          <Button
            class="w-full px-4 text-sm text-center"
            @onClick="changeUserInfo"
          >
            회원 정보 수정
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
import UserState from "@/store/User";
import { UserInfoInterface } from "../store/User/Interfaces";

@Options({
  components: { TextInput, webIcon, CheckBox, Button, Radio, BaseModal },
})
export default class ChangeInfo extends Vue {
  router = useRouter();
  passed = {
    id: false,
    pwd: false,
    newPwd: false,
    all: false,
  };
  Pwd = {
    password: "",
    newPassword: "",
    passwordCheck: "",
  };
  changeInfo = {} as UserInfoInterface;
  //모달 트리거
  mod = {
    submitNewInfo: false,
    checkPrevPwd: false,
    raiseAuthority: false,
  };
  modalOpen: boolean = false;
  isPwdSuccessString: string = "";
  //#region Style
  inputStyle = ref("block rounded-md w-full ");
  cateClass = ref("mx-5");
  //#endregion Style
  changeUserInfo(): void {
    this.mod.raiseAuthority = false;
    this.mod.checkPrevPwd = false;
    this.mod.submitNewInfo = true;
    this.passed.all = false;

    if (this.passed.pwd && this.passed.newPwd) {
      this.passed.all = true;
      UserState.changeInfo(this.changeInfo);
    }
    this.modalOpen = true;

    /*const result = UserState.signIn(this.changeInfo.email, this.changeInfo.password);
    if (result) {
      this.router.push("/");
    } else {
      //TODO: alert wrong passwod
    }
    */
  }
  giveAuthority(): void {
    this.mod.raiseAuthority = true;
    this.mod.checkPrevPwd = false;
    this.mod.submitNewInfo = false;
    this.modalOpen = true;
  }
  checkCurPwd(): void {
    //TODO: check Pwd then alert
    // axios 통신으로 받은 값 => returnVal
    // returnVal == 1 : pwd is correct
    var returnVal = true;
    this.mod.raiseAuthority = false;
    this.mod.submitNewInfo = false;
    this.mod.checkPrevPwd = true;
    this.passed.pwd = false;

    if (returnVal) {
      this.passed.pwd = true;
      this.modalOpen = true;
    } else {
      this.modalOpen = true;
    }
    this.passed.pwd = true;
  }
  //#region Item Event
  modalClose(): void {
    this.modalOpen = false;
  }
  onIdChanged(data: string): void {
    this.changeInfo.id = data;
  }
  onByeChanged(date: string): void {
    this.changeInfo.bye = date;
  }
  onPwdCheck(data: string): void {
    this.Pwd.password = data;
  }
  onPwdChanged(data: string): void {
    this.Pwd.newPassword = data;
  }
  onPwdCheckChanged(data: string): void {
    this.Pwd.passwordCheck = data;
    this.passed.newPwd = this.Pwd.newPassword === data ? true : false;
    this.isPwdSuccessString = this.passed.newPwd ? "Passed" : "Fail";
  }

  //#endregion Item Event
}
</script>
