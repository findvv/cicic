<template>
    <div>
        <blog-nav limit="1" />
        <div>
            <div class="flex" v-for="item in list">
                <p>{{item.name}}</p>
                <p>{{item.url}}</p>
                <a href="javascript:;" @click="deleteMusic(item.md)">删除</a>
            </div>
            <input type="text" placeholder="音乐名称" v-model="musicName" />
            <input type="text" placeholder="音乐地址" v-model="musicUrl" />
            <a href="javascript:;" @click="addMusic">新增</a>
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
    data () {
        return {
            musicName: '',
            musicUrl: '',
            list: []
        }
    },
    mounted() {
        axios.get('/getMusicList').then((res)=>{
            let {list} = res.data.data;

            this.list = list;
        });
    },
    methods: {
        deleteMusic(id) {
            axios.post('/deleteMusic', {
                id
            }).then(function (res) {
                window.location.reload();
            });
        },
        addMusic() {
            let date = new Date,
                {musicName,musicUrl} = this;

            axios.post('/addMusic', {
                index:date.getTime(),
                musicName,
                musicUrl
            }).then(function (res) {
                window.location.reload();
            });
        }
    }
}
</script>
<style scoped>

</style>
