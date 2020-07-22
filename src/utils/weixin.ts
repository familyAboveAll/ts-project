// @ts-nocheck
import Vue from 'vue';
import wx from 'weixin-js-sdk';
import http from './http'
const weixin = {
    isWxWebView() {
        const arr = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
        if (arr && arr.length > 0 && arr[0] === 'micromessenger') {
            return true;
        }
        return false;

    },
    init(callback: Function) {
        const req = {
            // 'action': 'js_signature',
            type: 'thunder',
            url: window.location.href.replace(/#.*$/, ''),
        };
        // http.get(`${apis.initWx}?param=` + encodeURIComponent(JSON.stringify(req))).then(function (res) {
        http.get(apis.initWx, {
            params: req,
        }).then(function (res) {
            try {
                wx.config({
                    debug: false,
                    appId: res.appId,
                    timestamp: Number(res.timestamp),
                    nonceStr: res.nonceStr,
                    signature: res.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'chooseImage',
                        'uploadImage',
                        'scanQRCode',
                        'startRecord',
                        'stopRecord',
                        'chooseWXPay',
                        'getLocation',
                        'openLocation',
                        'getLocalImgData',
                    ],
                });
                wx.ready(function () {
                    wx.checkJsApi({
                        jsApiList: [
                            'chooseImage',
                            'scanQRCode',
                            'chooseWXPay',
                            'getLocation',
                            'getLocalImgData',
                        ],
                        success: function (res) {
                            callback && callback();
                        },
                        failed: function (err) {
                            console.log('失败', err);
                        },
                        complete: function () { },
                    });
                });
                wx.error(res => {
                });
            } catch (g) {
                // console.log(g);
            }
            const loading = document.getElementById('loading');
            loading.style.display = 'none';
            store.commit('CHANGE_HOME_BOTTOM_AD', true);
        }).catch(function (error) {
            console.log(error);
        });
    },
    async wxPay(params: {[key: string]: any}, url: '', elseData: {[key: string]: any}) {
        const res: any = await http.post(url, params)
        res.errcode = Number(res.errcode);
        if (res.errcode === 200) {
            wx.chooseWXPay({
                timestamp: res.pay.jspay.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: res.pay.jspay.nonceStr, // 支付签名随机串，不长于 32 位
                package: res.pay.jspay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: res.pay.jspay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: res.pay.jspay.paySign, // 支付签名
                fail: function () {
                    Vue.$messageBox.alert('支付失败', '');
                },
                success: function (res) {
                    // 支付成功后的回调函数
                    if (res.errMsg === 'chooseWXPay:ok') {
                        elseData.callback() === 'function' && elseData.callback();
                    } else {
                        Vue.$messageBox.alert('支付失败', '');
                    }
                },
                cancel: function (res) {
                    // 支付取消回调函数
                    Vue.$messageBox.alert('支付取消', '');
                },
            });
        }
    }
};

export default weixin;
