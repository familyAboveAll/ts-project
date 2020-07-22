import Vue from 'vue';
import MessageBox from '@/components/dialog/index';
Vue.mixin({
    methods: {
        $MessageBox(option: any) {
            return MessageBox.apply(this, [option])
        }
    }
});