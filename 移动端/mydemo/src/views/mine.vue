<template>
  <div>
    <div class="bgc">
      <!-- 导航栏 -->
      <van-nav-bar
        @click-left="$router.back()"
        :title="$route.meta.name"
        left-text="返回"
        left-arrow
      >
      </van-nav-bar>
      <!-- 个人中心详情 -->
      <div class="userInfo" v-if="!userInfo">
        <!-- 头像 -->
        <van-image
          round
          width="2.4rem"
          height="2.4rem"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <!-- 姓名 -->
        <van-cell class="username"> XXX </van-cell>
        <van-button @click="$router.push('/login')" type="info"
          >未登录，请登录</van-button
        >
      </div>
      <div class="userInfo" v-else>
        <!-- 头像 -->
        <van-image
          round
          width="2.4rem"
          height="2.4rem"
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1798548542,672372769&fm=26&gp=0.jpg"
        />
        <!-- 姓名 -->
        <van-cell class="username">
          {{ userInfo.nickname }}
        </van-cell>
        <van-button @click="quit" type="info">退出登录</van-button>

        <div class="got">
          <van-cell class="set" title="已购买的皮肤" icon="location-o" />
          <van-cell class="set" title="我的英雄" icon="balance-list-o" />
          <van-cell class="set" title="我的生涯" icon="coupon-o" />
          <van-cell class="set" title="游戏战绩" icon="aim" />
        </div>
      </div>

      <van-image  style="margin-bottom: 20px"   src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1798548542,672372769&fm=26&gp=0.jpg">
        <template v-slot:loading >
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
  
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: "",
    };
  },
  mounted() {
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : "";
    console.log(this.userInfo, "哈哈哈哈");
  },
  methods: {
    //退出登录事件
    quit() {
      //删除存储
      sessionStorage.removeItem("userInfo");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="" scoped>
.van-image{
    width: 2.4rem;
    height: 2.4rem;
}
.userInfo {
  text-align: center;
}
.van-cell__value {
  text-align: center !important;
}
.van-cell {
  text-align: left;
}
.set {
  border-bottom: 1px solid red;
  text-align: center;
}
.bgc {
  background: url("../assets/img/下载.jpg") no-repeat;
}
</style>
