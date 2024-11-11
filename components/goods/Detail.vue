<template>
    <!--导航指向-->
    <aside class="wrap insideLink">
        <a href="index.html">首页</a>
        <a href="product_list.html">{{goods.type.name}}</a>
    </aside>
    <section class="wrap product_detail">
        <!--img:left-->
        <div class="gallery">
            <div>
                <div id="preview" class="spec-preview"> <span class="jqzoom"><img :jqimg="goods.imgs?goods.imgs[0].fileUrl:''" :src="goods.imgs?goods.imgs[0].fileUrl:''" width="420" height="420"/></span> </div>
                <!--缩图开始-->
                <div class="spec-scroll"> <a class="prev">&lt;</a> <a class="next">&gt;</a>
                    <div class="items">
                        <ul>
                            <li v-for="img in goods.imgs"><img :src="img.fileUrl" @mousemove="preview($event);"></li>
                        </ul>
                    </div>
                </div>
                <!--缩图结束-->
            </div>
        </div>
        <!--text:right-->
        <div class="rt_infor">
            <!--lt_infor-->
            <div class="goods_infor">
                <h1>{{goods.goodsName}}</h1>
                <ul>
                    <li>
                        <dl class="horizontal">
                            <dt>价格：</dt>
                            <dd><strong class="rmb_icon univalent">{{goods.price}}</strong></dd>
                        </dl>
                    </li>
                    <li>
                        <dl class="horizontal">
                            <dt>上架时间：</dt>
                            <dd><time>{{goods.goodsDate}}</time></dd>
                        </dl>
                    </li>
                    <li class="statistics">
                        <dl class="vertical">
                            <dt>月销量</dt>
                            <dd>20</dd>
                        </dl>
                        <dl class="vertical">
                            <dt>累计评论</dt>
                            <dd>198</dd>
                        </dl>
                        <dl class="vertical">
                            <dt>关注</dt>
                            <dd>230</dd>
                        </dl>
                    </li>
                    <li>
                        <dl class="horizontal horizontal_attr">
                            <dt>规格：</dt>
                            <dd>
                                <label>表中忘设计了</label>
                            </dd>
                        </dl>
                    </li>
                    <li>
                        <dl class="horizontal horizontal_attr">
                            <dt>数量：</dt>
                            <dd>
                                <span>库存：{{goods.goodsNum}}件</span>
                            </dd>
                        </dl>
                    </li>
                    <li class="last_li">
                        <input type="button" value="立即购买" class="buy_btn" onClick="javascript:location.href='cart.html'"/>
                        <input @click="cart" type="button" value="加入购物车" class="add_btn"/>
                    </li>
                </ul>
            </div>
            <!--rt_infor-->
            <div class="shop_infor">
                <dl class="business_card">
                    <dt>xx有限公司</dt>
                    <dd>资质：生产商</dd>
                    <dd>联系人：*先生（先生）</dd>
                    <dd>邮件：******@Foxmail.com</dd>
                    <dd>电话：4008-******</dd>
                    <dd>所在地：陕西省西安市</dd>
                    <dd>地址：陕西省西安市**区**街232号</dd>
                    <dd class="center">
                        <a href="shop.html" class="link_btn">进入店铺</a>
                        <a class="link_btn">收藏店铺</a>
                    </dd>
                </dl>
            </div>
        </div>
    </section>
    <!--detail-->
    <section class="wrap product_detail_btm">
        <article>
            <ul class="item_tab">
                <li><a class="curr_li">商品详情</a></li>
                <li><a>商品评价（2893）</a></li>
                <li><a>成交记录（1892）</a></li>
            </ul>
            <!--商品详情-->
            <div class="cont_wrap active">{{goods.goodsRemark}}</div>
            <!--商品评价-->
            <div class="cont_wrap">
                <table class="table">
                    <tr>
                        <td width="20%" align="center">李*锋</td>
                        <td width="60%">这里是评论内容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦</td>
                        <td width="20%" align="center"><time>2013-01-13 15:06</time></td>
                    </tr>
                    <tr>
                        <td width="20%" align="center">彭**法</td>
                        <td width="60%">这里是评论内容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦</td>
                        <td width="20%" align="center"><time>2013-01-13 15:06</time></td>
                    </tr>
                    <tr>
                        <td width="20%" align="center">代**彭</td>
                        <td width="60%">这里是评论内容哦这里是评论内容哦这里是评论内容哦容哦这里是评论内容哦这里是评论内容哦这里是评论容哦这里是评论内容哦这里是评论内容哦这里是评论容哦这里是评论内容哦这里是评论内容哦这里是评论容哦这里是评论内容哦这里是评论内容哦这里是评论容哦这里是评论内容哦这里是评论内容哦这里是评论容哦这里是评论内容哦这里是评论内容哦这里是评论容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦这里是评论内容哦</td>
                        <td width="20%" align="center"><time>2013-01-13 15:06</time></td>
                    </tr>
                </table>
                <!--分页-->
                <div class="paging">
                    <a>第一页</a>
                    <a class="active">2</a>
                    <a>3</a>
                    <a>...</a>
                    <a>89</a>
                    <a>最后一页</a>
                </div>
            </div>
            <!--成交记录-->
            <div class="cont_wrap">
                <table class="table">
                    <tr>
                        <th>买家</th>
                        <th>产品属性</th>
                        <th>数量</th>
                        <th>成交时间</th>
                    </tr>
                    <tr>
                        <td align="center">李**强</td>
                        <td>
                            <p>颜色：黑色</p>
                            <p>规格：M</p>
                        </td>
                        <td align="center"><b>1</b></td>
                        <td align="center"><time>2013-01-13 15:25:39</time></td>
                    </tr>
                    <tr>
                        <td align="center">李**强</td>
                        <td>
                            <p>颜色：黑色</p>
                            <p>规格：L</p>
                        </td>
                        <td align="center"><b>1</b></td>
                        <td align="center"><time>2013-01-13 15:25:39</time></td>
                    </tr>
                    <tr>
                        <td align="center">葛**华</td>
                        <td>
                            <p>颜色：白色</p>
                            <p>规格：XL</p>
                        </td>
                        <td align="center"><b>5</b></td>
                        <td align="center"><time>2013-01-13 15:25:39</time></td>
                    </tr>
                </table>
                <!--分页-->
                <div class="paging">
                    <a>第一页</a>
                    <a class="active">2</a>
                    <a>3</a>
                    <a>...</a>
                    <a>89</a>
                    <a>最后一页</a>
                </div>
            </div>
        </article>
        <aside>
            <dl class="aside_pro_list">
                <dt>
                    <strong>精品推荐</strong>
                    <a>更多</a>
                </dt>
                <dd>
                    <a href="#" class="goods_img"><img src="@/assets/upload/goods002.jpg"/></a>
                    <div class="rt_infor">
                        <h3><a href="#">时尚女装 2019春季针织衫</a></h3>
                        <p><del class="rmb_icon">1298.00</del></p>
                        <p><strong class="rmb_icon">980.00</strong></p>
                    </div>
                </dd>
                <dd>
                    <a href="#" class="goods_img"><img src="@/assets/upload/goods002.jpg"/></a>
                    <div class="rt_infor">
                        <h3><a href="#">时尚女装 2019春季针织衫</a></h3>
                        <p><del class="rmb_icon">1298.00</del></p>
                        <p><strong class="rmb_icon">980.00</strong></p>
                    </div>
                </dd>
                <dd>
                    <a href="#" class="goods_img"><img src="@/assets/upload/goods002.jpg"/></a>
                    <div class="rt_infor">
                        <h3><a href="#">时尚女装 2019春季针织衫</a></h3>
                        <p><del class="rmb_icon">1298.00</del></p>
                        <p><strong class="rmb_icon">980.00</strong></p>
                    </div>
                </dd>
                <dd>
                    <a href="#" class="goods_img"><img src="@/assets/upload/goods002.jpg"/></a>
                    <div class="rt_infor">
                        <h3><a href="#">时尚女装 2019春季针织衫</a></h3>
                        <p><del class="rmb_icon">1298.00</del></p>
                        <p><strong class="rmb_icon">980.00</strong></p>
                    </div>
                </dd>
            </dl>
        </aside>
    </section>
