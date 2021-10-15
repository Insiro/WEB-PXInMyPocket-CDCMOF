<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <BaseModal :open="modalOpen" @close="modalClose">
      <div v-show="mod.submitNewInfo">
        <div v-show="passed.pwd == false">현재 비밀번호를 확인 해주세요</div>
        <div v-show="passed.newPwd == false">
          새로운 비밀번호가 확인 비밀번호와 동일하지 않습니다.
        </div>
        <div v-show="!changeInfo.id">군번을 입력하세요</div>
        <div v-show="!changeInfo.bye">전역날을 입력하세요</div>
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

      <form class="mt-4" @submit.prevent="changeUserInfo">
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
    pwd: true,
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
  async changeUserInfo(): Promise<void> {
    this.mod.raiseAuthority = false;
    this.mod.checkPrevPwd = false;
    this.mod.submitNewInfo = true;

    var newInfo = {
      new_password: this.Pwd.newPassword,
      new_serial_number: this.changeInfo.id,
      new_expire_date: this.changeInfo.bye,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var result: any = await UserState.changeUserInfo(newInfo);
    this.passed.all =
      this.passed.newPwd &&
      !this.changeInfo.id &&
      !this.changeInfo.bye &&
      result.data.changeInfoSuccess;
    this.modalOpen = true;
  }
  giveAuthority(): void {
    this.mod.raiseAuthority = true;
    this.mod.checkPrevPwd = false;
    this.mod.submitNewInfo = false;
    this.modalOpen = true;
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
