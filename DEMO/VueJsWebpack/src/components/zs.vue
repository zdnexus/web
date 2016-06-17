<style lang="sass" scoped="scoped">
    $qwe:#098;
    body{
        background-color: $qwe;
    h1{
        background-color: #0000ff;
        color: red;
        transform: translate(30%, 30%);
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
                name:"zs",
                age:"22"
            }
        }
    }
</script>
