<template>
  <div class="login">
    <!-- 
        el-form 属性 model 表单数据对象 rules 表单验证规则 
        el-input clearable可清空    show-password 是否显示密码 
    -->
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="loginForm"
    >
      <el-form-item> 
        <h2>欢迎登录</h2>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
//引入封装接口
import {getUserLogin} from '../util/axios'
export default {
  data() {
    return {
      //表单输入参
      loginForm: {
        username: "",
        password: ""
      },
      //规则验证
      rules: {
        //用户名验证
        username: [
          //必填项验证
          { required: true, message: "请输入用户名", trigger: "blur" },
          //字符验证
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        //密码验证
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    //登录
    login(formName) {
      //console.log(this.$refs[formName],'formDOM')
      //validate 验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          //登录逻辑
          //调取登录接口
          getUserLogin(this.loginForm)
          .then(res=>{
            if(res.data.code==200){
              this.$message.success(res.data.msg)
              //登录成功之后，把登录数据存储到本地存储中
              // sessionStorage.setItem('userInfo',JSON.stringify(res.data.list))
              //登录之后触发修改state的UserInfo的action
              this.changeUserInfoAction(res.data.list)
              //跳转
              this.$router.push('/home')
            }else{
              this.$message.error(res.data.msg)
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl'
.login
  width 100vw
  height 100vh
  background $fristBgColor
  .loginForm
    position absolute
    left 50%
    top 50%
    margin -150px 0 0 -150px
    width 400px
    height 220px
    padding 35px 10px
    // background $thirdBgColor
</style>
