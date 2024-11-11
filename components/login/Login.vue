<template>
    <section class="wrap user_form">
        <div class="lt_img">
            <img src="@/assets/images/form_bg.jpg"/>
        </div>
        <div class="rt_form">
            <h2>会员登录
                <a @click="change" href="javascript:void(0);" style="float: right;font-size: 14px;font-weight: lighter">
                    {{loginTypeText}}
                </a>
            </h2>
            <ul>
                <li class="user_icon">
                    <input type="text" class="textbox" placeholder="手机号码" v-model.lazy="phone" maxlength="11"/>
                </li>
                <li class="user_pwd" v-show="!loginType">
                    <input type="password" class="textbox" placeholder="密码" v-model.lazy="pwd" maxlength="16"/>
                </li>
                <li class="link_li" v-show="loginType">
                    <input @click="sendCode" v-model="sendText" :class="send?'sbmt_btn':'get_num_btn'" type="button"/>
                </li>
                <li class="user_cc" v-show="loginType">
                    <input v-model.lazy="code" type="text" class="textbox" placeholder="手机校验码" maxlength="4"/>
                </li>
                <li class="link_li">
                    <router-link to="/reg" title="注册新用户" class="fl">
                        注册新用户
                    </router-link>
                    <a href="find_pwd.html" title="忘记密码" class="fr">忘记密码？</a>
                </li>
                <li class="link_li">
                    <input @click="login" :class="canLogin?'sbmt_btn':'get_num_btn'" type="button" value="立即登录"/>
                </li>
                <li class="link_li" style="color: red" v-show="error" v-html="error"></li>
            </ul>
        </div>
    </section>
</template>
<script>
    import axios from 'axios'
    import {hide} from "@/assets/js/goodstype.js"
    import {useUserStore} from '@/stores/index.js'
    import {parseTokenPayload} from '@/assets/js/jwt.vue.js'
    export default {
        name: 'Login',
        mounted(){
            hide();
        },
        data() {
            return {
                phone: "13333333333",
                pwd: "123456",
                send: false, //是否可以发送验证码
                sendText: "获取手机校验码",//发送按钮上的文字
                code: "",
                loginType: 0,//登录类型：0 手机号+密码，1 手机号+验证码
                loginTypeText: "验证码登录",//登录类型对应的菜单文字
                error:"" //在立即注册按钮的上方显示的错误信息
            }
        },
        computed: {
            canLogin() {
                /*
                 * 所有表单数据是否通过了合法性的校验
                 * 注：computed虽然是函数，但调用形式是属性的调用形式，不需要()
                 */
                let pwdOrCode = this.loginType ? this.codeValidate : this.pwdValidate;
                return this.phoneValidate && pwdOrCode;
            },
            phoneValidate(){
                if(!/^1[3456789]\d{9}$/.test(this.phone)){
                    this.errorMsg(this.phone,"请输入正确的手机号");
                    this.send = false;//禁用发送验证码按钮
                    return false
                }
                //合法则错误信息置空
                this.errorMsg(this.phone,"");
                //启用发送验证码按钮
                this.send = true;
                return true
            },
            pwdValidate(){
                let length = this.pwd.length;
                if(length < 6){
                    this.errorMsg(this.pwd,"密码太短，至少6位");
                    return false
                }else if(length > 16){
                    this.errorMsg(true,"密码太长，至多16位");
                    return false
                }
                //合法则错误信息置空
                this.errorMsg(this.phone,"");
                return true
            },
            codeValidate(){
                let length = this.code.length;
                if(length != 4){
                    this.errorMsg(this.code,"请输入4位手机验证码");
                    return false
                }
                //合法则错误信息置空
                this.errorMsg(this.phone,"");
                return true
            }
        },
        methods:{
            change(){
                //切换登录
                this.loginType = this.loginType ? 0 : 1;
                this.loginTypeText = this.loginType ? "密码登录" : "验证码登录";
            },
            errorMsg(value,msg){
                /*
                 * 仅当value有值时才验证此项信息的正确性，且显示错误信息
                 */
                if(value) this.error = msg;
                else this.error = ""
            },
            sendCode(){
                let dataObject = this;
                axios.get("/json/login/code.json?phone=" + dataObject.phone).then(
                    result => {
                        //无论是成功，还是失败（非异常），均隔60秒可再发
                        let code = result.data.code;
                        if(code == "200" || code == "-1"){
                            let second = 60;
                            let timer = window.setInterval(
                                () => {
                                    second--;
                                    let text = "已发送，" + second + "秒后可再次获取";
                                    let send = false; //发送按钮禁用
                                    if(!second){//second == 0
                                        text = "获取手机校验码";
                                        send = true; //发送按钮启用
                                        window.clearInterval(timer);//关停定时器
                                    }
                                    dataObject.sendText = text;
                                    dataObject.send = send;
                                },
                                1000
                            );
                            if(code == "-1"){
                                //显示错误信息
                                dataObject.error = result.data.msg;
                            }
                        }
                    }
                );
            },
            login(){
                let dataObject = this;
                axios.post("/api/user-app/login",{//携带3项参数
                            userPhone: this.phone,
                            userPwd: this.loginType ? this.code : this.pwd,
                            loginType: this.loginType
                }).then(
                    result => {
                        let code = result.data.code;
                        if(code == "200"){
                            let jwt = result.data.data;
                            let user_server = parseTokenPayload(jwt);
                            let user_local = {
                                "id": user_server.id,
                                "name": user_server.name,
                                "gender": user_server.gender,
                                "age": user_server.age,
                                "token": jwt
                            };
                            /*
                             * 登录成功，在pinia中存储用户信息
                             */
                            //在pinia中存储用户信息
                            let user_pinia = useUserStore();
                            user_pinia.update(user_local);
                            console.log(user_pinia);
                            //跳转首页
                            this.$router.push("/");
                        }else{
                            //显示错误信息
                            dataObject.error = result.data.msg;
                        }
                    }
                );

            }
        }
    }
</script>