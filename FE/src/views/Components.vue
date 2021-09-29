<template>
  <div>
    <h2 class="text-3xl font-medium text-gray-700">components</h2>
    <ComponentFrame title="page nation">
      <PageNation />
    </ComponentFrame>
    <ComponentFrame title="checkbox">
      <CheckBox text="checkbox" name="checkbox" />
    </ComponentFrame>
    <ComponentFrame title="inputForm">
      <TextInput><icon-search /></TextInput>
    </ComponentFrame>
    <ComponentFrame title="radio"> <Radio /> </ComponentFrame>
    <Button><router-link to="/signIn">goto SignIn</router-link></Button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import PageNation from "@/components/PageNation";
import { CheckBox, TextInput, Radio } from "@/components/Inputs";
import { Button } from "@/components/Button";
import ComponentFrame from "@/components/CardFrame/ComponentsFrame.vue";
import { IconSearch } from "@/components/Icons";
@Options({
  components: {
    TextInput,
    PageNation,
    ComponentFrame,
    CheckBox,
    IconSearch,
    Radio,
    Button,
  },
})
export default class Components extends Vue {}
</script>
