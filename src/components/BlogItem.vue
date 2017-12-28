<template>
    <div :class="['div',!imgs ? 'div2' : '']">
        <div class="flex div1">
            <div class="flex">
                <img src="../assets/3.png" height="12" width="58" class="icon1" />
                <p class="p1">{{subtitle}}</p>
            </div>
            <div class="flex center">
                <img src="../assets/4.png" height="27" width="50" />
                <p class="p2">{{title}}</p>
                <img src="../assets/4.png" height="27" width="50" class="icon2" />
            </div>
            <a class="flex" :href="link">
                <p class="p3">更多</p>
                <img src="../assets/5.png" height="15" width="15" />
            </a>
        </div>
        <div class="flex">
            <a :href="img.key" v-for="img in imgs">
                <img :src="img.value" height="314" width="360" class="item"/>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'blog-item',
    props: {
        title: String,
        subtitle: String,
        link: String,
        imgs: Array
    }
}
</script>

<style scoped>
.div {
    margin-top: 25px;
    background-color: #fff;
    padding: 0 18px 40px;
    box-shadow: 4px 4px 2px rgba(204,204,204,.2);
}
.div2 {
    padding-bottom: 0;
}
.div1 {
    padding: 20px 0;
    position: relative;
}
.icon1 {
    margin-right: 5px;
}
.icon2 {
    transform: rotate(180deg);
}
.p1 {
    font-size: 16px;
    color: #999999;
    font-style: italic;
}
.p2 {
    font-size: 24px;
    color: #333333;
    margin: 0 10px;
}
.p3 {
    font-size: 12px;
    color: #999999;
    margin-right: 5px;
}
.item {
    border-radius: 8px;
}
.item:hover {
     box-shadow: 0 0 20px #dbdbdb;
}
</style>
