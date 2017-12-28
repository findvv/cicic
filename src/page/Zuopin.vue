<template>
    <div>
        <blog-nav :nav="index" @isLogin="isLogin"/>
        <blog-list :value="data" type="1" :list="list" :id="id" :login="login" :fimg="fImg" @setFimg="setFimg"/>
    </div>
</template>

<script>
import BlogNav from '../components/BlogNav';
import BlogList from '../components/BlogList';
import axios from 'axios';
export default {
    components: {
        BlogNav,
        BlogList
    },
    data () {
        return {
            login: '0',
            fImg: '',
            data: {},
            list: [],
            index: 1,
            id: this.$route.params.id
        }
    },
    mounted() {
        let {id} = this;

        if (id == 'huitu') {
            this.index = 2;
        }
        if (id == 'shouhui') {
            this.index = 3;
        }
        axios.get(`/getItemInfo?name=${id}`).then((res)=>{
            if (res.data.error == 1) {
                window.location.href = '/static/404.html';
            } else {
                let {title,enTitle,cImgs,fImg} = res.data.data;

                this.data = {
                    p1: title,
                    p2: enTitle
                };
                this.fImg = fImg;
                this.list = (()=>{
                    let arr = cImgs.split('$$$'),
                        newArr = [];

                    for(let value of arr) {
                        let obj = {};
                        obj.img = value;
                        newArr.push(obj);
                    }
                    return newArr;
                })();
            }
            
        });
    },
    methods: {
        setFimg(img) {
            this.fImg = img;
        },
        isLogin() {
            this.login = '1';
        }
    }
}
</script>
<style scoped>

</style>
