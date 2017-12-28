<template>
    <div class="writeContain">
        <blog-mask :show="showMask">
            <div class="center">
                <imgInputer v-model="imgFile" accept="image/*" icon="img" @onChange="imgChange" size="large" :maxSize="maxSize"></imgInputer>
                <input type="text" v-model="imgUrl" class="img-url" placeholder="图片地址" />
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
        <blog-nav :nav="4" limit="1" />
        <div class="indexContainer wrap">
            <div class="btnsContainer">
                <a class="btn" @click="publish" href="javascript:;">发表文章</a>
            </div>
            <div class="editorContainer">
                <mark-down 
                    @uploadImg="uploadImg"
                    :mdValuesT="msg.title"
                    :mdValuesP="msg.mdValue"  
                    :fullPageStatusP="false" 
                    :editStatusP="true" 
                    :previewStatusP="true" 
                    :navStatusP="true"
                    :icoStatusP="false"
                    @childevent="childEventHandler"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import BlogMask from '../components/BlogMask';
    import BlogNav from '../components/BlogNav';
    import MarkDown from '../components/MarkDown';
    import imgInputer from 'vue-img-inputer';
    export default {
        name: 'index',
        data() {
            let {blogTitle,blogValue,blogId,blogContent} = window.localStorage;

            return {
                imgUrl: '',
                imgFile: null,
                imgName: '',
                showMask: false,
                msg: {
                    title: blogTitle || '标题',
                    mdValue: blogValue || '内容',
                    content: blogContent || '内容'
                },
                maxSize: 20000,
                id: blogId || ''
            }
        },
        components: {
            MarkDown,
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
                let {imgFile,imgName} = this,
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
                        that.imgUrl = `![${res.data.name}](${res.data.url})`;
                    });
                }              
            },
            uploadImg() {
                this.showMask = true;
            },
            hideMask() {
                this.showMask = false;
            },
            childEventHandler(res) {
                this.msg = res;
            },
            publish(){
                let data = this.msg,
                    date = new Date,
                    {id} = this,
                    getNum = (num)=>{
                        return num < 10 ? `0${num}` : num;
                    },
                    time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日  ${getNum(date.getHours())}:${getNum(date.getMinutes())}`;

                if (id) {   // 更新文章
                    axios.post('/editArticle', {
                        id,
                        time,
                        data
                    }).then(function (res) {
                        window.location.href = `/article/${id}`;
                    });
                } else {    // 发布文章
                    axios.post('/postArticle', {
                        index: date.getTime(),
                        time,
                        data
                    }).then(function (res) {
                        window.location.href = `/article/${res.data}`;
                    });
                }
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        overflow: hidden;
    }
    .show{
        position: absolute;
        left: 0;
        top: 0;
    }
    .indexContainer {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .btnsContainer{
        width: 1200px;
        position: absolute;
        left: 50%;
        transform: translate3d(-50%,0,0);
        top: 5px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .btn{
            border-radius: 2px;
            color: #000;
            position: absolute;
            right: 0;
            top: 0;
            display: inline-block;
            border:1px solid #ccc;
            box-sizing: border-box;
            padding: 0 10px;
            background: #fff;
            font-size: 12px;
            height: 25px;
            line-height: 25px;
            cursor:pointer;
            moz-user-select: -moz-none; 
            -moz-user-select: none; 
            -o-user-select:none; 
            -khtml-user-select:none; /* you could also put this in a class */ 
            -webkit-user-select:none;/* and add the CSS class here instead */ 
            -ms-user-select:none; 
            user-select:none;/**禁止选中文字*/ 
            &:hover {
                background-image: -webkit-gradient(linear, left top, right bottom, from(#ffab0a), to(#ff7538));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;   
            }
        }
    }
    .maskContainer{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        height: 100vh;
        width: 100vw;
        background: rgba(0,0,0,0.5);
        // z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        .contentContainer{
            width: 60%;
            height: 60%;
            background: #fefefe;
            padding: 20px;
            box-sizing: border-box;
            position: relative;
            .showAreaContainer{
                height: 100%;
                width: 100%;
                outline: none;
                background: #eee;
                display: block;
                resize: none;
                padding: 10px;
                box-sizing: border-box;
            }
            .closeBtnContainer{
                position: absolute;
                height: 30px;
                width: 30px;
                right: -40px;
                top: -40px;
                border:1px solid #fff;
                border-radius: 50%;
                &::before{
                    content: '';
                    position: absolute;
                    width: 70%;
                    height: 2px;
                    display: bblock;
                    background: #fff;
                    left: 15%;
                    top: calc(50% - 1px);
                    transform: rotate(45deg);
                    -webkit-transform: rotate(45deg);
                    -moz-transform: rotate(45deg);
                }
                &::after{
                    content: '';
                    position: absolute;
                    width: 70%;
                    height: 2px;
                    display: bblock;
                    background: #fff;
                    left: 15%;
                    top: calc(50% - 1px);
                    transform: rotate(-45deg);
                    -webkit-transform: rotate(-45deg);
                    -moz-transform: rotate(-45deg);
                }
            }

        }

    }
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