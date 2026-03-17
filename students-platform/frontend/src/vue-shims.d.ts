
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module '*.css';

declare module '*.scss';
declare module '*.sass';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module 'vuetify/styles';
