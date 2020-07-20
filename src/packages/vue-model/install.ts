import Vue, { VueConstructor } from 'vue';

export function defineReactive(obj: object, key: string, val?: any, customSetter?: (val?: any) => void, shallow?: boolean) {
    return Vue.util.defineReactive(obj, key, val, customSetter, shallow);
}

export function install(VueLibrary: VueConstructor) {
    VueLibrary.mixin({
        beforeCreate() {
            // 为了适配小程序，$store去原型上找一下
            const store = this.$root.$options.store
                || this.$root.$options.store
                || this.store;
            const models = this.$options.models;
            if (!models || !store) {
                return;
            }

            Object.keys(models).forEach((key) => {
                const modelCtor = models[key];
                const storeModelInstance = store.registerModel(modelCtor);
                if (!storeModelInstance.count) {
                    const instance = new storeModelInstance.constructor(
                        this.$root,
                        store,
                    );
                    instance.init();
                    storeModelInstance.instance = instance
                }
                storeModelInstance.count++;

                Object.defineProperty(this, key, {
                    get: () => storeModelInstance.instance,
                    configurable: true,
                });
            });
        },
        beforeDestroy(this: Vue) {
            const store = this.$root.$options.store
                || this.$root.$options.store
                || this.store;
            const models = this.$options.models;
            if (!models || !store) {
                return;
            }
            Object.defineProperty(this, '$client', {
                get: () => null,
            });
            Object.keys(models).forEach((key) => {
                const modelCtor = models[key];
                const storeModelInstance = store.getModelInstance(modelCtor);
                if (!storeModelInstance) {
                    return;
                }
                storeModelInstance.count--;
                if (storeModelInstance.count === 0 && storeModelInstance.instance) {
                    storeModelInstance.instance.destroy();
                    storeModelInstance.instance = null;
                }
                Object.defineProperty(this, key, {
                    get: () => null,
                    configurable: true,
                });
            });
        },
    });
}
