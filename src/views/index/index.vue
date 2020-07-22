<template>
  <div class="order">
    <TimeList></TimeList>
    <button class="weui-btn weui-btn_primary pay-btn">支付</button>
    <div class="search">订单查询</div>
  </div>
</template>

<script lang="ts">
import { Component, Models, Vue } from '@/utils/vue-decorators';
// import OrderModel from './model'
import TimeList from './components/time_list.vue'

@Component({
  components: {
      TimeList
  }
})
export default class Order extends Vue {
  created () {
    // this.$toast({
    //   message: 'hello word',
    //   time: 3000
    // })
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
.order
  height 100vh
  background #f2f2f2
  padding 150px 20px 0px
.pay-btn
  margin-top 100px
.search
  margin-top 30px
  font-size 28px
  text-align center
  color #07c160
</style>
