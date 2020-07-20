import Vue from 'vue';
import Store from './store';
import {
    Constructor,
} from './types';
import { defineReactive } from './install';
import { Route } from 'vue-router';

const skipProperty = [
    'subs',
    'init',
    'destroy',
];

function isSkipProperty(key: string) {
    return key.startsWith('$')
        || key.startsWith('$$')
        || key.endsWith('$')
        || skipProperty.includes(key);
}

export class BaseModel {
    protected readonly $vm: Vue;
    protected readonly $route!: Route;
    private readonly $store: Store;
    private $$userProperties: Array<keyof this> = [];
    [key: string]: any;
    constructor(
        vm: Vue,
        store: Store,
    ) {
        this.$vm = vm;
        this.$store = store;
        // 保证每次获取都是响应式
        Object.defineProperty(this, '$route', {
            get() {
                return vm.$route;
            },
        });
    }

    private $$autoBind() {
        for (const key of this.$$userProperties) {
            if (typeof this[key] === 'function') {
                this[key] = (this[key] as unknown as Function).bind(this);
            }
        }
    }

    init<ModelType extends BaseModel>() {
        this.$$collectProperties();
        this.$$initState();
        this.$$autoBind();
    }

    private $$addProperty(keys: Array<keyof this>) {
        for (const key of keys) {
            if (!isSkipProperty(key as string)) {
                this.$$userProperties.push(key);
            }
        }
    }

    private $$collectProperties() {
        // 处理自身属性
        this.$$addProperty(Object.keys(this) as Array<keyof this>)
        // 处理原型链
        let proto = Object.getPrototypeOf(this);
        while (proto && proto !== Object.prototype) {
            this.$$addProperty(Object.keys(proto) as Array<keyof this>)
            proto = Object.getPrototypeOf(proto);
        }
    }

    private $$initState() {
        for (const key of this.$$userProperties) {
            if (typeof this[key] !== 'function') {
                makeObservable(this, key);
            }
        }
    }

    getModelInstanceFromStore<T extends BaseModel>(Ctor: Constructor<T>) {
        const storeModelInstance = this.$store.getModelInstance(Ctor);
        return storeModelInstance?.instance;
    }
}

function makeObservable<T extends BaseModel>(model: T, key: keyof T) {
    let observerListener: any;
    const initialValue = model[key];

    defineReactive(model, key as string, initialValue, () => {
        Promise.resolve().then(() => {
            if (observerListener) {
                observerListener.next(model[key]);
            }
        });
    });
}
