<template>
    <div class="user_rt_cont">
        <div class="top_title">
            <strong>我的订单</strong>
        </div>
        <!--条件检索-->
        <div style="margin:8px 0;">
            <select class="select">
                <option>订单状态</option>
                <option>待付款</option>
                <option>待发货</option>
                <option>待确认</option>
                <option>待评价</option>
                <option>退货</option>
            </select>
            <input type="text" class="textbox textbox_225" placeholder="输入订单编号"/>
            <input type="button" value="查询" class="group_btn"/>
        </div>
        <ul class="order_li">
            <li v-for="order in orderList">
                <table class="order_table">
                    <caption>
                        <strong>订单编号：{{order.orderNo}}</strong>
                        <em class="shop_name">{{order.orderDate}}</em>
                        <a href="order_detail.html">订单详情</a>
                    </caption>
                    <tr v-for="(detail,index) in order.detailList">
                        <td class="center">
                            <router-link :to="'/goods/detail?goodsId=' + detail.goodsId" target="_blank">
                                <img :src="detail.goods.img" style="width:50px;height:50px;"/>
                            </router-link>
                        </td>
                        <td>
                            <router-link :to="'/goods/detail?goodsId=' + detail.goodsId" target="_blank">
                                {{detail.goods.goodsName}}
                            </router-link>
                        </td>
                        <td class="center">
                            <span class="rmb_icon">{{detail.orderUnitPrice}}</span>
                        </td>
                        <td class="center"><b>{{detail.detailNum}}</b></td>
                        <td class="center"><strong class="rmb_icon">{{(detail.orderUnitPrice * detail.detailNum).toFixed(2)}}</strong></td>
                        <td v-show="index == 1" rowspan="2" class="center">
                            <a v-if="order.orderStatus!=2" href="order_comment.html" class="a_btn">
                                {{operateText(order.orderStatus)}}
                            </a>
                            <span v-else>{{operateText(order.orderStatus)}}</span>
                        </td>
                    </tr>
                </table>
            </li>

        </ul>
        <!--分页-->
        <div class="paging" style="text-align:right">
            <a >首页</a>
            <a class="active">2</a>
            <a>3</a>
            <a>...</a>
            <a>89</a>
            <a>最后一页</a>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import {useUserStore} from '@/stores/index.js'
    export default {
        name: 'MyOrders',
        data(){
            return {orderList:[]}
        },
        mounted(){
            //当前登录人
            let LoginUser = useUserStore();
            //发送请求至后端获地址数据
            axios.get("/api/order-app/order",{params: {token:LoginUser.token}}).then(
                result => {
                    this.orderList = result.data.data.list;
                }
            );
        },
        methods:{
            operateText(status){
                let text;
                if(status == 0)
                    text = "付款";
                else if(status == 1)
                    text = "取消订单";
                else if(status == 2)
                    text = "完成";
                return text;
            }
        }

    }
</script>