<template>
    <div class="div">
        <div class="flex div4">
            <div class="flex">
                <img src="../assets/3.png" height="12" width="58" />
                <p class="p1">{{value.p1}}</p>
            </div>
            <div class="flex">
                <p class="p2">{{value.p2}}</p>
                <p v-if="login == '1'" class="p3">编辑模式：</p>
                <div :class="['switch',isEdit == 1 ? 'open' : 'close']" @click="clickSwitch" v-if="login == '1'">
                    <div></div>
                </div>
            </div>
        </div>
        <div class="div1 flex-left" v-for="items in getArray(list,3)">
            <a :class="['div2','flex',isEdit == 0 ? 'div5' : 'div6', index > 0 ? 'div-margin' : '']" v-for="(item,index) in items" v-if="item.img" :style="{backgroundImage:`url(${item.img})`}" href="javascript:;" @click="clickImg(item.img)">
                <p v-show="isEdit == 1" @click="deleteImg(item.img)" :class="['delete',item.img == fimg ? 'delete-white' : '']">X</p>
                <p class="fengmian" v-show="isEdit == 1 && item.img == fimg">封面</p>
            </a>
        </div>
        <a class="add-img" href="javascript:;" @click="addImg" v-if="login == '1'" v-show="isEdit">
            添加图片
        </a>
        <blog-mask :show="showImgMask" v-if="login == '1'">
            <div class="center">
                <imgInputer v-model="imgFile" accept="image/*" icon="img" @onChange="imgChange" size="large" :maxSize="maxSize"></imgInputer>
                <a 
                    href="javascript:;" 
                    class="submit-ok" 
                    @click="imgUpload"
                >
                    确认上传
                </a>
                <a href="javascript:;" class="close-mask" @click="hideImgMask">X</a>
            </div>
        </blog-mask>
        <blog-mask :show="showMask">
            <div class="div3" @click="hideMask">
                <img :src="imgUrl" :style="imgStyle" :class="[newClass ? 'img-top':'big-img']" />
            </div>
        </blog-mask>
    </div>
</template>

<script>
import BlogMask from '../components/BlogMask';
import imgInputer from 'vue-img-inputer';
import axios from 'axios';
export default {
    name: 'blog-list',
    props: {
        id: String,
        value: Object,
        list: Array,
        type: {type: String, default: '0'},
        login: {type: String, default: '0'},
        fimg: String
    },
    components: {
        BlogMask,
        imgInputer
    },
    data(){
        return {
            imgObj: new Image,
            imgFile: null,
            imgName: '',
            imgUrl: '',
            imgStyle: {},
            showImgMask: false,
            showMask: false,
            isEdit: 0,
            newClass: false,
            maxSize: 20000
        }
    },
    methods: {
        setFimg(url) {
            let {login,id} = this;

            this.$emit('setFimg', url);
            (login == '1') && axios.post('/setFimg', {
                id,
                url
            }).then((res)=>{
                
            });
        },
        hideMask() {
            this.showMask = false;
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
        clickImg(img) {
            let {isEdit} = this;

            if (isEdit == 1) {
                this.setFimg(img);
            } else {
                this.showBig(img);
            }
        },
        showBig(url) {
            let {imgObj,type} = this,
                winW = document.body.clientWidth,
                winH = document.body.clientHeight;

            imgObj.src = url;
            imgObj.onload = ()=>{
                let {width,height} = imgObj,
                    newW,newH;

                if (width > height) {
                    newW = winW;
                    newH = height / width * winW;
                    if (newH > winH) {
                        newH = winH;
                        newW = width / height * winH;
                    }
                } else {
                    if (type == '1') {
                        newW = winW;
                        newH = height / width * winW;
                        this.newClass = true;
                    } else {
                        newH = winH;
                        newW = width / height * winH;
                    }
                }

                this.imgStyle = {
                    width: `${newW}px`,
                    height: `${newH}px`
                }
                this.imgUrl = url;
                this.showMask = true;
            }
        },
        clickSwitch() {
            let {isEdit} = this;

            isEdit = (isEdit + 1) % 2;
            this.isEdit = isEdit;
        },
        deleteImg(url) {
            let r = window.confirm("确定删除吗？");

            if (!r) {
                return;
            }
            let {login,id} = this;
            
            (login == '1') && axios.post('/deleteImg', {
                id,
                url
            }).then((res)=>{
                window.location.reload();
            });
        },
        addImg() {
            this.showImgMask = true;
        },
        hideImgMask() {
            this.showImgMask = false;
        },
        imgChange(file, name) {
            this.imgFile = file;
            this.imgName = name;
        },
        imgUpload() {
            let {imgFile,imgName,login,id} = this,
                that = this,
                reader = new FileReader();

            reader.readAsDataURL(imgFile);
            reader.onloadend = function() {
                let base64 = this.result,
                    postData = {
                       file: base64,
                       name: imgName,
                       id
                    };

                (login == '1') && axios.post('/postImg', {
                    postData
                }).then((res)=>{
                    window.location.reload();
                });
            }              
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
    width: 360px;
    height: 315px;
    border-radius: 4px;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    cursor: pointer;
    position: relative;
}
.div2 .delete {
    position: absolute;
    right: 5px;
    top: 5px;
    color: rgba(0,0,0,.6);
    cursor: pointer;
    z-index: 100;
}
.div2 .delete:hover {
    color: #000;
}
.div2 .delete.delete-white {
    color: #fff;
}
.div2 .fengmian {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    z-index: 50;
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
.div5 {
    cursor:zoom-in;
}
.div6 {
    border: 1px solid #e1e1e1;
    border-radius: 2px;
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
.big-img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
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
.submit-ok {
    margin: 20px auto;
    display: block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 100px;
    color: #fff;
    background-color: #4187FF;
    border-color: #357ebd;
}
.center {
    padding: 50px 50px 0;
    background: #fff;
    border-radius: 5px;
}
.submit-ok:hover {
    background-color: #2861a1;
}
.close-mask {
    position: absolute;
    color: #000;
    padding: 20px;
    top: 0;
    right: 0;
}
.close-mask:hover {
    color: #4187FF;
}
</style>
