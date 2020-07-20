import Component from 'vue-class-component';

Component.registerHooks([
    'models',
    'beforeRouteEnter',
    'beforeRouteUpdate',
    'beforeRouteLeave'
]);

export default Component;
