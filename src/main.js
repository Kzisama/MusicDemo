import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/mobile/flexible'  // 适配
import '@/styles/reset.css' // 初始化样式

import {recommendMusicAPI} from '@/api';
//
// async function fn () {
//     const res = await recommendMusicAPI ({limit: 6})
//     console.log (res)
// }
//
// fn ()

Vue.config.productionTip = false

import {Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage, Cell, CellGroup, Icon, Search, List} from 'vant';

Vue.use (Icon)
Vue.use (Tabbar);
Vue.use (TabbarItem);
Vue.use (NavBar);
Vue.use (Col);
Vue.use (Row);
Vue.use (VanImage);
Vue.use (Cell);
Vue.use (CellGroup);
Vue.use (Search);
Vue.use (List);

// 让vant组件库自动适配
// 将px转换成rem（以后就可以直接写px）， webpack配合postcss和postcss-pxtorem插件，就可以自动将px转换成rem
// 1.下载postcss和postcss-pxtorem插件
// 2.postcss.config.js 配置基准值
// 3.重启服务器

new Vue ({
    router,
    store,
    render: h => h (App)
}).$mount ('#app')
