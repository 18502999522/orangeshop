import { defineStore } from 'pinia'
import {parseTokenPayloadValid} from '@/assets/js/jwt.vue.js'

export const useUserStore = defineStore('UserStore',{
    state: () => ({id:0,username:"",gender:"",age:0,token:""}),//注：这个初始值必须有！
    getters: {//相当于computed
        getEmptyUser: () => ({id:0,username:"",gender:"",age:0,token:""})//加小括号是避免被以为是语句块
    },
    actions: {//相当于methods
        update(user){
            this.$patch(()=>{
                this.id=user.id;
                this.username=user.name ? user.name : user.username;
                this.gender=user.gender;
                this.age=user.age;
                if(user.token)
                    this.token=user.token;
            });
        },
        getLoginUser(){//获得token期内有效的用户,getters是带缓存的不可使用，要用actions
            if(this.token && !parseTokenPayloadValid(this.token)){
                console.log("用户登录已超期");
                //存在token，且验签未通过，删除本地的LocalStorage中的用户
                this.update(this.getEmptyUser);
            }
            return this;
        }
    },
    persist: {
        enabled: true,// 开启数据持久化
        strategies: [{storage: localStorage}]//将状态存入到localStorage中
    }
});
