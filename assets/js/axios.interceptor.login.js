import axios from 'axios';
import router from '@/router'
import {useUserStore} from '@/stores/index.js'

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    console.log("url:" + config.url + ",method:" + config.method);
    //必须登录才可使用的功能（后端接口地址）
    let urls = [
        "/api/order-app/orderDetail", //购物车
        "/api/adress-app/recive", //收货人信息
        "/api/order-app/order" //订单
    ];
    //当前登录人信息
    const LoginUser = useUserStore().getLoginUser();
    for(let i in urls){
        if(config.url.startsWith(urls[i])){//如果当前请求地址需要登录
            if(!LoginUser.id){
                /*
                 * 用户ID为0，说明:
                 * 要么验签没通过，用户信息被删除
                 * 要么没登录
                 */
                // 取消发送方法1
                // config.cancelToken = new axios.CancelToken(cancel => {
                //     //转向登录界面
                //     router.push("/login");
                //     cancel("登录已超期");
                // })
                // 取消发送方法2
                // let ac = new AbortController();
                // config.signal = ac.signal
                // ac.abort();
                // 取消发送方法3
                //转向登录界面
                router.push("/login");
                throw new Error('Token expired');
            }
        }
    }
    return config;
});