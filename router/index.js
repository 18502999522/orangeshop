import {createRouter,createWebHashHistory} from 'vue-router'
//一级
import Index from '@/components/Index.vue'
import Union from '@/components/Union.vue'
import NotFound from '@/components/NotFound.vue'
//二级
import Center from '@/components/index/Center.vue'
import Login from '@/components/login/Login.vue'
import Reg from '@/components/login/Reg.vue'
import GoodsDetail from '@/components/goods/Detail.vue'
import GoodsSearch from '@/components/goods/List.vue'
import Cart from '@/components/order/Cart.vue'
import Confirm from '@/components/order/Confirm.vue'
import OrderSuccess from '@/components/order/OrderSuccess.vue'
//三级
import PersonalCenter from '@/components/personal/PersonalCenter.vue'
import PersonalIndex from '@/components/personal/Index.vue'
import MyOrders from '@/components/personal/MyOrders.vue'
/*
 * 2.定义路由
 */
const routes = [
    { path: '/', component: Index,
        children:[
            {path:"",component: Center},
            {path:"login",component: Login},
            {path:"reg",component: Reg},
            {path:"goods/detail",component: GoodsDetail},
            {path:"goods/search",component: GoodsSearch},
            {path:"cart",component: Cart},
            {path:"confirm",component: Confirm},
            {path:"orderSuccess",component: OrderSuccess},
            {path:"personal", component:  PersonalCenter,
                children:[
                    {path:"",component: PersonalIndex},
                    {path:"myOrders",component: MyOrders},
                ]
            }
        ]
    },
    { path: '/union', component:  Union},
    { path:"/:pathMatch(.+)", component: NotFound }
];
// 3. 创建 router 实例
const router = createRouter({
    //history: createWebHistory(),
    history: createWebHashHistory(),
    routes // `routes: routes` 的缩写
});
//路由前置守卫
import {useUserStore} from '@/stores/index.js'

router.beforeEach(function(to,from) {
    //console.log(to);// {fullPath:"/confirm?1=1",path:"/confirm"……}
    //console.log(from);
    //必须登录才可使用的功能（前端请求地址）
    let urls = [
        "/cart", //购物车
        "/confirm", //订单确认
        "/personal",//个人中心
    ];
    //当前登录人信息
    const LoginUser = useUserStore().getLoginUser();
    for(let i in urls) {
        //如果当前请求地址需要登录
        if (to.path == urls[i] || to.path.startsWith("/person/")) {
            if (!LoginUser.id) {
                /*
                 * 用户ID为0，说明:
                 * 要么验签没通过，用户信息被删除
                 * 要么没登录
                 */
                //转向登录界面
                router.push("/login");
                return false;//阻止通过
            }
        }
    }
    return true;//允许通过
});
//导出const router定义的实例，前面章节的截图中说过，只有你导出，别的模块才能导入
export default router
