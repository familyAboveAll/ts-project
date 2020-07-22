<template>
    <div v-show="value" class="dialog">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div v-if="title" class="weui-dialog__hd"><strong class="weui-dialog__title">{{ title }}</strong></div>
            <div class="weui-dialog__bd">{{ content }}</div>
            <div class="weui-dialog__ft">
                <div class="weui-dialog__btn weui-dialog__btn_primary" @click="handleAction('confirm')">{{ confirmButtonText }}</div>
                <div class="weui-dialog__btn weui-dialog__btn_default" @click="handleAction('cancel')">{{ cancelButtonText }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from '@/utils/vue-decorators';

@Component
export default class Dialog extends Vue {
    @Prop(String) title!: string
    @Prop(String) content!: string
    @Prop(String) confirmButtonText!: string
    @Prop(String) cancelButtonText!: string
    value: any = null
    callback: any = null
    handleAction(action: any) {
        const callback = this.callback;

        if (typeof callback !== 'function') {
            return;
        }

        this.value = false;
        this.callback(action)
    }
}
</script>

<style scoped lang="stylus">
.weui-toast
    height fit-content
    padding 10px 0
</style>
