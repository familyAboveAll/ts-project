<template>
  <ul class="weui-cells">
    <li v-for="(item, index) in orderList" :key="index" class="weui-cell">
        <div class="weui-cell__bd">
            <span>A101</span>
            <span>服务时间：20:00 ～ 02:00</span>
        </div>
        <div class="weui-cell__ft">
            <div class="weui-btn weui-btn_mini weui-btn_default" @click="handleClickReboot(item)">重新激活</div>
        </div>
    </li>
</ul>
</template>

<script lang="ts">
import { Component, Models, Vue } from '@/utils/vue-decorators';
import ListModel from '../model'
import UserModel from '@/models/user'
@Component
export default class List extends Vue {
    @Models(ListModel) ListModel!: ListModel;
    @Models(UserModel) UserModel!: UserModel;
    
    get orderList () {
        return this.ListModel.orderList
    }

    handleClickReboot (item: any) {
        this.$MessageBox({
            content: '激活成功',
            $type: 'confirm',
            cancelButtonText: '关闭'
        })
        .then(() => {
            console.log('点击确认按钮')
        })
    }
    created () {
        this.ListModel.fetchList(this.UserModel)
    }
}
</script>

<style scoped lang="stylus">
.weui-cell
    &__bd
        span:first-child 
            margin-right 10px
</style>
