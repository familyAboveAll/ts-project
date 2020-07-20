import Vue from 'vue';
import { Route } from 'vue-router';
import { BaseModel } from './model';

export type ContentType = 'application/json'
    | 'multipart/form-data'
    | 'application/x-www-form-urlencoded';


export type Headers = {
    'content-type'?: ContentType;
} & Record<string, any>

export type Method = 'get'
    | 'GET'
    | 'post'
    | 'POST'
    | 'delete'
    | 'DELETE'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH'
    | 'options'
    | 'OPTIONS'
    | 'head'
    | 'HEAD'
    | 'trace'
    | 'TRACE'
    | 'connect'
    | 'CONNECT';

export interface StoreModelInstance<T> {
    constructor: Constructor<T>;
    instance: T | null;
    count: number;
}


declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        models?: any;
        store?: any;
    }
}


declare module 'vue/types/vue' {
    interface Vue {
        store?: any;
    }
    interface VueConstructor {
        util: {
            defineReactive: (
                obj: object,
                key: string,
                val?: any,
                customSetter?: (val?: any) => void,
                shallow?: boolean,
            ) => {};
        };
    }
}

interface ModelInfo<T> {
    constructor: Constructor<T>;
    instance: T;
    count: number;
}

export type ModelMap<T extends typeof BaseModel> = Record<string, ModelInfo<T>>

export type BooleanFn<T> = (this: T, route: Route) => boolean;
export type NumberFn<T> = (this: T, route: Route) => number;
export type UrlFn<T> = (this: T, route: Route, variables: Record<string, any> | undefined) => string;

export type Constructor<T> = new (...args: any[]) => T;