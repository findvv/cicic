<template>
    <div class="app">
        <div class="nav flex">
            <div class="wrap flex">
                <a class="flex" href="/">
                    <div class="face">
                        <img :src="face" height="28" width="28">
                    </div>
                    <span class="p1">{{name}}</span>
                </a>
                <div class="flex">
                    <a :class="['p1','flex-1','p2',nav==index?'selected':'']" :href="item.key" v-for="(item,index) in navs">{{item.value}}</a>
                    <div class="flex music" @click="playMusic">
                        <div :class="['ball',isPlayed == 1 ? 'paused' : 'play']">
                            <div class="ball-inner center"></div>
                            <div class="ball-line center"></div>
                        </div>
                        <span class="p1">Music</span>
                    </div>
                    <div class="music-wrap flex">
                        <img src="../assets/music.png" height="24" width="24" :class="['music-icon',isPlayed == 1 ? '' : 'paused']">
                        <p class="music-name" v-cloak>{{musicList[musicIndex] ? musicList[musicIndex].name : '音乐名称'}}</p>
                    </div>
                    <a href="javascript:;" class="p1 p2 flex-1 login" v-if="showWrite" @click="goHref(writeNav.key)">{{writeNav.value}}</a>
                    <a class="p1 p2 flex-1 login" href="javascript:;" @click="takeLogin" v-if="showLoginBtn">登录</a>
                    <a class="p1 p2 flex-1 login-out" href="javascript:;" @click="loginOut" v-if="showWrite">退出</a>
                </div>
            </div>
        </div>
        <router-view/>
        <div class="mask" v-show="showLogin">
            <div class="mask-center">
                <p class="login-title">登录</p>
                <input type="text" v-model="user" placeholder="请输入账号" />
                <input type="password" v-model="pwd" placeholder="请输入密码"/>
                <div class="login-btn">
                    <p class="wrong-info" v-show="loginWrong">账号或密码输入错误</p>
                    <a href="javascript:;" @click="goLogin" class="flex login-ok">登录</a>
                </div>
                <a href="javascript:;" @click="cancelLogin" class="login-cancel">X</a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import * as base from '../data/base';
import * as navs from '../data/nav';
import * as music from '../data/music';
let {name,face} = base;

export default {
    name: 'blog-nav',
    props: {
        limit: {type: String, default: '0'},
        nav: Number
    },
    data() {
        return {
            isPlayed: 0,
            musicList: [],
            musicIndex: 0,
            name,
            face,
            musicObj: (new Audio()),
            navs: navs.slice(0,navs.length - 1),
            writeNav: navs[navs.length-1],
            showLoginBtn: false,
            showWrite: false,
            showLogin: false,
            user: '',
            pwd: '',
            loginWrong: false
        }
    },
    mounted() {
        let id = window.localStorage.loginUser,
            pwd = window.localStorage.loginPwd;

        axios.get('/getMusicList').then((res)=>{
            let {list,play} = res.data.data;

            this.musicList = list;
            if (play == '1') {
                this.playList();
                this.isPlayed = 1;
            }
        });
        
        axios.post('/isLogin', {
            id,
            pwd
        }).then((res)=>{
            if (res.data.isLogin == '1') {  // 已登录
                this.$emit('isLogin');
                this.showWrite = true;
            } else {
                (this.limit == '1') && (window.location.href = '/');
                this.showLoginBtn = true;
            }
        });
    },
    methods: {
        playList() {
            let {musicObj,musicIndex,musicList} = this;

            musicObj.src = musicList[musicIndex].url;
            musicObj.play();
            musicObj.loop = false;
            musicObj.addEventListener('ended', ()=>{  
                this.musicIndex = (musicIndex + 1) % musicList.length;
                this.playList();
            }, false);
        },
        goHref(url) {
            window.localStorage.setItem('blogTitle', '');
            window.localStorage.setItem('blogContent', '');
            window.localStorage.setItem('blogId', '');
            window.localStorage.setItem('blogValue', '');
            window.location.href = url;
        },
        playMusic() {
            let {isPlayed,musicObj,play} = this;

            if (!play) {
                this.playList();
                this.play = true;
            }
            if (isPlayed == 1) {
                musicObj.pause();
            } else {
                musicObj.play();
            }

            isPlayed = (isPlayed + 1) % 2;
            this.isPlayed = isPlayed;
        },
        takeLogin() {
            this.showLogin = true;
        },
        goLogin() {
            let {user,pwd} = this;

            axios.post('/isLogin', {
                id:user,
                pwd
            }).then((res)=>{
                if (res.data.isLogin == '1') {  // 已登录
                    window.localStorage.setItem('loginUser', user);
                    window.localStorage.setItem('loginPwd', pwd);
                    window.location.reload();
                } else {
                    this.user = '';
                    this.pwd = '';
                    this.loginWrong = true;
                }
            });
        },
        loginOut() {
            window.localStorage.setItem('loginUser', '');
            window.localStorage.setItem('loginPwd', '');
            window.location.reload();
        },
        cancelLogin() {
            this.showLogin = false;
        }
    }
}
</script>

