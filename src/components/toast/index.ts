import ToastModel from '@/components/toast/index.vue';
import Vue from 'vue';
const ToastConstructor: any = Vue.extend(ToastModel);// toast就是vue模版
const getIntance = () => {// 通过构造器获取实例
    return new ToastConstructor({
        el: document.createElement('div'),
    });
};
const removeDom = (e: Event) => {
    const targetNode = <HTMLElement>(<HTMLElement>e.target);
    const targetParentNode = e.target && (targetNode.parentNode);
    if (targetParentNode) {
        targetParentNode.removeChild(targetNode);
    }
};
const Toast = (options: {[key: string]: any} | string) => {
    const intance = getIntance();
    document.body.appendChild(intance.$el);
    
    intance.message = typeof options === 'object' ? options.message : options
    if (typeof options === 'object') {
      intance.time = options.time
    }
    // intance.imgUrl = options.imgUrl;
    // intance.callback = options.callback;
    intance.$el.addEventListener('transitionend', removeDom);
    return intance;
};
export default Toast;
