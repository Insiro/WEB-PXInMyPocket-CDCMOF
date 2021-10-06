<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <webIcon />
        <span class="text-2xl font-semibold text-gray-700">로그인</span>
      </div>

      <form class="mt-4" @submit.prevent="login">
        <label class="block">
          <span class="text-sm text-gray-700">Email</span>
          <TextInput
            v-model="sign.email"
            placeholder="email@example.com"
            input_type="email"
            :value="sign.email"
            :class="inputStyle"
            @updates="onEmailChanged"
          />
        </label>
        <label class="block mt-3">
          <span class="text-sm text-gray-700">Password</span>
          <TextInput
            placeholder="****"
            input_type="password"
            :value="sign.password"
            :class="inputStyle"
            @updates="onPwdChanged"
          />
        </label>

        <div class="flex items-center justify-between mt-4">
          <div>
            <label class="inline-flex items-center">
              <CheckBox value="save" :checked_value="save" @updates="toggleSave"
                >Remember Me</CheckBox
              ><!--TODO: set  remomber sign-in info-->
            </label>
          </div>

          <div>
            <router-link
              class="block text-sm text-indigo-700 fontme hover:underline"
              to="/reset"
            >
              Forgot your password?
            </router-link>
          </div>
        </div>
        <div class="mt-6">
          <Button class="w-full px-4 text-sm text-center" @onClick="login"
            >Sign In
          </Button>
        </div>
        <div class="mt-6">
          <Button
            class="w-full px-4 text-sm text-center"
            @onClick="router.push('regist')"
            >regist
          </Button>
        </div>
        <div class="mt-6">
          <Button
            class="w-full px-4 text-sm text-center"
            @onClick="router.push('finduser')"
            >ID/비밀번호 찾기
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
import { TextInput, CheckBox, CheckBoxEmit } from "@/components/Inputs";
import { Button } from "@/components/Button";
import { webIcon } from "@/components/Icons";
import UserState from "@/store/User";
@Options({
  components: { TextInput, webIcon, CheckBox, Button },
})
export default class SignIn extends Vue {
  router = useRouter();
  sign = {
    email: "",
    password: "",
  };
  save: boolean = false;
  inputStyle = ref("block rounded-md w-full ");
  created(): void {
    this.save = localStorage.getItem("save_sign_data") === "true";
    if (this.save) {
      this.sign.email = localStorage.getItem("saved_email") ?? "";
      this.sign.password = localStorage.getItem("saved_pwd") ?? "";
    }
  }
  login(): void {
    const result = UserState.signIn(this.sign.email, this.sign.password);
    if (result) {
      this.router.push("/");
    } else {
      //TODO: alert wrong passwod
    }
  }
  //#region Item Event
  onEmailChanged(data: string): void {
    this.sign.email = data;
  }
  onPwdChanged(data: string): void {
    this.sign.password = data;
  }
  toggleSave(data: CheckBoxEmit): void {
    this.save = data.checked;
  }
  //#endregion Item Event
}
</script>
