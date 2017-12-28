<template>
    <div>
        <blog-nav :nav="index" />
        <slider :pages="pages" :sliderinit="sliderinit" />
        <div class="wrap">
            <blog-item v-for="(item,index) in items" :key="index" :title="item.title" :subtitle="item.subtitle" :link="item.link" :imgs="item.imgs" />
            <div>
                <a :class="['flex','article',index % 2 == 0 ? 'article-1' : 'article-2']" :href="`/article/${item.id}`" v-for="(item,index) in list">
                    <span>{{item.title}}</span>
                    <span>{{item.time}}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import BlogNav from '../components/BlogNav';
import BlogItem from '../components/BlogItem';
import slider from 'vue-concise-slider';
import axios from 'axios';
import * as json from '../data/shouye';
import * as lunbo from '../data/lunbo';
export default {
    components: {
        BlogNav,
        BlogItem,
        slider
    },
    data () {
        let pages = (()=>{
            let result = [],
                {height,list} = lunbo;

            for(let value of list) {
                let obj = {};

                obj["style"] = {
                    height,
                    background: `url(${value})`
                };
                result.push(obj);
            }
            return result;
        })();
        return {
            index: 0,
            items: json,
            pages,
            //滑动配置[obj]
            sliderinit: {
                currentPage: 0,//当前页码
                thresholdDistance: 500,//滑动判定距离
                thresholdTime: 300,//滑动判定时间
                autoplay:5000,//自动滚动[ms]
                loop:true,//循环滚动
                direction:'horizontal',//方向设置，垂直滚动
                infinite:1,//无限滚动前后遍历数
                slidesToScroll:1,//每次滑动项数
            },
            list: [],
            id: this.$route.params.id
        }
    },
    mounted() {
        axios({
            method: 'get',
            url: `/getArticleList`,
        }).then((data)=>{
            let result = data.data.data;

            this.list = result.slice(0,5);
        });
    }
}
</script>

<style scoped>
    .wrap {
        padding-bottom: 80px;
    }
    .article {
        padding: 0 18px;
        height: 45px;
        color: #666666;
    }
    .article:hover {
        color: #000;
    }
    .article-1 {
        background-color: #fff;
    }
    .article-2 {
        background-color: #f6f6f6;
    }
    .article span {
        font-size: 16px;
    }
</style>
