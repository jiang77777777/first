<template>
  <div>
    <el-table
      :data="goodsList"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
      >>
      <el-table-column prop="id" label="商品编号" width="130">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="130">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="130">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="130">
      </el-table-column>
      <el-table-column label="图片" prop='img'>
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl + item.row.img" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" width="60">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" width="60">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="60" prop='status'>
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(item.row.id)" size="small"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
       <el-pagination
      :page-size="goodsSize"
      background
      layout="prev, pager, next"
      :total="goodsCount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";
import { getGoodsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/getGoodsList", 
      goodsSize:'goods/getGoodsSize',
      goodsCount:'goods/getGoodsCount',

    }),
  },
  mounted() {
    //组件一加载就触发调取列表
    this.getGoodsAction();
    //调取总条数
    this.getGoodsCount();
  },
  methods: {
    ...mapActions({
      getGoodsAction: "goods/getGoodsAction",
      getGoodsCount:'goods/getCountAction',
      changePage:'goods/changePageAction'
    }),
    //点击编辑获取id
    edit(id) {
      //把id给父组件menu,之后供弹框使用
      this.$emit("edit", id);
    },
    //封装一个删除事件
    del(id) {
      this.$confirm("确定要删除这条数据吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getGoodsDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新触发调取列表
              this.getGoodsAction();
              this.getGoodsCount();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
      currentChange(e) {
    console.log(e, "当前页");
    this.changePage(e);
  },
  },

};
</script>

<style lang="" scoped>
.img {
  width: 200px;
  height: 100px;
}/* 分页样式 */
.el-pagination {
  float: right;
  margin: 20px 35px 0 0;
}
</style>