<style scoped>
.mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(0,0,0,.4);
}
.mask-center {
    padding: 30px 50px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 3px;
}
.mask-center input {
    width: 100%;
    margin-top: 20px;
    line-height: 38px;
    text-indent: 14px;
    font-size: 14px;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 4px;
}
.login-ok {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    background: -webkit-gradient(linear, left top, right bottom, from(#ff7538), to(#ffab0a));
    justify-content: center;
}
.login-ok:hover {
    background: -webkit-gradient(linear, left top, right bottom, from(rgba(255, 117, 56, .8)), to(rgba(255, 171, 10, .8)));
}
.login-cancel {
    position: absolute;
    padding: 10px;
    right: 0;
    top: 0;
    color: #000;
}
.login-btn {
    position: relative;
    padding-top: 40px;
}
.wrong-info {
    position: absolute;
    top: 10px;
    left: 0;
    color: #FF4040;
    font-size: 12px;
}
.login-cancel:hover {
    color: rgba(0,0,0,.4);
}
.mask-btn {
    width: 50%;
    margin: 0 auto;
}
.mask-btn a {
    color: #000;
}
.mask-btn a:hover {
    color: #3b8fd9;
}
.app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 100;
    min-width: 1200px;
}
@-webkit-keyframes circle{
    0%{ transform:rotate(0deg); }
    100%{ transform:rotate(360deg); }
}
.music-icon {
    animation:circle 3s infinite linear;/*匀速 循环*/
}
.music-icon.paused {
    animation-play-state: paused;
}
.nav {
    height: 60px;
    background-color: #000;
}
.wrap {
    height: 100%;
}
.music-wrap {
    height: 36px;
    background-color: #ffffff;
    border-radius: 18px;
    padding: 0 16px 0 6px;
}
.music-name {
    color: #666666;
    font-size: 14px;
    margin-left: 8px;
}
.music {
    cursor: pointer;
    margin: 0 20px;
}
.img {
    width: 100%;
}
.face {
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background-color: #fff;
    margin-right: 10px;
    overflow: hidden;
}
.p1 {
    font-size: 18px;
    color: #fff;
}
.p2 {
    margin: 0 20px;
    position: relative;
}
.login {
    position: absolute;
    right: -80px;
}
.login-out {
    position: absolute;
    right: -140px;
}
.p2.selected,.p2:hover {
    background-image: -webkit-gradient(linear, left top, right bottom, from(#ff7538), to(#ffab0a));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.p2.selected:after {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #fff;
    left: 50%;
    transform: translate3d(-50%,0,0);
    bottom: -17px;
}
.ball {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #fff;
    margin-right:12px;
    position: relative;
}
.ball-inner {
    display: none;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 8px solid #000;
    border-bottom: 5px solid transparent;
}
.ball-line {
    display: none;
    width: 6px;
    height: 8px;
}
.ball-line:before,.ball-line:after {
    content: '';
    display: block;
    position: absolute;
    width: 2px;
    height: 8px;
    background: #000;
    top: 0px;
}
.ball-line:before {
    left: 0;
}
.ball-line:after {
    right: 0;
}
.play .ball-inner{
    margin-left: 1px;
}
.play .ball-inner,.paused .ball-line {
    display: block;
}
.login-title {
    color: #666;
    font-size: 20px;
}
</style>
