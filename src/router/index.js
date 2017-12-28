import Vue from 'vue'
import Router from 'vue-router'
import Shouye from '@/page/Shouye';
import Zuopin from '@/page/Zuopin';
import Write from '@/page/Write';
import BlogArticle from '@/page/BlogArticle';
import BlogList from '@/page/BlogList';
import MusicConfig from '@/page/MusicConfig';
import ZuopinConfig from '@/page/ZuopinConfig';
import ErrorPage from '@/page/ErrorPage';
import Xiangmu from '@/page/Xiangmu';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { 
          path: '*', 
          component: ErrorPage 
        },
        {
          path: '/',
          component: Shouye
        },
        {
          path: '/zuopin',
          component: Xiangmu
        },
        {
          path: '/zuopin/:id',
          component: Zuopin
        },
        {
          path: '/article',
          component: BlogList,
        },
        {
          path: '/bigandaiwochuangtianxia',
          component: Write
        },
        {
          path: '/bigandaiwochuangtianxia/:id',
          component: Write
        },
        {
          path: '/article/:id',
          component: BlogArticle
        },
        {
          path: '/musicconfig',
          component: MusicConfig
        },
        {
          path: '/zuopinconfig',
          component: ZuopinConfig
        }
    ]
})
