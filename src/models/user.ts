// @ts-nocheck
import { BaseModel } from '@/packages/vue-model';
import Cookies from 'js-cookie';
import utils from '@/utils/index'

export default class UserModel extends BaseModel {
    openid = ''
    unionid = ''
    saveOpenid (payload: string) {
        this.openid = payload
    }
    saveUnionid (payload: string) {
        this.unionid = payload
    }
    getOpenID(fullPath?: string) {
        // 用户openid，只跟当前公众号相关
        const openid = utils.getUrlPrem('openid') || Cookies.get('openid') || this.openid;
        // 用户unionid，用户唯一ID，不随公众号变化
        const unionid = utils.getUrlPrem('unionid') || Cookies.get('unionid') || this.unionid;
        console.log(openid, unionid)
        if (openid && unionid) {
            Cookies.set('openid', openid, {
                expires: 30,
            });
            Cookies.set('unionid', unionid, {
                expires: 30,
            });
            this.saveOpenid(openid)
            this.saveUnionid(unionid)
        } else {
            const ua = navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
            // 正则判断机型  不是手机浏览器就不去授权 便于调试
            if (ua && ua[0] === 'micromessenger') {
                window.location.replace('http://m.stage.ktvsky.com' + '/vod/p/redirect/v2' + fullPath);
            }
        }
    }
}
