<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="$router.back()"
      :title="$route.meta.name"
      left-text="返回"
      left-arrow
       right-text="注册"
       @click-right='$router.push("/register")'
    />
    <!-- 表单项 -->
    <van-form @submit="login">
      <van-field
        v-model="loginInfo.phone"
        name="手机号"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="loginInfo.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
      <div>
          <van-button @click='$router.push("/register")' type='warning'>未注册，先去注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {getLogin} from '../util/axios'
import {Toast} from 'vant'
export default {
  data() {
    return {
      loginInfo: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    //封装一个登录事件
    login() {
       getLogin(this.loginInfo)
          .then(res=>{
              if(res.code==200){
                  Toast.success(res.msg)
                  //把数据存储到本地存储中
                  sessionStorage.setItem('userInfo',JSON.stringify(res.list))
                  //成功之后跳转到个人中心
                  this.$router.push('/mine')
              }else{
                    Toast.fail(res.msg)
              }
          })
    }
  }
};
</script>

<style lang="" scoped></style>