</template>
<script>
    import axios from 'axios'
    import {hide} from "@/assets/js/goodstype.js"
    import "@/assets/js/jquery.jqzoom.js"
    import {interview,preview} from "@/assets/js/base.js"
    import {useUserStore} from '@/stores/index.js'
    export default {
        name: 'Detail',
        mounted(){
            hide();
            interview();//初始化幻灯片
            //发送请求至后端获取相关数据
            axios.get("/api/goods-app/goods/get",{params: {goodsId:this.$route.query.goodsId}}).then(
                result => {
                    this.goods = result.data.data;
                }
            );
            //商品，评价，成交记录的单点切换
            $(".product_detail_btm .item_tab a").click(function(){
                var liindex = $(".product_detail_btm .item_tab a").index(this);
                $(this).addClass("curr_li").parent().siblings().find("a").removeClass("curr_li");
                $(".cont_wrap").eq(liindex).fadeIn(150).siblings(".cont_wrap").hide();
            });
            //radio
            $(".horizontal_attr label").click(function(){
                $(this).addClass("isTrue").siblings().removeClass("isTrue");
            });
        },
        data(){
            return {goods:{
                    /*"goodsId": 0,
                    "goodsName": "",
                    "goodsFactory": "",
                    "goodsExpirationDate": 0,
                    "goodsPlace": "",
                    "goodsSpec": "",
                    "goodsDetail": "",
                    "goodsNum": 0,
                    "goodsEntryPrice": 0,
                    "goodsSourcePrice": 0,
                    "goodsNowPrice": 0,
                    "goodsSaleDate": "",
                    "goodsStatus": 1,*/
                    //"typeId": 0,
                    "type": {},
                    //"goodsFactory": "",
                    //"goodsExpirationDate": 0,
                    "goodsImgs":[]
                }
            };
        },methods:{
            preview(e){
                preview(e.target);
            },
            cart(){
                let user_pinia = useUserStore();
                //发送请求至后端获取相关数据
                axios.put("/api/order-app/orderDetail?token=" + user_pinia.token,{
                    goodsId:this.goods.id,
                    token:user_pinia.token
                }).then(result => {
                    if(result.data.code == "200"){
                        alert("加入购物车成功!");
                    }
                });
            }
        }
    }
</script>