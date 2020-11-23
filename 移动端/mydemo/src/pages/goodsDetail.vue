<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="$router.back()"
      :title="$route.meta.name"
      left-text="返回"
      left-arrow
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <!-- 商品详情渲染 -->
    <div class="goods" v-if="goodsInfo">
      <img
        class="goodsImg"
        :src="
          goodsInfo.img
            ? $imgUrl + goodsInfo.img
            : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2813350528,1657210790&fm=11&gp=0.jpg'
        "
        alt=""
      />
      <p class="goodsName">商品名称：{{ goodsInfo.goodsname }}</p>
      <p class="goodsName">价格：￥{{ goodsInfo.price.toFixed(2) }}</p>
      <p class="goodsName">
        <!-- 计步器 -->
        购买数量：<van-stepper v-model="value" />
      </p>
      <p>
        商品属性
      </p>
      <p>
        <span>{{ goodsInfo.specsname }}：</span>
        <van-tag v-for="item in specsAttr" :key="item" type="success">{{
          item
        }}</van-tag>
      </p>
      <div>
        <p>商品详情</p>
        <p v-html="goodsInfo.description"></p>
      </div>
    </div>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button @click="goCart" type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { getGoodsInfo,getCartAdd } from "../util/axios";
import {Toast} from 'vant'
export default {
  data() {
    return {
      goodsInfo: "",
      value: 1,
      specsAttr: []
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    //封装获取详情事件
    getInfo() {
      getGoodsInfo({
        id: this.$route.query.id
      }).then(res => {
        if (res.code == 200) {
          this.goodsInfo = res.list[0];
          this.specsAttr = this.goodsInfo.specsattr
            ? this.goodsInfo.specsattr.split(",")
            : [];
          console.log(this.goodsInfo, "hahah");
        }
      });
    },
    //封装加入购物车事件
    goCart(){
      if(sessionStorage.getItem('userInfo')){
        //已登录 调取加入购物车接口，并跳转到购物车列表
        getCartAdd({
          uid: JSON.parse(sessionStorage.getItem('userInfo')).uid,
          goodsid:this.goodsInfo.id,
          num:this.value
        }).then(res=>{
          Toast.success(res.msg)
          this.$router.push({
            path:'/cart',
            query:{
              id:JSON.parse(sessionStorage.getItem('userInfo')).uid
            }
          })
        })
      }else{
        Toast.fail('当前为登录，请先登录')
        this.$router.push('/login')
      }
    }
  }
};
</script>

<style lang="" scoped>
.goodsImg {
  width: 100%;
  height: 4rem;
}
.goods p {
  font-size: 18px;
}
.van-stepper {
  display: inline;
}
</style>
