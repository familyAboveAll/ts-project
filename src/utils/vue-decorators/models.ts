import {BaseModel} from '@/packages/vue-model/model';
import {createDecorator, VueDecorator} from 'vue-class-component';

export default function vueModels(modelCotr: typeof BaseModel): VueDecorator {
    return createDecorator((componentOptions, k: string) => {
        componentOptions.models = componentOptions.models || ({} as any);
        componentOptions.models[k] = modelCotr;
        console.log(componentOptions)
    });
}