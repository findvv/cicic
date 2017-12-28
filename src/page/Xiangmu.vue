<template>
    <div>
        <blog-nav :nav="index" @isLogin="isLogin"/>
        <div class="div">
            <div class="flex div4">
                <div class="flex">
                    <img src="../assets/3.png" height="12" width="58" />
                    <p class="p1">项目作品</p>
                </div>
                <div class="flex">
                    <p class="p2">The Project Work</p>
                    <p v-if="canEdit" class="p3">编辑模式：</p>
                    <div :class="['switch',isEdit == 1 ? 'open' : 'close']" @click="clickSwitch" v-if="canEdit">
                        <div></div>
                    </div>
                </div>
            </div>
            <div class="div1 flex-left" v-for="items in getArray(list,3)">
                <a :class="['div2', index > 0 ? 'div-margin' : '',isEdit == 0 ? 'div2-hover' : '']" v-for="(item,index) in items" :href="`/zuopin/${item.subTitle}`" v-if="item.fImg">
                    <p v-show="isEdit == 1" @click="deleteItem(item.subTitle)" class="close-wrap">
                        <span class="close">X</span>
                    </p>
                    <!-- <img :src="item.fImg" class="img" width="358" height="240" /> -->
                    <p class="title">{{item.title}}</p>
                </a>
            </div>
            <a class="add-img" href="/zuopinconfig" v-if="canEdit" v-show="isEdit">
                添加作品
            </a>
        </div>
    </div>
</template>

<script>
import BlogNav from '../components/BlogNav';
import axios from 'axios';
export default {
    props: {
        id: String,
        value: Object,
        list: Array,
        type: {type: String, default: '0'}
    },
    components: {
        BlogNav
    },
    data () {
        return {
            list: [],
            isEdit: 0,
            canEdit: false,
            index: 1
        }
    },
    mounted() {
        axios.get(`/getAllItem`).then((res)=>{
            let list = res.data.data;

            this.list = list;
        });
    },
    methods: {
        isLogin() {
            this.canEdit = true;
        },
        getArray(arr,len) {
            let newObj = {},
                oldObj = arr ? arr[0] : {},
                arr1 = [],
                len1 = arr ? Math.ceil(arr.length / len) : 0;

            for(let key in oldObj) {
                newObj[key] = '';
            }
            for(let x = 0; x < len1; x++) {
                let arr2 = [];
                for(let y = 0; y < len; y++) {
                    let z = x * len + y;

                    if (arr[z]) {
                        arr2.push(arr[z])
                    } else {
                        arr2.push(newObj);
                    }
                }
                arr1.push(arr2);
            }
            return arr1;
        },
        clickSwitch() {
            let {isEdit} = this;

            isEdit = (isEdit + 1) % 2;
            this.isEdit = isEdit;
        },
        deleteItem(id) {
            let r = window.confirm("确定删除吗？");

            if (!r) {
                return;
            }
            let {canEdit} = this;
            
            canEdit && axios.post('/deleteItem', {
                id
            }).then((res)=>{
                window.location.reload();
            });
        }
    }
}
</script>

<style scoped>
.div {
    width: 1160px;
    margin: 30px auto 60px;
    padding: 30px 0 130px;
    background-color: #fff;
    position: relative;
}
.div1 {
    padding: 0 20px;
    margin-top: 40px;
}
.div2 {
    width: 358px;
    border-radius: 4px;
    position: relative;
    border: 1px solid rgba(0,0,0,.4);
}
.div2 .close-wrap {
    height: 30px;
    width: 358px;
    position: absolute;
    top: 0;
    left: 0;
}
.div2 .close {
    position: absolute;
    width: 30px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    right: 0;
    top: 0;
    color: rgba(0,0,0,.4);
}
.div2 .close:hover {
    color: #000;
}
.div2 .title {
    height: 70px;
    line-height: 70px;
    width: 358px;
    text-align: center;
    font-size: 24px;
    color: #666666;
}
.div2-hover:hover .title {
    color: #fff;
    background: -webkit-gradient(linear, right top, right bottom, from(#ff7538), to(#ffab0a));
}
.div3 {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
.div4 {
    position: relative;
    padding: 0 20px 16px;
    border-bottom: 1px solid #e1e1e1;
}
.div-margin {
    margin-left: 20px;
}
.p1 {
    font-size: 20px;
    color: #333333;
    margin-left: 10px;
}
.p2 {
    font-size: 16px;
    color: #d7d7d7;
    font-style: italic;
}
.p3 {
    font-size: 16px;
    color: rgba(0,0,0,.4);
    margin: 0 40px;
}
.img-top {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate3d(-50%,0,0);
}
.switch{
    width: 36px;
    height: 22px;
    border-radius: 11px;
    position: absolute;
    right: 15px;
    cursor: pointer;
}
.switch>div{
    width: 19px;
    height: 19px;
    border-radius: 9.5px;
    position: absolute;
    background: white;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.4);
}
.switch.open{
    background: rgba(0,184,0,0.8);
}
.switch.open>div{
    top: 1px;
    right: 0px;
}
.switch.close{
    background: rgba(255,255,255,0.4);
    border:1px solid rgba(0,0,0,0.15);
    border-left: transparent;
}
.switch.close>div{
    left: 0px;
    top: 1px;
}
.add-img {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translate3d(-50%,0,0);
    color: rgba(0,0,0,.4);
    font-size: 18px;
}
.add-img:hover {
    color: #000;
}
</style>
