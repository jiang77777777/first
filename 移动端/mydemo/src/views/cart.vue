<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="$router.back()"
      :title="$route.meta.name"
      left-text="返回"
      left-arrow
    >
    </van-nav-bar>
    <!-- 滑动单元格 -->
    <div v-if="cartList.length > 0 && userInfo">
      <div class="cartInfo" v-for="item in cartList" :key="item.id">
        <van-checkbox 
         @change="checkOne"
         v-model="item.val"></van-checkbox>
        <van-swipe-cell>
          <van-card
            :num="item.num"
            :price="item.price"
            desc="描述信息"
            :title="item.goodsname"
            class="goods-card"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : 'https://img.yzcdn.cn/vant/cat.jpeg'
            "

          >
            <template #footer>
              <div>
                <van-stepper
                  v-model="goodsNum"
                  theme="round"
                  button-size="22"
                  disable-input
                />
              </div>
            </template>
          </van-card>
          <template #right>
            <van-button
              @click="cartDelte(item.id)"
              square
              text="删除"
              type="danger"
              class="delete-button"
            />
          </template>
        </van-swipe-cell>
        <!-- 底部提交订单栏 -->
        <van-submit-bar :price="3050" button-text="提交订单" @submit="goOrder">
          <van-checkbox @change="checkAll"
             v-model="allCheck"
          >全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>
    <div v-else-if="cartList.length == 0 && userInfo">
      <van-empty description="购物车空空如也，快去买买买！！！" />
    </div>
    <div v-else>
      <van-button @click="$router.push('/login')" type="warning"
        >请先登录，再查看</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getCartList, getCartDelete } from "../util/axios";
export default {
  data() {
    return {
      goodsNum: 1,
      cartList: [],
      userInfo: "",
      allCheck:false
    };
  },
  mounted() {
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : "";
    //组件加载调取购物车
    this.cartListInfo();
  },
  methods: {
    //全选事件
    checkAll() {
      console.log(this.allCheck, "全选");

      this.cartList.map((item) => (item.val = this.allCheck));
    },
    //单选事件
    checkOne() {
      this.allCheck = this.cartList.every((item) => item.val);
    },
    //封装获取列表接口
    cartListInfo() {
      getCartList({
        uid: this.$route.query.id,
      }).then((res) => {
        console.log(res, "购物车列表");
        if (res.code == 200) {
          if ((this.cartList.length = null)) {
            this.cartList.length = 0;
          }
          this.cartList = res.list;
        }
      });
    },
    // 封装删除列表
    cartDelte(id) {
      getCartDelete({
        id,
      }).then((res) => {
        if (res.code == 200) {
          Toast.success(res.msg);
          this.cartList = res.list;
        }
      });
    },
    //提交订单页
    goOrder(id) {
      this.$router.push({
        path: "/mine.vue",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="" scoped>
.goods-card {
  margin: 0;
  background-color: #fff;
}

.delete-button {
  height: 100%;
}
.cartInfo {
  display: flex;
}
.van-swipe-cell {
  flex: 1;
}
.van-checkbox {
  padding-left: 15px;
  width: 20px;
}
</style>
