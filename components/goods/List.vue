<template>
    <section class="wrap list_class_page">
        <div class="lt_area">
            <div class="attr_filter">
                <h2>属性筛选</h2>
                <ul>
                    <li v-show="condition.gtId">
                        <dl>
                            <dt>所属分类：</dt>
                            <dd>
                                {{condition.gtName}}
                            </dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>按价格筛选：</dt>
                            <dd>
                                <a :style="pstyle('0~100')" @click="pclick('0~100')">0~100元</a>
                                <a :style="pstyle('100~300')" @click="pclick('100~300')">100~300元</a>
                                <a :style="pstyle('300~500')" @click="pclick('300~500')">300~500元</a>
                                <a :style="pstyle('500~1000')" @click="pclick('500~1000')">500~1000元</a>
                                <a :style="pstyle('1000~3000')" @click="pclick('1000~3000')">1000~3000元</a>
                                <a :style="pstyle('3000~10000')" @click="pclick('3000~10000')">3000~10000元</a>
                                <a :style="pstyle('10000~')" @click="pclick('10000~')">10000元以上</a>
                            </dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>按上架时间筛选：</dt>
                            <dd>
                                <a :style="tstyle('today')" @click="tclick('today')">今天</a>
                                <a :style="tstyle('week')" @click="tclick('week')">本周</a>
                                <a :style="tstyle('month')" @click="tclick('month')">本月</a>
                                <a :style="tstyle('quarter')" @click="tclick('quarter')">本季</a>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <!--产品列表-->
            <section class="shop_goods_li">
                <h2>产品列表</h2>
                <ul class="favorite_list">
                    <li v-for="goods in data.list">
                        <router-link :to="'/goods/detail?goodsId=' + goods.id">
                            <img :src="goods.img"/>
                            <h3>{{goods.name}}</h3>
                            <p class="price"><span class="rmb_icon">{{goods.price}}</span></p>
                            <p class="shop_collect_goods" title="收藏该产品"><span>&#115;</span></p>
                        </router-link>
                    </li>
                </ul>
                <!--分页-->
                <div class="paging">
                    <a v-show="data.hasPreviousPage" @click="pageclick(1)">首页</a>
                    <a v-for="pno in data.navigatepageNums" v-text="pno" :class="{active:data.pageNum == pno}" @click="pageclick(pno)"></a>
                    <a v-show="data.hasNextPage" @click="pageclick(data.pages)">尾页</a>
                </div>
            </section>
        </div>
        <aside class="rtWrap">
            <dl class="rtLiTwoCol">
                <dt>热门推荐</dt>
                <dd>
                    <a href="product.html">
                        <img src="@/assets/upload/goods002.jpg"/>
                        <p>0.00</p>
                    </a>
                </dd>
                <dd>
                    <a href="product.html">
                        <img src="@/assets/upload/goods001.jpg"/>
                        <p>0.00</p>
                    </a>
                </dd>
                <dd>
                    <a href="product.html">
                        <img src="@/assets/upload/goods003.jpg"/>
                        <p>0.00</p>
                    </a>
                </dd>
                <dd>
                    <a href="product.html">
                        <img src="@/assets/upload/goods004.jpg"/>
                        <p>0.00</p>
                    </a>
                </dd>
                <dd>
                    <a href="product.html">
                        <img src="@/assets/upload/goods008.jpg"/>
                        <p>0.00</p>
                    </a>
                </dd>
                <dd>
                    <a href="product.html">
                        <img src="@/assets/upload/goods007.jpg"/>
                        <p>0.00</p>
                    </a>
                </dd>
                <dd>
                    <a href="product.html">
                        <img src="@/assets/upload/goods006.jpg"/>
                        <p>0.00</p>
                    </a>
                </dd>
                <dd>
                    <a href="product.html">
                        <img src="@/assets/upload/goods005.jpg"/>
                        <p>0.00</p>
                    </a>
                </dd>
                <dd>
                    <a href="product.html">
                        <img src="@/assets/upload/goods008.jpg"/>
                        <p>0.00</p>
                    </a>
                </dd>
                <dd>
                    <a href="product.html">
                        <img src="@/assets/upload/goods007.jpg"/>
                        <p>0.00</p>
                    </a>
                </dd>
                <dd>
                    <a href="product.html">
                        <img src="@/assets/upload/goods006.jpg"/>
                        <p>0.00</p>
                    </a>
                </dd>
                <dd>
                    <a href="product.html">
                        <img src="@/assets/upload/goods005.jpg"/>
                        <p>0.00</p>
                    </a>
                </dd>
            </dl>
        </aside>
    </section>
</template>
<script>
    import axios from 'axios'
    import {removeEmptyProperties} from "@/assets/js/util.js"
    import {hide} from "@/assets/js/goodstype.js"
    export default {
        name: 'List',
        data(){
            return {
                condition:{gtId: 0,gtName: "",price: "",time: "",pageNum: 1},//搜索条件
                data: []//数据（商品集合+分页）
            };
        },
        mounted(){
            hide();
            //接收请求中的参数
            let params = this.$route.query;
            let gtId = params.gtId;
            let gtName = params.gtName;
            let price = params.price;
            let time = params.time;
            let key = params.key;
            //用于界面回显及后端请求
            if(gtId){
                this.condition.gtId = gtId;
                this.condition.gtName = gtName;
            }
            if(time) this.condition.time = time;
            if(key) this.condition.key = key;
            if(price){
                let prices = price.split("~");
                this.condition.priceBegin = prices[0];
                this.condition.priceEnd = prices[1];
            }
            this.search();//执行搜索
        },
        methods:{
            getImgUrl(img){
                // 注意：require使用webpack打包，无法预知未知变量路径，所以尽量把路径写的更精确，范围更小
                //return require("@/assets/" + img); 错误
                return require("@/assets/upload/" + img);//正确
            },
            pstyle(price){//价格是否拥有红色样式
                let colorStyle = {};
                if (price == this.condition.price)
                    colorStyle.color = "#ff4400";
                return colorStyle
            },
            tstyle(time){//上架时间是否拥有红色样式
                let colorStyle = {};
                if (time == this.condition.time)
                    colorStyle.color = "#ff4400";
                return colorStyle
            },
            pclick(price){
                let prices = price.split("~");
                this.condition.priceBegin = prices[0];
                this.condition.priceEnd = prices[1];
                //更改为红色样式，以及搜索对象值
                this.condition.price = price;
                //重新发请求
                this.search();
            },
            tclick(time){
                //更改为红色样式，以及搜索对象值
                this.condition.time = time;
                //重新发请求
                this.search();
            },
            pageclick(no){
                //更改页号
                this.condition.pageNum = no;
                //重新发请求
                this.search();
            },
            search(){
                //发送请求至后端获取相关数据
                axios.get("/api/goods-app/goods/search",{params: removeEmptyProperties(this.condition)}).then(
                    result => {
                        this.data = result.data.data;
                        //服务器回过来的数据是包含目标页号的，此处仅为静态效果，实际不需要下面这段代码
                        let pageNum = this.condition.pageNum;
                        //console.log(pageNum);
                        if(pageNum)
                            this.data.pageNum = pageNum;
                    }
                );
            }
        }
    }
</script>