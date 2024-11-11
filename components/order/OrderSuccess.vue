<template>
    <section class="wrap order_back_infor">
        <div style="width:210px;margin:0 auto;overflow:hidden;text-align:left;">
            <h2>订单提交成功！</h2>
            <p>订单编号：{{orderNo}}</p>
        </div>
        <div class="order_btm_btn">
            <router-link to="/" class="link_btn_01 buy_btn">
                返回首页
            </router-link>
            <router-link to="/personal/myOrders" class="link_btn_02 add_btn">
                我的订单
            </router-link>
        </div>
    </section>
</template>
<script>
    import {hide} from "@/assets/js/goodstype.js"
    export default {
        name: 'OrderSuccess',
        mounted(){
            hide();
            //接收请求中的参数
            this.orderNo = this.$route.query.orderNo;
        },
        data(){
            return {"orderNo":""}
        }
    }
</script>