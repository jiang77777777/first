<template>
  <div>
    <el-container>
      <el-header class="head">
        XXX大型后台管理项目
        <div v-if="getUserInfo" class="userInfo">
        欢迎  {{getUserInfo.username}} 登录本系统
          <el-button @click="logout" type='danger' size='small'>退出</el-button>
        </div>
        </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 引入导航菜单 -->
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//引入nav导航组件
import {mapGetters,mapActions} from 'vuex'
//引入nav导航组件
import vNav from "../components/nav";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUserInfo"])
  },
  components: {
    vNav
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    //logout退出事件
    logout(){
      console.log(1);
      this.changeUserInfoAction(null)
      //退出之后强制跳转登录页
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl'
.el-header
    background $thirdBgColor
    text-align center
    line-height 50px
    color #fff
    font-weight bold
.el-button
    float right
</style>
