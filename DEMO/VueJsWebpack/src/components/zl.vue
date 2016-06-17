<style lang="sass" scoped="scoped">
    $qwe:#098;
    body{
        background-color: $qwe;
    h1{
        background-color: #f0ad24;
        color: red;
        transform: translate(20%, 20%);
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
    </div>
</template>

<script>
    export default {
        data () {
            return {
                name:"zl",
                age:"28"
            }
        }
    }
</script>