<template>
    <div class="bg" v-show="show">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'blog-mask',
    props : {
        show: {type:Boolean, default: false}
    }
}
</script>

<style scoped>
.bg {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    background: rgba(0,0,0,.6);
}
</style>
