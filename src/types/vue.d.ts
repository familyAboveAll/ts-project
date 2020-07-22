import Vue from 'vue'

declare module "vue/types/vue" {
    interface Vue {
      $MessageBox: any;
      $Toast: any;
    }
}