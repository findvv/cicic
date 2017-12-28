<template>
    <div class="footer">
        <div class="wrap flex">
            <div class="flex">
                <p class="p1">@</p>
                <p class="p2">{{name}}</p>
            </div>
            <div class="flex">
                <img src="../assets/1.png" height="15" width="24" class="p1" />
                <p class="p2">{{email}}</p>
            </div>
            <div class="flex">
                <img src="../assets/2.png" height="20" width="12" class="p1" />
                <p class="p2">{{phone}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import * as base from '../data/base';
let {phone,email,name} = base;
export default {
    name: 'blog-footer',
    data() {
        return {
            phone,
            email,
            name
        }
    }
}
</script>

<style scoped>
.wrap {
    height: 40px;
}
.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background-color: #000;
}
.p1 {
    margin-right: 8px;
}
p {
    color: #999999;
    font-size: 16px;
}
</style>
