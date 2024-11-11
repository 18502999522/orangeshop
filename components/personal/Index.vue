<template>
    <div class="user_rt_cont">
        <div class="top_title">
            <strong><em>DeathGhost</em>欢迎回到用户中心</strong>
        </div>
        <!--用户信息-->
        <div class="user_factbook">
            <a href="profile.html" class="user_icon">
                <img src="@/assets/images/icon/DefaultAvatar.jpg"/>
                <span>修改头像</span>
            </a>
            <div class="user_infor">
                <p><strong>DeathGhost</strong>（商户会员）<span class="user_vip unaccredited">未认证！</span><a href="authenticate.html">申请入驻</a></p><!--**未认证的class值为"unaccredited"**-->
                <p>上次登录时间：<time>2013-01-14 13:55</time>，登录ip：192.168.1.1</p>
                <p>账户余额：<strong class="rmb_icon">0.00</strong><a href="account.html" class="btn">充值</a><a href="account.html" class="btn">提现</a></p>
            </div>
        </div>
        <!--买家订单提醒-->
        <dl class="user_order_tips">
            <dt>买家订单提醒</dt>
            <dd>
                <a href="order_list.html">
                    <strong>20</strong>
                    <em>待付款订单</em>
                </a>
            </dd>
            <dd>
                <a href="order_list.html">
                    <strong>10</strong>
                    <em>待发货订单</em>
                </a>
            </dd>
            <dd>
                <a href="order_list.html">
                    <strong>30</strong>
                    <em>待确认订单</em>
                </a>
            </dd>
            <dd>
                <a href="order_list.html">
                    <strong>15</strong>
                    <em>待评价订单</em>
                </a>
            </dd>
        </dl>
        <!--卖家订单提醒-->
        <dl class="user_order_tips">
            <dt>卖家订单提醒</dt>
            <dd>
                <a href="#">
                    <strong>9</strong>
                    <em>待付款订单</em>
                </a>
            </dd>
            <dd>
                <a href="#">
                    <strong>10</strong>
                    <em>待发货订单</em>
                </a>
            </dd>
            <dd>
                <a href="#">
                    <strong>20</strong>
                    <em>待评价订单</em>
                </a>
            </dd>
            <dd>
                <a href="#">
                    <strong>2</strong>
                    <em>退换货订单</em>
                </a>
            </dd>
        </dl>
    </div>
</template>
<script>
    export default {
        name: 'PersonalIndex'
    }
</script>