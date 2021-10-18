<template>
  <div>
    <h2 class="text-3xl font-medium text-gray-700">components</h2>
    <WideFrame title="page nation">
      <PageNation />
    </WideFrame>
    <WideFrame title="checkbox">
      <CheckBox text="checkbox" name="checkbox" />
    </WideFrame>
    <WideFrame title="radio"> <Radio /> </WideFrame>
    <Button><router-link to="/signIn">goto SignIn</router-link></Button>
    <Card
      title="Card"
      src="https://upload.wikimedia.org/wikipedia/commons/7/70/Logo_Apple.inc.gif"
      :hash_tags="['components']"
    ></Card>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import PageNation from "@/components/PageNation";
import { CheckBox, TextInput, Radio } from "@/components/Inputs";
import { Button } from "@/components/Button";
import Card, { WideFrame } from "@/components/CardFrame";
@Options({
  components: {
    TextInput,
    PageNation,
    WideFrame,
    CheckBox,
    Radio,
    Button,
    Card,
  },
})
export default class Components extends Vue {}
</script>
