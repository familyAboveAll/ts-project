/* eslint-disable */
// @ts-nocheck
import MessageVue from '@/components/dialog/index.vue';
import Vue from 'vue';


const CONFIRM_TEXT = '确定';
const CANCEL_TEXT = '取消';
const defaults = {
    title: '',
    message: '',
    type: '',
    confirmButtonText: CONFIRM_TEXT,
    cancelButtonText: CANCEL_TEXT
};

// 一个遍历参数的合集
const merge = function (target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
        const source = arguments[i];
        for (const prop in source) {
            if (source.hasOwnProperty(prop)) {
                const value = source[prop];
                // eslint-disable-next-line
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }
    return target;
};

const MessageBoxConstructor = Vue.extend(MessageVue); // 创造一个构造器，为了创建可复用组件
let currentMsg = null;
let instance = null;
let msgQueue = [];

const defaultCallback = action => {
    if (currentMsg) {
        const callback = currentMsg.callback;
        if (typeof callback === 'function') {
            callback(action);
        }
        if (currentMsg.resolve) {
            const $type = currentMsg.options.$type;
            if ($type === 'confirm' || $type === 'prompt') {
                if (action === 'confirm') {
                    currentMsg.resolve(action);
                } else if (action === 'cancel' && currentMsg.reject) {
                    currentMsg.reject(action);
                }
            } else {
                currentMsg.resolve(action);
            }
        }
    }
};
const initInstance = function () {
    instance = new MessageBoxConstructor({
        el: document.createElement('div'),
    });

    instance.callback = defaultCallback;
};

const showNextMsg = function () {
    if (!instance) {
        initInstance();
    }

    if (!instance.value || instance.closeTimer) {
        if (msgQueue.length > 0) {
            currentMsg = msgQueue.shift();

            const options = currentMsg.options;
            for (const prop in options) {
                if (options.hasOwnProperty(prop)) {
                    instance[prop] = options[prop];
                }
            }
            // eslint-disable-next-line
            if (options.callback === undefined) {
                instance.callback = defaultCallback;
            }
            document.body.appendChild(instance.$el);
            Vue.nextTick(() => {
                instance.value = true;
            });
        }
    }
};
const MessageBox = function (options, callback: any = null) {
    if (typeof options === 'string') {
        options = {
            title: options,
        };
        if (arguments[1]) {
            options.message = arguments[1];
        }
        if (arguments[2]) {
            options.type = arguments[2];
        }
    } else if (options && options.callback && !callback) {
        callback = options.callback;
    }
    if (typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) { // eslint-disable-line
            msgQueue.push({
                options: merge({}, defaults, MessageBox.defaults || {}, options),
                callback: callback,
                resolve: resolve,
                reject: reject,
            });
            showNextMsg();
        });
    }
    msgQueue.push({
        options: merge({}, defaults, MessageBox.defaults || {}, options),
        callback: callback,
    });
    showNextMsg();
};

export default MessageBox;
export { MessageBox };