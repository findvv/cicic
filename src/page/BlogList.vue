<template>
    <div>
        <blog-nav nav="4" @isLogin="login" />
        <div class="div">
            <div class="flex div4">
                <div class="flex">
                    <img src="../assets/3.png" height="12" width="58" class="icon1" />
                    <p class="p1">{{wenzi.p1}}</p>
                </div>
                <p class="p2">{{wenzi.p2}}</p>
            </div>
            <div>
                <div :class="['flex','article',index % 2 == 0 ? 'article-1' : 'article-2']" v-for="(item,index) in list">
                    <a :href="`/article/${item.id}`" class="title">{{item.title}}</a>
                    <span>{{item.time}}</span>
                    <a href="javascript:;" class="edit" v-show="isLogin" @click="edit(item.id)">编辑</a>
                    <a href="javascript:;" @click="deleteArticle(item.id)" class="delete" v-show="isLogin">删除</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BlogNav from '../components/BlogNav';
    import axios from 'axios';
    export default {
        components: {
            BlogNav
        },
        data() {
            return {
                wenzi: {
                    "p1": "文字",
                    "p2": "The World Of Luffy"
                },
                isLogin: false,
                list: []
            }
        },
        mounted() {
            let id = window.localStorage.loginUser,
                pwd = window.localStorage.loginPwd,
                that = this;

            axios({
                method: 'get',
                url: `/getArticleList`,
            }).then((data)=>{
                let result = data.data.data;

                this.list = result;
            });
        },
        methods: {
            login() {
                this.isLogin = true;
            },
            deleteArticle(id) {
                let r = window.confirm("确定删除吗？");

                if (!r) {
                    return;
                }
                this.isLogin && axios.post('/deleteArticle', {
                   id
                }).then(()=>{
                    window.location.reload();
                });
            },
            edit(id) {
                axios({
                    method: 'get',
                    url: `/getArticle/${id}`,
                }).then((data)=>{
                    let result = data.data.data;

                    window.localStorage.setItem('blogTitle', result.title);
                    window.localStorage.setItem('blogContent', result.content);
                    window.localStorage.setItem('blogValue', result.mdValue);
                    window.localStorage.setItem('blogId', id);
                    window.location.href = '/bigandaiwochuangtianxia';
                });
            }
        }
    }
</script>

<style scoped>
    .div {
        width: 1160px;
        margin: 30px auto 60px;
        padding: 30px 0 60px;
        background-color: #fff;
    }
    .div4 {
        padding: 0 20px 16px;
        border-bottom: 1px solid #e1e1e1;
    }
    .p1 {
        font-size: 24px;
        color: #333333;
        margin-left: 10px;
    }
    .p2 {
        font-size: 16px;
        color: #d7d7d7;
        font-style: italic;
    }
    .article a {
        color: #666666;
        font-size: 16px;
    }
    .title {
        flex: 1;
    }
    .article {
        padding: 0 18px;
        height: 45px;
        color: #666666;
    }
    .article span {
        color: #666666;
        margin-left: 50px;
        font-size: 12px;
        margin-right: 20px;
    }
    .article a:hover {
        color: #666699;
        text-decoration: none;
    }
    .article-1 {
        background-color: #fff;
    }
    .article-2 {
        background-color: #f6f6f6;
    }
    .article .edit {
        font-size: 12px;
        color: rgba(0,0,0,.4);
        margin-right: 10px;
    }
    .article .delete {
        font-size: 12px;
        color: rgba(0,0,0,.4);
    }
</style>