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
    <div class="cateInfo">
      <!-- 左侧边栏 循环一级商品分类 -->
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item v-for='item in firstList' :key='item.id' :title="item.catename" />
      </van-sidebar>
      <!-- 二级分类宫格 循环二级商品分类 -->
      <van-grid :border="false" :column-num="3">
        <van-grid-item :to="'/goodsList?id='+item.id" v-for='item in secondList' :key='item.id'>
          <van-image :src="item.img ? $imgUrl+item.img :'https://img.yzcdn.cn/vant/apple-1.jpg'" />
          <span class="title">{{item.catename}}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
//调取接口
import { getCateTree } from "../util/axios";
export default {
  data() {
    return {
      activeKey: 0,
      firstList:[],//一级分类数组
      secondList:[],//二级分类数组
    };
  },
  mounted() {
    //挂载
    //   调取分类接口
    this.getCateTreeList();
  },
  methods: {
    //封装一个切换侧边边栏的监听事件
    onChange(e) {
      console.log(this.activeKey, "事件源");
      this.secondList = this.firstList[e].children
    },
    //封装一个调取分类树的接口
    getCateTreeList() {
      getCateTree().then(res => {
        console.log(res, "分类树结构");
        if(res.code==200){
            console.log(res);
            this.firstList = res.list
            this.secondList = res.list[this.activeKey].children
        }
      });
    }
  }
};
</script>

<style lang="" scoped>
.cateInfo{
display: flex;
}
.van-grid{
    flex:1
}
.title{
    font-size: 14px;
}
.van-image{
  width: 100px;
  height: 100px;
}
</style>
