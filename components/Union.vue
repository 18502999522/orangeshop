<template>
    <div class="unionLoginTop">
        <div class="wrap">
            <h1>服装商城网上联盟平台</h1>
        </div>
    </div>
    <div class="unionLoginBg">
        <div class="wrap bg">
            <dl class="loginForm">
                <dt>登录联盟平台</dt>
                <dd>
                    <span>账号：</span>
                    <input type="text" placeholder="输入账号" class="txtbox"/>
                </dd>
                <dd>
                    <span>密码：</span>
                    <input type="text" placeholder="输入密码" class="txtbox"/>
                </dd>
                <dd>
                    <input type="button" value="立 即 登 陆" class="loginBtn"/>
                </dd>
                <dd>
                    <a href="#" class="fl">新用户注册</a>
                    <a href="#" class="fr">忘记密码？</a>
                </dd>
            </dl>
        </div>
    </div>
    <!--footer-->
    <Bottom/>
</template>
<script>
import Bottom from '@/components/index/Bottom.vue'
export default {
    name: 'Union',
    components: {
       Bottom
    }
}
</script>
<style>
    .bg{background:url('@/assets/images/unbg.jpg') center no-repeat;height:486px;}
</style>
