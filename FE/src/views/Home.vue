<template>

</template>

<script lang="ts">
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";
import { Table, TableItem, TableHead } from "@/components/Table";
import { CheckBox, CheckBoxEmit } from "@/components/Inputs";
import CartState from "@/store/Cart";
import { Button } from "@/components/Button";
import  ComponentsFrame  from "@/components/CardFrame";
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
