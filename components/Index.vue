<template>
    <div class="wrap"><img src="@/assets/upload/banner.jpg"/></div>
    <Top/>
        <!-- 二级路由出口，路由匹配到的组件将渲染在这里 -->
        <router-view :key="$route.path + $route.query.t"></router-view>
    <Bottom/>
</template>
<script>
    import Top from '@/components/index/Top.vue'
    import Bottom from '@/components/index/Bottom.vue'
    export default {
        name: 'Index',
        components: {
            Top,Bottom
        }
    }
</script>