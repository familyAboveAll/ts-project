<template>
  <div class="hello">
    <p v-for="(item, index) in orderList" :key="index">{{ item }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Models, Vue } from '@/utils/vue-decorators';
import OrderModel from './model'

@Component
export default class Order extends Vue {
  @Models(OrderModel)
  orderModel!: OrderModel;

  get orderList() {
    return this.orderModel.orderList;
  }

  mounted() {
    console.log(this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
