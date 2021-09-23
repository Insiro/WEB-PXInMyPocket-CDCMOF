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
      <TextInput />
    </ComponentFrame>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import PageNation from "@/components/PageNation";
import { CheckBox, TextInput } from "@/components/Inputs";
import ComponentFrame from "@/components/ComponentsFrame.vue";

@Options({ components: { TextInput, PageNation, ComponentFrame, CheckBox } })
export default class Home extends Vue {}
</script>
