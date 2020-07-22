import { BaseModel } from '@/packages/vue-model';
export default class OrderModel extends BaseModel {
    orderList = [{
      time: 15,
      price: 0,
      id: 1,
    },{
      time: 360,
      price: 8,
      id: 2,
    }]
}
