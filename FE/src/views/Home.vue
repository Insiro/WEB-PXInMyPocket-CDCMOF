<template>
        <div class="mt-6">
          <Button
            class="w-full px-4 text-sm text-center"
            @onClick="router.push('/changeInfo')"
          >
            개인 정보 수정
          </Button>
        </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Options, Vue } from "vue-class-component";
import { Table, TableItem, TableHead } from "@/components/Table";
import { CheckBox, CheckBoxEmit } from "@/components/Inputs";
import CartState from "@/store/Cart";
import { Button } from "@/components/Button";
import ComponentsFrame from "@/components/CardFrame";
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
export default class Carts extends Vue {
	router = useRouter();
}

</script>
