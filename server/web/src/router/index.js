import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/Home/index'
Vue.use(Router)

//导入路由
import CIRouter from "./CIRouter";
import adminRouter from "./adminRouter";
import toolRouter from "./toolRouter";
import procedureRouter from "./procedureRouter";
import resourcesRouter from "./resourcesRouter";
let routes = [{
  path: '/',
  name: 'home',
  component: index
}, ...CIRouter, ...adminRouter, ...toolRouter,...procedureRouter,...resourcesRouter];

export default new Router({
  routes
})
