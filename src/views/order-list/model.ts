import { BaseModel } from '@/packages/vue-model';
import http from '@/utils/http'

export default class OrderModel extends BaseModel {
    orderList = [1, 2, 3, 4, 5, 6, 7, 7, 7, 7]
    fetchList (payload: any) {
        const params = {
            ktvid: '',
            open_id: payload.openid,
            union_id: payload.unionid,
            code: ''
        }
        console.log(params)
        // http.get('/copyright/order/list', { params })
        //     .then(res => {
        //         console.log(res)
        //     })
    }
}
