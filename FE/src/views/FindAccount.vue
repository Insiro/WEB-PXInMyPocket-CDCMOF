<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <BaseModal :open="modalOpen" @close="modalClose">
      <div v-show="mod.pwd">
        <div v-show="mod.pwdSuccess">
          수정된 비밀번호가 메일로 전송되었습니다.
        </div>
        <div v-show="!mod.pwdSuccess">해당하는 유저가 존재하지 않습니다.</div>
      </div>
      <div v-show="mod.id">
        <div v-show="mod.idSuccess">당신의 아이디는 <br />{{ lookedID }}</div>
        <div v-show="!mod.idSuccess">정보를 찾지 못 하였습니다</div>
      </div>
    </BaseModal>
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <webIcon />
        <span class="text-2xl font-semibold text-gray-700">회원정보 찾기</span>
      </div>
      <label class="block">
        <span class="text-sm text-gray-700"> ID 찾기 </span>
        <TextInput
          v-model="lostID"
          placeholder="20-123456789"
          input_type="text"
          :value="lostID"
          :class="inputStyle"
          @updates="onLostIdChanged"
        />
        <Button class="w-full px-4 text-sm text-center" @onClick="findID()">
          아이디 확인
        </Button>
      </label>
      <label class="block">
        <span class="text-sm text-gray-700"> 비밀번호 초기화 </span>
        <TextInput
          v-model="lostPWD.id"
          placeholder="20-123456789"
          input_type="text"
          :value="lostPWD.id"
          :class="inputStyle"
          @updates="onLostPwdIdChanged"
        />
        <TextInput
          v-model="lostPWD.email"
          placeholder="example@email.com"
          input_type="email"
          :value="lostPWD.email"
          :class="inputStyle"
          @updates="onLostPwdEmailChanged"
        />
        <Button class="w-full px-4 text-sm text-center" @onClick="resetPwd()">
          비밀번호 초기화
        </Button>
      </label>
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
@Options({
  components: { TextInput, webIcon, CheckBox, Button, Radio, BaseModal },
})
export default class Regist extends Vue {
  router = useRouter();
  //모달 트리거
  mod = {
    pwd: false,
    id: false,
    idSuccess: false,
    pwdSuccess: false,
  };
  lookedID = "";
  lostPWD = {
    id: "",
    email: "",
  };
  lostID = "";
  //#region Style
  inputStyle = ref("block rounded-md w-full ");
  //#endregion Style
  modalOpen: boolean = false;

  //#region Item Event
  async findID(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var result: any = await UserState.findID(this.lostID);
    if (result.data.findIdSuccess) {
      this.mod.idSuccess = true;
      this.lookedID = result.data.foundID;
    } else {
      this.mod.idSuccess = false;
    }
    this.mod.id = true;
    this.mod.pwd = false;
    this.modalOpen = true;
  }

  async resetPwd(): Promise<void> {
    try {
      var result: any = await UserState.resetPwd(this.lostPWD);
      console.log(result);
      if (result.data.changePwdSuccess) {
        this.mod.pwdSuccess = true;
      } else {
        this.mod.pwdSuccess = false;
      }
      this.mod.id = false;
      this.mod.pwd = true;
      this.modalOpen = true;
    } catch (e) {
      console.log(e);
    }
  }
  modalClose(): void {
    this.modalOpen = false;
  }
  onLostIdChanged(date: string): void {
    this.lostID = date;
  }
  onLostPwdIdChanged(name: string): void {
    this.lostPWD.id = name;
  }
  onLostPwdEmailChanged(data: string): void {
    this.lostPWD.email = data;
  }
  //#endregion Item Event
}
</script>
