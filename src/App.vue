<template>
  <div id="app">
    <div class="blog">
      <router-view />
    </div>
    <blog-footer />
  </div>
</template>

<script>
import BlogFooter from './components/BlogFooter';
export default {
  name: 'app',
  components: {
    BlogFooter
  }
}
</script>

<style lang="scss">
/*引入reset文件*/
    
@import "../static/css/reset";
.blog {
  height: calc(100% - 100px);
  width: 100%;
  overflow-y: auto;
  padding-top: 60px;
}
body {
  width: 100%;
  height: 100vh;
  background-image: url(./assets/bg.jpg);
  background-size: cover;
  min-width: 1200px;
}
* {
  margin: 0;
  padding: 0;
}
a {
    text-decoration:none
}
#app {
  width: 100%;
  height: 100vh;
  min-width: 1200px;
}
.wrap {
    width: 1200px;
    margin: 0 auto;
    position: relative;
}
.flex {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.flex-left {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.flex-1 {
    flex: 1;
}
.center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
}
</style>
