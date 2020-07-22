<template>
    <div class="toast" v-if="toastShow">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <p class="weui-toast__content">{{ message }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from '@/utils/vue-decorators';

@Component
export default class Toast extends Vue {
    @Prop(String) message!: string
    @Prop({
      default: 1500
    }) time!: number
    timer: any = null
    toastShow: boolean = true
    mounted () {
        this.timer = setTimeout(() => {
            this.toastShow = false
            clearTimeout(this.timer)
        }, this.time);
    }
}
</script>

<style scoped lang="stylus">
.weui-toast
    height fit-content
    padding 10px 0
</style>
