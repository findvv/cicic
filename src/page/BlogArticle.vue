<template>
    <div class="blog-article">
        <blog-nav nav="4" />
        <div class="wrap content">
            <div class="title">{{title}}</div>
            <div class="previewContainer markdown-body" v-html="content"></div>
        </div>
    </div>
</template>

<script>
    import BlogNav from '../components/BlogNav';
    import marked from 'marked';
    import hljs from '../../static/js/highlight.min.js';
    import axios from 'axios';
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        highlight: function(code) {
            return hljs.highlightAuto(code).value
        }
    });
    
    export default {
        components: {
            BlogNav
        },
        data() {
            let id = this.$route.params.id || 0;

            return {
                id,
                title: '标题',
                content: '内容'
            }
        },
        mounted() {
            let {id} = this;

            axios({
                method: 'get',
                url: `/getArticle/${id}`,
            }).then((data)=>{
                if (data.data.error == 1) {
                    window.location.href = '/static/404.html';
                } else {
                    let result = data.data.data;
                    this.title = result.title;
                    this.content = result.content;
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    .blog-article {
        .title {
            text-align: center;
            font-size: 24px;
            line-height: 50px;
            color: #000;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .content img {
            width: 100%;
        }
        .content {
            margin: 50px auto;
            padding: 30px;
            background-color: #fff;
        }
        .previewContainer {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            background: #fff;
            overflow: auto;
            padding: 10px;
        }
    }
</style>