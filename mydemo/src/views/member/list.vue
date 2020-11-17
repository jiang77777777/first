<template>
  <div>
    <!--     el-table 属性
    default-expand-all	是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
    tree-props	渲染嵌套数据的配置选项
    row-key	行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。 -->
    <el-table
      :data="memberList"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
      >>
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if='item.row.status==1' type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
         </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click='edit(item.row.uid)'>编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";
import { getMemberEdit } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      memberList: "member/getMemberList"
    })
  },
  mounted() {
    //组件一加载就触发调取列表
    this.getMemberList();
  },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction"
    }),
    //点击编辑获取id
    edit(uid){
      //把id给父组件menu,之后供弹框使用
      this.$emit('edit',uid)
    },
  }
};
</script>

<style lang="" scoped></style>
