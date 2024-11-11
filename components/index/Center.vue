<template>
    <section class="wrap">
        <!--ctCont-->
        <div class="IdxmainArea">
            <!--slide-->
            <div id="slide">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <a href="#">
                            <img src="@/assets/upload/slide01.jpg"/>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="#">
                            <img src="@/assets/upload/slide02.jpg"/>
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="#">
                            <img src="@/assets/upload/slide03.jpg"/>
                        </a>
                    </div>
                </div>
                <div class="pagination"></div>
            </div>
            <!--singleAd-->
            <div class="singleAd">
                <a href="#">
                    <img src="@/assets/upload/sigleAd.jpg"/>
                </a>
            </div>
            <!--bestShop-->
            <dl class="bestShop">
                <dt>
                    <strong>优秀商家推荐</strong>
                    <a href="shop_list.html" class="fr">更多</a>
                </dt>
                <dd>
                    <a href="shop.html">
                        <img src="@/assets/upload/001.jpg"/>
                        <h2>DM精品女装</h2>
                    </a>
                </dd>
                <dd>
                    <a href="shop.html">
                        <img src="@/assets/upload/002.jpg"/>
                        <h2>DM精品女装</h2>
                    </a>
                </dd>
                <dd>
                    <a href="shop.html">
                        <img src="@/assets/upload/003.jpg"/>
                        <h2>DM精品女装</h2>
                    </a>
                </dd>
                <dd>
                    <a href="shop.html">
                        <img src="@/assets/upload/004.jpg"/>
                        <h2>DM精品女装</h2>
                    </a>
                </dd>
                <dd>
                    <a href="shop.html">
                        <img src="@/assets/upload/005.jpg"/>
                        <h2>DM精品女装</h2>
                    </a>
                </dd>
                <dd>
                    <a href="shop.html">
                        <img src="@/assets/upload/006.jpg"/>
                        <h2>DM精品女装</h2>
                    </a>
                </dd>
                <dd>
                    <a href="shop.html">
                        <img src="@/assets/upload/007.jpg"/>
                        <h2>DM精品女装</h2>
                    </a>
                </dd>
                <dd>
                    <a href="shop.html">
                        <img src="@/assets/upload/008.jpg"/>
                        <h2>DM精品女装</h2>
                    </a>
                </dd>
            </dl>
        </div>
        <!--asdCont-->
        <div class="IdxAsideRt">
            <!--login-->
            <div class="idxRtLogin">
                <div class="fstArea">
                    <a href="#" class="userIcon">
                        <img src="@/assets/images/icon/DefaultAvatar.jpg">
                    </a>
                    <div class="rtInfor">
                        <p v-show="LoginUser.username">Hi!{{LoginUser.username}}</p>
                        <p v-show="!LoginUser.username">Hi!您好</p>
                        <p class="obviousText">免费入驻，提升品牌效应！</p>
                    </div>
                </div>
                <div class="secArea">
                    <router-link to="/logout" v-show="LoginUser.username">
                        退出
                    </router-link>
                    <router-link to="/login" v-show="!LoginUser.username">
                        登录
                    </router-link>
                    <router-link to="/reg" v-show="!LoginUser.username">
                        免费注册
                    </router-link>
                    <a href="register.html">商户入驻</a>
                </div>
            </div>
            <dl class="idxRtAtc">
                <dt>
                    <em class="obviousText">最新公告</em>
                    <a href="article_list.html">more</a>
                </dt>
                <dd><a href="article_read.html">2015年12月20日系统升级通告统升级通告</a></dd>
                <dd><a href="article_read.html">2015年12月20日系统升级通告</a></dd>
                <dd><a href="article_read.html">2015年12月20日系统升级通告</a></dd>
                <dd><a href="article_read.html">2015年12月20日系统升级通告</a></dd>
                <dd><a href="article_read.html">2015年12月20日系统升级通告</a></dd>
            </dl>
            <dl class="idxRtAtc">
                <dt>
                    <em>质量标准技术参数</em>
                    <a href="article_list.html">more</a>
                </dt>
                <dd><a href="article_read.html">2015年12月20日系统升级通告统升级通告</a></dd>
                <dd><a href="article_read.html">2015年12月20日系统升级通告</a></dd>
            </dl>
        </div>
    </section>
    <!--productList-->
    <section class="wrap idxproLi">
        <h2>
            <strong>
                <a href="channel.html">产品展示区</a>
            </strong>
            <span class="classLi">
               <a href="product_list.html">夏装</a>
               <a href="product_list.html">连衣裙</a>
               <a href="product_list.html">开衫</a>
               <a href="product_list.html">牛仔裤</a>
               <a href="product_list.html">背带裤</a>
               <a href="product_list.html">T恤</a>
            </span>
        </h2>
        <div class="ltArea">
            <!--ad:category pic-->
            <a href="product_list.html"><img src="@/assets/upload/bestCategoryPic01.jpg"/></a>
        </div>
        <div class="ctLi">
            <ul>
                <li>
                    <router-link to="/goods/detail?goodsId=1">
                        <img src="@/assets/upload/goods001.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>1000.00</span></p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/goods/detail?goodsId=2">
                        <img src="@/assets/upload/goods003.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>545.00</span></p>
                    </router-link>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods004.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>1000.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods003.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>1000.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods001.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>980.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods002.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>642.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods004.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>793.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods001.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>755.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods002.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>360.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods003.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>1255.00</span></p>
                    </a>
                </li>
            </ul>
            <!--bestBrand-->
            <div class="idxBrandLi">
                <a href="shop.html"><img src="@/assets/upload/brandLogo01.jpg"/></a>
                <a href="shop.html"><img src="@/assets/upload/brandLogo02.jpg"/></a>
                <a href="shop.html"><img src="@/assets/upload/brandLogo03.jpg"/></a>
                <a href="shop.html"><img src="@/assets/upload/brandLogo04.jpg"/></a>
            </div>
        </div>
    </section>

    <section class="wrap idxproLi">
        <h2>
            <strong>
                <a href="channel.html">设备展示区</a>
            </strong>
            <span class="classLi">
   <a href="product_list.html">夏装</a>
   <a href="product_list.html">连衣裙</a>
   <a href="product_list.html">开衫</a>
   <a href="product_list.html">牛仔裤</a>
   <a href="product_list.html">背带裤</a>
   <a href="product_list.html">T恤</a>
  </span>
        </h2>
        <div class="ltArea">
            <!--ad:category pic-->
            <a href="product_list.html"><img src="@/assets/upload/bestCategoryPic02.jpg"/></a>
        </div>
        <div class="ctLi">
            <ul>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods005.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>1000.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods006.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>545.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods007.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>1000.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods008.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>1000.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods009.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>980.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods010.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>642.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods005.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>793.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods006.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>755.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods007.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>360.00</span></p>
                    </a>
                </li>
                <li>
                    <a href="product.html">
                        <img src="@/assets/upload/goods008.jpg"/>
                        <h3>2019时尚新款</h3>
                        <p><span>1255.00</span></p>
                    </a>
                </li>
            </ul>
            <!--bestBrand-->
            <div class="idxBrandLi">
                <a href="shop.html"><img src="@/assets/upload/brandLogo01.jpg"/></a>
                <a href="shop.html"><img src="@/assets/upload/brandLogo02.jpg"/></a>
                <a href="shop.html"><img src="@/assets/upload/brandLogo03.jpg"/></a>
                <a href="shop.html"><img src="@/assets/upload/brandLogo04.jpg"/></a>
            </div>
        </div>
    </section>
    <!--case-->
    <section class="wrap idexCase">
        <h2>
            <strong>工程案例</strong>
            <a href="#">more</a>
        </h2>
        <ul>
            <li>
                <a href="#">
                    <img src="@/assets/upload/case001.jpg"/>
                    <h3>时尚搭配案例</h3>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="@/assets/upload/case002.jpg"/>
                    <h3>时尚搭配案例</h3>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="@/assets/upload/case003.jpg"/>
                    <h3>时尚搭配案例</h3>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="@/assets/upload/case004.jpg"/>
                    <h3>时尚搭配案例</h3>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="@/assets/upload/case005.jpg"/>
                    <h3>时尚搭配案例</h3>
                </a>
            </li>
        </ul>
    </section>
</template>
<script setup>
    import {useUserStore} from '@/stores/index.js'
    const LoginUser = useUserStore();
</script>
<script>
    import {show} from "@/assets/js/goodstype.js"
    export default {
        name: 'Center',
        mounted(){
            show();
        }
    }
</script>