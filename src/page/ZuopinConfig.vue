<template>
    <div class="writeContain">
        <blog-mask :show="showMask">
            <div class="center">
                <imgInputer v-model="imgFile" accept="image/*" icon="img" @onChange="imgChange" size="large" :maxSize="maxSize"></imgInputer>
                <a 
                    href="javascript:;" 
                    class="submit-ok" 
                    @click="imgUpload"
                >
                    确认上传
                </a>
                <a href="javascript:;" class="close-mask" @click="hideMask">X</a>
            </div>
        </blog-mask>
        <blog-nav />
        <div class="wrap">
            <div class="flex-left">
                <p>标题：</p>
                <input type="text" v-model="title" />
            </div>
            <div class="flex-left">
                <p>简称：</p>
                <input type="text" v-model="subTitle"/>
            </div>
            <div class="flex-left">
                <p>英文名称：</p>
                <input type="text" v-model="enTitle"/>
            </div>
            <div class="flex-left">
                <p>封面：</p>
                <a href="javascript:;" @click="openFloat(1)">上传封面</a>
                <img :src="fImg" v-if="fImg" width="180" height="157" />
            </div>
            <div class="flex-left">
                <p>内容：</p>
                <a href="javascript:;" @click="openFloat(2)">上传图片</a>
                <div>
                    <img :src="img" v-if="img" width="180" height="157" v-for="img in cImgs" />
                </div>
            </div>
            <a href="javascript:;" @click="publish">发布</a>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import BlogMask from '../components/BlogMask';
    import BlogNav from '../components/BlogNav';
    import imgInputer from 'vue-img-inputer';
    export default {
        name: 'index',
        data() {
            return {
                title: '',
                subTitle: '',
                enTitle: '',
                fImg: '',
                cImgs: [],
                imgUrl: '',
                imgFile: null,
                imgName: '',
                type: 0,
                showMask: false,
                maxSize: 20000
            }
        },
        components: {
            BlogNav,
            BlogMask,
            imgInputer
        },
        methods: {
            imgChange(file, name) {
                this.imgFile = file;
                this.imgName = name;
            },
            imgUpload() {
                let {imgFile,imgName,type} = this,
                    that = this,
                    reader = new FileReader();

                reader.readAsDataURL(imgFile);
                reader.onloadend = function() {
                    let base64 = this.result,
                        postData = {
                           file: base64,
                           name: imgName
                        };

                    axios.post('/postImg', {
                        postData
                    }).then(function (res) {
                        let url = res.data.url;

                        if (type == 1) {
                            that.fImg = url;
                        }
                        if (type == 2) {
                            that.cImgs.push(url);
                        }
                        that.showMask = false;
                    });
                }              
            },
            hideMask() {
                this.showMask = false;
            },
            openFloat(type) {
                this.type = type;
                this.showMask = true;
            },
            publish() {
                let {title,subTitle,fImg,cImgs,enTitle} = this;

                axios.post('/postItem', {
                    title,
                    subTitle,
                    fImg,
                    cImgs,
                    enTitle
                }).then(function (res) {
                    window.location.href = `/zuopin/${res.data}`;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .writeContain {
        width: 100%;
        height: 100%;
        .center {
            padding: 50px 50px 0;
            background: #fff;
            border-radius: 5px;
        }
        .close-mask {
            position: absolute;
            color: #000;
            padding: 20px;
            top: 0;
            right: 0;
            &:hover {
                color: #4187FF;
            }
        }
        .img-url {
            height: 30px;
            width: 460px;
            border: 1px solid #999;
            margin: 5px auto;
            display: block;
            text-indent: 20px;
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
            &:hover {
                background-color: #2861a1;
            }
        }
    }
    .editorContainer {
        width: 100%;
        height: 100%;
    }
</style>