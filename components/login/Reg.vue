<template>
    <section class="wrap user_form">
        <div class="lt_img">
            <img src="@/assets/images/form_bg.jpg"/>
        </div>
        <div class="rt_form">
            <h2>会员注册</h2>
            <ul>
                <li class="user_icon">
                    <input type="text" class="textbox" placeholder="手机号码" v-model.lazy="phone" maxlength="11"/>
                </li>
                <li class="user_pwd">
                    <input type="password" class="textbox" placeholder="设置密码" v-model.lazy="pwd" maxlength="16"/>
                </li>
                <li class="user_pwd">
                    <input type="password" class="textbox" placeholder="确认密码" v-model.lazy="rePwd" maxlength="16"/>
                </li>
                <!--<li class="link_li">
                 <input type="button" value="50秒后可再次获取" class="get_num_btn"/>
                </li>-->
                <li class="link_li">
                    <input @click="sendCode" v-model="sendText" :class="send?'sbmt_btn':'get_num_btn'" type="button"/>
                </li>
                <li class="user_cc">
                 <input v-model.lazy="code" type="text" class="textbox" placeholder="手机校验码" maxlength="4"/>
                </li>
                <li class="link_li">
                    <label><input type="checkbox" value="1" v-model="agree"/><a>阅读注册协议</a></label>
                    <router-link to="/login" title="登录账号" class="fr">
                        已有账号，立即登录？
                    </router-link>
                </li>
                <li class="link_li" style="color: red" v-show="error" v-html="error"></li>
                <li class="link_li">
                    <input @click="reg" :class="canReg?'sbmt_btn':'get_num_btn'" value="立即注册" type="button"/>
                </li>
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
        name: 'Reg',
        mounted(){
            hide();
        },
        data() {
            return {
                phone: "",
                pwd: "",
                rePwd: "",
                send: false, //是否可以发送验证码
                sendText: "获取手机校验码",//发送按钮上的文字
                code: "",
                agree: [],//是否勾选了同意协议，注：复选框的值用数组表示
                error:"" //在立即注册按钮的上方显示的错误信息
            }
        },
        computed: {
            canReg() {
                /*
                 * 所有表单数据是否通过了合法性的校验
                 * 注：computed虽然是函数，但调用形式是属性的调用形式，不需要()
                 */
                return this.phoneValidate && this.pwdValidate && this.codeValidate && this.agreeValidate
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
                }else if(this.pwd != this.rePwd){
                    this.errorMsg(this.rePwd,"两次输入的密码不一致");
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
            },
            agreeValidate(){
                if(!this.agree[0]){
                    this.errorMsg(true,"请勾选已阅读注册协议");
                    return false
                }
                //合法则错误信息置空
                this.errorMsg(this.phone,"");
                return true
            }
        },
        methods:{
            errorMsg(value,msg){
                /*
                 * 仅当value有值时才验证此项信息的正确性，且显示错误信息
                 */
                if(value) this.error = msg;
                else this.error = ""
            },
            sendCode(){
                let dataObject = this;
                axios.get("/api/user-app/reg/code?phone=" + dataObject.phone).then(
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
            reg(){
                let dataObject = this;
                axios.post("/api/user-app/reg",{
                    userPhone: this.phone,
                    userPwd: this.pwd,
                    code: this.code
                }).then(
                    result => {
                        let jwt = result.data.data;
                        let user_server = parseTokenPayload(jwt);
                        let user_local = {
                            "id": user_server.id,
                            "name": user_server.name,
                            "gender": user_server.gender,
                            "age": user_server.age,
                            "token": jwt
                        };
                        let code = result.data.code;
                        if(code == "200"){
                            /*
                             * 注册成功，在pinia中存储用户信息，并在界面上显示
                             */
                            //在pinia中存储用户信息
                            let user_pinia = useUserStore();
                            user_pinia.update(user_local);
                            console.log("pinia中的用户：");
                            console.log(user_pinia);
                            //界面显示不在当前页，在TOP中
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