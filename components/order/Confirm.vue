<template>
    <section class="wrap" style="margin-top:20px;overflow:hidden;">
        <table class="order_table">
            <caption>
                <strong>订单商品</strong>
                <router-link to="/cart">
                    返回购物车修改
                </router-link>
            </caption>
            <tr v-for="(detail,index) in detailList">
                <td class="center">
                    <router-link :to="'/goods/detail?goodsId=' + detail.goodsId" target="_blank">
                        <img :src="detail.goods.img" style="width:50px;height:50px;"/>
                    </router-link>
                </td>
                <td>
                    <router-link :to="'/goods/detail?goodsId=' + detail.goodsId" target="_blank">
                        {{detail.goods.name}}
                    </router-link>
                </td>
                <td class="center"><span class="rmb_icon">{{detail.goods.price}}</span></td>
                <td class="center"><span>{{detail.detailNum}}</span></td>
                <td class="center"><strong class="rmb_icon">{{(detail.goods.price * detail.detailNum).toFixed(2)}}</strong></td>
            </tr>
        </table>
        <!--支付与配送-->
        <ul class="order_choice">
            <!--<li>
                <dl>
                    <dt>支付方式</dt>
                    <dd>
                        <label class="radio istrue"><input type="radio" name="pay"/>支付宝</label>
                        <label class="radio"><input type="radio" name="pay"/>微信支付</label>
                        <label class="radio"><input type="radio" name="pay"/>网银在线</label>
                        <label class="radio"><input type="radio" name="pay"/>余额支付</label>
                    </dd>
                    <dd>
                        <label>
                            <input type="checkbox"/>
                            使用余额￥<input type="text" value="59.00" class="textbox"/>
                            <mark>当前账户余额<strong class="rmb_icon">59.00</strong></mark>
                        </label>
                    </dd>
                </dl>
            </li>-->
            <li>
                <dl>
                    <dt>配送地址</dt>
                    <dd>
                        <label @click="selectAddress(recive.reciveId)" v-for="recive in reciveList" :class="{istrue:recive.reciveDefault}" class="radio" style="width: 500px;height:40px;margin-top: 5px">
                            <p>{{recive.reciveName}} - {{recive.recivePhone}}</p>
                            <p style="margin-top: 10px">{{recive.reciveAddress}}</p>
                        </label>
                    </dd>
                </dl>
            </li>
        </ul>
        <div class="order_btm_btn">
            <a @click="saveOrder" href="javascript:void(0);" class="link_btn_02 add_btn">
                共计金额<strong class="rmb_icon">{{total}}</strong>提交订单
            </a>
        </div>
    </section>
</template>
<script>
    import axios from 'axios'
    import {hide} from "@/assets/js/goodstype.js"
    import {useUserStore} from '@/stores/index.js'
    export default {
        name: 'Confirm',
        mounted(){
            hide();
            //接收请求中的参数
            let detailIds = this.$route.query.detailIds;
            console.log(detailIds);
            //发送请求至后端获订单数据
            let user_pinia = useUserStore();
            //接装参数
            let params = "?token=" + user_pinia.token;
            if(typeof detailIds == "array"){
                for(let i in detailIds){
                    params += "&detailIds=" + detailIds[i];
                }
            }else{
                params += "&detailIds=" + detailIds;
            }
            axios.get("/api/order-app/orderDetail/confirm" + params).then(
                result => {
                    this.detailList = result.data.data;
                }
            );
            //当前登录人
            let LoginUser = useUserStore();
            //发送请求至后端获地址数据
            axios.get("/api/adress-app/recive",{params: {token:LoginUser.token}}).then(
                result => {
                    this.reciveList = result.data.data;
                    if(this.reciveList){
                        let address = this.reciveList[0];
                        this.addressId = address.reciveId  //默认送货地址第一项
                        //设置收货人姓名，电话，地址
                        this.orderAdress = address.reciveAddress;
                        this.orderPhone = address.recivePhone;
                        this.orderReciver = address.reciveName;
                    }
                }
            );
        },
        data(){
            return {"detailList":[],"reciveList":[],"addressId":0,"orderPhone":"","orderAdress":"","orderReciver":""}
        },
        computed:{
            total(){
                let totalAmount = 0.0;
                for(let i in this.detailList){
                    let detail = this.detailList[i];
                    totalAmount += detail.detailNum * detail.goods.price;
                }
                return totalAmount.toFixed(2)
            }
        },
        methods:{
            selectAddress(addressId){
                //更换送货人
                //this.addressId = addressId;
                //更换样式
                for(let i in this.reciveList){
                    let address = this.reciveList[i];
                    if(address.reciveId == addressId){
                        address.reciveDefault = 1;
                        //设置收货人姓名，电话，地址
                        this.orderAdress = address.reciveAddress;
                        this.orderPhone = address.recivePhone;
                        this.orderReciver = address.reciveName;
                    }else{
                        address.reciveDefault = 0;
                    }
                }
            },
            saveOrder(){//提交订单
                //接收请求中的参数
                let detailIds = this.$route.query.detailIds;
                if(typeof detailIds == "string"){//如果只传一个值，则它是字符串，而不是数组
                    detailIds = [detailIds];//封装成数组
                }
                //当前登录人
                let LoginUser = useUserStore();
                //发送请求至后端保存订单
                axios.put("/api/order-app/order?token=" + LoginUser.token,{
                        "detailIds":detailIds,
                        "orderPhone":this.orderPhone,
                        "orderAdress":this.orderAdress,
                        "orderReciver":this.orderReciver
                }).then(
                    result => {
                        if(result.data.code == "200")//跳转成功页
                            this.$router.push("/orderSuccess?orderNo=" + result.data.data.orderNo);
                    }
                );

            }
        }
    }
</script>