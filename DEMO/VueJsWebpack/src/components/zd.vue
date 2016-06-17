<style lang="sass" scoped="scoped">
    $qwe:#098;
    body{
        background-color: $qwe;
    h1{
        background-color: #0ac2d2;
        color: red;
        transform: translate(10%, 10%);
    }

    h2{
        background-color: #999;
    }
    }
</style>

<template>
    <div>
        <h1>姓名：{{name}}</h1>
        <h2>{{age}}</h2>
        <button @click="golist">$route.router.go查看</button>
        <a v-link="{ name: 'zl' }">zl</a>
        <a v-link="{ name: 'zd' }">zd</a>
        <a v-link="{ name: 'zs' }">zs</a>
        <div class="zd">{{data}}</div>
        <zd></zd>
    </div>
</template>

<script>
    import hello from './hello.vue';

    export default {
        data () {
            return {
                name:"zd",
                age:"25"
            }
        },
        methods :{
            golist () {
                this.$route.router.go({name:"zl"});
            }
        },
        components:{
            zd:hello
        }
    }
</script>
