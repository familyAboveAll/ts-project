// 封装http请求
// @ts-nocheck
import axios from 'axios';
// @ts-ignore
import qs from 'qs';

const http = axios.create({
    baseURL: '',
    timeout: 15000,
});
http.interceptors.request.use((config: any) => {
    // 请求头里面加入各种判断
    if (config.method === 'post' && config.data && config.data.constructor !== FormData) {
        const urlArr = ['']
        let useJson = false;
        for (const i in urlArr) {
            if (config.url.includes(urlArr[i])) {
                useJson = true;
                break;
            }
        }
        if (!useJson) {
            config.data = qs.stringify(config.data);
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
    }
    return config;
}, error => {
    // 拦截请求错误
    // Vue.$toast(error.errmsg);
    Promise.reject(error);
});

export default http;
