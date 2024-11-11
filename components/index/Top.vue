<template>
    <header>
        <!--topNavBg-->
        <div class="topNavBg">
            <div class="wrap">
                <!--topLeftNav-->
                <ul class="topLtNav">
                    <li v-show="LoginUser.username">
                        您好，{{LoginUser.username}}！
                    </li>
                    <li v-show="LoginUser.username">
                        <a href="javascript:void(0);" @click="logout">
                            退出
                        </a>
                    </li>
                    <li v-show="!LoginUser.username">
                        <router-link to="/login" class="obviousText">
                            登录
                        </router-link>
                    </li>
                    <li v-show="!LoginUser.username">
                        <router-link to="/reg">
                            注册
                        </router-link>
                    </li>
                    <li><a href="#">移动端</a></li>
                </ul>
                <!--topRightNav-->
                <ul class="topRtNav">
                    <li>
                        <router-link to="/personal">
                            个人中心
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/cart" class="cartIcon">
                            购物车
                        </router-link>
                    </li>
                    <li><a href="favorite.html" class="favorIcon">收藏夹</a></li>
                    <li><a href="user.html">商家中心</a></li>
                    <li><a href="article_read.html" class="srvIcon">客户服务</a></li>
                    <li><router-link to="/union" class="active"> 联盟管理 </router-link></li>
                </ul>
            </div>
        </div>
        <!--logoArea-->
        <div class="wrap logoSearch">
            <!--logo-->
            <div class="logo">
                <h1>
                    <router-link to="/" class="active">
                    <img src="@/assets/images/logo.png"/>
                    </router-link>
                </h1>
            </div>
            <!--search-->
            <div class="search">
                <ul class="switchNav">
                    <li class="active" id="chanpin">产品</li>
                    <li id="shangjia">商家</li>
                    <li id="zixun">搭配</li>
                    <li id="wenku">文库</li>
                </ul>
                <div class="searchBox">
                    <div class="inputWrap">
                        <input type="text" v-model="key" placeholder="输入产品关键词或货号"/>
                    </div>
                    <div class="btnWrap">
                        <input type="submit" value="搜索" @click="search"/>
                    </div>
                    <a href="#" class="advancedSearch">高级搜索</a>
                </div>
            </div>
        </div>
        <!--nav-->
        <nav>
            <ul class="wrap navList">
                <li class="category">
                    <a>全部产品分类</a>
                    <dl class="asideNav indexAsideNav">
                        <template v-for="gt in goodstypes">
                            <!-- pId没值，说明是一级 -->
                            <template v-if="!gt.pId">
                                <dt>
                                    <router-link :to="'/goods/search?gtId=' + gt.id + '&gtName=' + gt.name">
                                        {{gt.name}}
                                    </router-link>
                                </dt>
                                <!-- 从集合中找出它的子类（pId等于当前分类id的） -->
                                <dd>
                                    <template v-for="gt2 in goodstypes">
                                        <router-link v-if="gt2.pId == gt.id" :to="'/goods/search?gtId=' + gt2.id + '&gtName=' + gt2.name">{{gt2.name}}</router-link>
                                    </template>
                                </dd>
                            </template>
                        </template>
                    </dl>
                </li>
                <li>
                    <router-link to="/" class="active">
                        首页
                    </router-link>
                </li>
                <li>
                    <a href="#">时尚搭配</a>
                </li>
                <li>
                    <a href="channel.html">原创设计</a>
                </li>
                <li>
                    <a href="channel.html">时尚代购</a>
                </li>
                <li>
                    <a href="channel.html">民族风</a>
                </li>
                <li>
                    <a href="information.html">时尚搭配</a>
                </li>
                <li>
                    <a href="library.html">搭配知识</a>
                </li>
                <li>
                    <a href="#">促销专区</a>
                </li>
                <li>
                    <a href="#">其他</a>
                </li>
            </ul>
        </nav>
    </header>
</template>
<script setup>
    import {useUserStore} from '@/stores/index.js'
    const LoginUser = useUserStore().getLoginUser();
</script>
<script>
import axios from 'axios'
export default {
    name: 'Top',
    data(){
        //搜索的关键字和其它数据
        return {key:"",goodstypes:[]}
    },
    mounted(){
        //查商品分类
        axios.get("/api/goodstype-app/goodsType").then(result => this.goodstypes = result.data.data);
    },
    methods:{
        search(){
            //this.$router.push("/goods/search?key=" + this.key);
            this.$router.push("/goods/search?key=" + this.key + "&t=" + Date.now());
        },
        logout(){
            const LoginUser = useUserStore();
            //删除本地的LocalStorage中的用户
            LoginUser.update(LoginUser.getEmptyUser); //这里注意getEmptyUser相当于computed的属性，不能加()
            //跳首页
            this.$router.push("/");
        }
    }
}
</script>