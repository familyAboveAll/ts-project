<template>
  <div class="order-list">
    <div class="weui-btn weui-btn_primary" @click="() => this.$router.push('/')">新订单</div>
    <List />
  </div>
</template>

<script lang="ts">
import { Component, Models, Vue } from '@/utils/vue-decorators';
import List from './components/list.vue'
@Component({
    components: {
        List
    }
})
export default class OrderList extends Vue {
}
</script>

<style scoped lang="stylus">
.order-list
    padding-top 20px;
</style>
