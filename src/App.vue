<template>
  <div id="app">
    <router-view :key="$route.fullpath"/>
  </div>
</template>
<script lang="ts">
import { Component, Models, Vue } from '@/utils/vue-decorators';
import UserModel from '@/models/user'
@Component
export default class App extends Vue  {
  @Models(UserModel) UserModel!: UserModel;
  created() {
    this.UserModel.getOpenID()
  }
}
</script>
<style lang="stylus">
</style>
