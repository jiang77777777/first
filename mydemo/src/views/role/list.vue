<template>
  <div>
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
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
            <el-button type="info" plain @click='edit(item.row.id)'>编辑</el-button>
            <el-button @click='del(item.row.id)' type="danger" plain>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入辅助性函数
import {mapActions,mapGetters} from 'vuex'
//引入封装好的接口
import {getRoleDelete} from '../../util/axios'
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      roleList:'role/getRoleList'
    })
  },
  mounted() {
    //组件一加载触发行动
    this.getRoleAction()
  },
  methods: {
    //获取行动
    ...mapActions({
      getRoleAction:'role/getRoleAction'
    }),
    //封装一个删除事件
    del(id){
        this.$confirm('确定要删除这一条数据吗？？？！！！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调取删除接口
          getRoleDelete({id})
          .then(res=>{
            if(res.data.code==200){
              this.$message.success(res.data.msg)
              //重新调取列表
              this.getRoleAction()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //封装一个编辑传id事件
    edit(id){
      this.$emit('edit',id)
    }
  },
};
</script>

<style lang="" scoped></style>
