<template>
  <div
    class="flex flex-grow flex-row content-center items-center mx-auto mx-10"
  >
    <div class="mx-30 px-10" style="width: 1rem" />
    <Button class="" @onClick="regist"
      ><router-link to="/regist">회원 가입</router-link></Button
    >

    <div class="mx-30 px-10" style="width: 1rem" />
    <Button class="" @onClick="login"
      ><router-link to="/reset">ID/비밀번호 찾기</router-link></Button
    >
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";
import { Table, TableItem, TableHead } from "@/components/Table";
import { CheckBox, CheckBoxEmit } from "@/components/Inputs";
import CartState from "@/store/Cart";
import { Button } from "@/components/Button";
import { ComponentsFrame } from "@/components/CardFrame";
@Options({
  components: {
    Table,
    TableItem,
    TableHead,
    CheckBox,
    ComponentsFrame,
    Button,
  },
})
export default class Carts extends Vue {}
</script>
