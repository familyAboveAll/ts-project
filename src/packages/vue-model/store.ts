import { StoreModelInstance, Constructor } from './types';
import { BaseModel } from './model';

export default class Store {
    private modelMap = new Map();
    constructor() {}
    getModelInstance<T extends BaseModel>(constructor: Constructor<T>) {
        return this.modelMap.get(constructor) as StoreModelInstance<T> | undefined;
    }

    registerModel<T extends BaseModel>(constructor: Constructor<T>) {
        if (this.modelMap.has(constructor)) {
            return this.modelMap.get(constructor)! as StoreModelInstance<T>;
        }
        const storeModelInstance: StoreModelInstance<T> = {
            constructor,
            instance: null,
            count: 0,
        };
        this.modelMap.set(constructor, storeModelInstance);
        return storeModelInstance as StoreModelInstance<T>;
    }
}