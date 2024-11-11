<template>
    <section class="wrap" style="margin-top:20px;overflow:hidden;">
        <table class="order_table">
            <tr>
                <th><input type="checkbox" @click="selectAll($event)"/></th>
                <th>产品</th>
                <th>名称</th>
                <th>单价</th>
                <th>数量</th>
                <th>小计</th>
                <th>操作</th>
            </tr>
            <tr v-for="(detail,index) in list">
                <td class="center">
                    <input type="checkbox" v-model="checkedIds" :value="detail.detailId"/>
                </td>
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
                <td class="center"><span class="rmb_icon">{{detail.orderUnitPrice}}</span></td>
                <td class="center">
                    <input @click="add(detail.detailId,-1);" type="button" value="-" class="jj_btn"/>
                    <input type="text" :value="detail.detailNum" class="number" readonly/>
                    <input @click="add(detail.detailId,1);" type="button" value="+" class="jj_btn"/>
                </td>
                <td class="center"><strong class="rmb_icon">{{(detail.orderUnitPrice * detail.detailNum).toFixed(2)}}</strong></td>
                <td class="center">
                    <a @click="del(detail.detailId,index)" href="javascript:void(0);" style="cursor: pointer">删除</a>
                </td>
            </tr>
        </table>
        <div class="order_btm_btn">
            <a @click="computeDetail()" href="javascript:void(0);" class="link_btn_02 add_btn">
                共计金额<strong class="rmb_icon">{{total}}</strong>立即结算
            </a>
        </div>
    </section>
</template>
<script>
    import axios from 'axios'
    import {hide} from "@/assets/js/goodstype.js"
    import {useUserStore} from '@/stores/index.js'
    export default {
        name: 'Cart',
        mounted(){
            hide();
            let user_pinia = useUserStore();
            //发送请求至后端获取相关数据
            axios.get("/api/order-app/orderDetail",{params: {token:user_pinia.token}}).then(
                result => {
                    this.list = result.data.data;
                }
            );
        },
        data(){
            return {"list":[],"checkedIds":[]}
        },
        computed:{
            total(){
                let totalAmount = 0.0;
                for(let i in this.checkedIds){
                    let detailId = this.checkedIds[i];
                    let detail = this.getDetail(detailId);
                    totalAmount += detail.detailNum * detail.orderUnitPrice;
                }
                return totalAmount.toFixed(2)
            }
        },
        methods:{
            add(detailId,factor){
                let detail = this.getDetail(detailId);
                //判断是否是减操作
                if(factor == -1 && detail.detailNum <= 1){
                    return;
                }
                let user_pinia = useUserStore();
                //发送请求至后端获取相关数据
                axios.post("/api/order-app/orderDetail?token=" + user_pinia.token,"detailId=" + detailId + "&factor=" + factor).then(
                    result => {
                        if(result.data.code == "200"){
                            if(factor == 1){
                                detail.detailNum++;
                            }else{
                                detail.detailNum--;
                            }
                        }
                    }
                );
            },
            getDetail(detailId){
                //根据条目ID获得条目对象
                for(let i in this.list){
                    let detail = this.list[i];
                    if(detail.detailId == detailId){
                        return detail;
                    }
                }
            },
            del(detailId,index){
                //发送请求至后端获取相关数据
                let user_pinia = useUserStore();
                axios.delete("/api/order-app/orderDetail?token=" + user_pinia.token,{params: {detailId:detailId}}).then(
                    result => {
                        if(result.data.code == "200"){
                            //删除index位置的元素，1是欲删除的个数
                            this.list.splice(index,1);
                        }
                    }
                );
            },
            selectAll(e){
                if(e.target.checked){//全选
                    //根据条目ID获得条目对象
                    for(let i in this.list){
                        let detail = this.list[i];
                        this.checkedIds.push(detail.detailId);
                    }
                }else{//全取消
                    this.checkedIds.length = 0;
                }
            },
            computeDetail(){
                let user_pinia = useUserStore();
                let url = "/confirm?token=" + user_pinia.token;
                for(let i in this.checkedIds){
                    let id = this.checkedIds[i];
                    url += "&detailIds=" + id;
                }
                this.$router.push(url);
            }
        }
    }
</script>