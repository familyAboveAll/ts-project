<template>
  <div>
    <div v-for="(item, index) in orderList" :key="index" class="order-list" :class="current===index && 'active'" @click="changeCurrent(index)">
      <span>{{item.time}}分钟&nbsp;&nbsp;</span>
      <span v-if="item.price">{{item.price}}元</span>
      <span v-else>(试用)</span>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Models, Vue } from '@/utils/vue-decorators';
  import OrderModel from '../model'

  @Component
  export default class TimeList extends Vue {
    @Models(OrderModel)
    orderModel!: OrderModel;
    current: Number = 0
    get orderList() {
      return this.orderModel.orderList
    }
    changeCurrent (index: number) {
      this.current = index
    }
  }
</script>
<style scoped lang="stylus">
.order-list
  width 500px
  height 100px
  text-align center
  line-height 100px
  color #06ae56
  background #fff
  margin 0 auto 40px
  border-radius 4px
.active
  color #fff
  background #07c160   
</style>