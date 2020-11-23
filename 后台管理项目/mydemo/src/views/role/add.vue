<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加角色' : '修改角色'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="rolename"
          label="角色名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限:" :label-width="formLabelWidth">
          <!-- el-tree 属性
            data	展示数据	array
            default-expand-all	是否默认展开所有节点
            node-key	每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
            props	配置选项，具体看下表	object
            show-checkbox	节点是否可被选择
            default-checked-keys	默认勾选的节点的 key 的数组	
             -->
          <el-tree
            :data="menuList"
            default-expand-all
            node-key="id"
            ref="tree"
            :props="{
              children: 'children',
              label: 'title'
            }"
            show-checkbox
            check-strictly
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" @click="add" type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update" type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";
import { getRoleAdd, getRoleInfo, getRoleEdit } from "../../util/axios";
export default {
  data() {
    return {
      //表单对象
      form: {
        rolename: "", // 角色名称
        menus: "", //角色权限
        status: 1 //状态1正常2禁用
      },
      //label宽度
      formLabelWidth: "120px",
      //规则验证
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    //获取菜单列表
    ...mapGetters({
      menuList: "menu/getMenuList"
    })
  },
  mounted() {
    //减少对服务器的交互
    if (this.menuList.length == 0) {
      this.getMenuList();
    }
  },
  props: ["addInfo"],
  methods: {
    //封装重置事件
    reset() {
      this.form = {
        rolename: "", // 角色名称
        status: 1 //状态1正常2禁用
      };
      //清空tree结构框
      this.$refs.tree.setCheckedKeys([]);
    },
    //点击取消修改父组件弹框事件
    cancel() {
      this.$emit("cancel", false);
      //调用重置
      this.reset();
    },
    //调取行动
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
      getRoleList: "role/getRoleAction"
    }),
    //添加事件
    add() {
      //转化menu的数据类型
      //菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'  '1,2,3'
      // this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      // console.log(this.form,'表单信息')
      //调取添加接口
      getRoleAdd(this.form).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getRoleList();
          //关闭弹框
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装一个查看一条数据的方法
    look(id) {
      //调取查看接口
      getRoleInfo({ id }).then(res => {
        console.log(res, "获取一条数据");
        if (res.data.code == 200) {
          this.form = res.data.list;
          //setCheckedKeys 	通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
          // this.form.menus = this.$refs.tree.setCheckedKeys(
          //   JSON.parse(this.form.menus)
          // );
             this.form.menus = this.form.menus? this.$refs.tree.setCheckedKeys( this.form.menus.split(','))  :[]
          this.form.id = id;
        }
      });
    },
    //编辑确定事件
    update() {
      //转化menu的数据类型
      // this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      // console.log(this.form,'表单信息')
      //调取添加接口
      getRoleEdit(this.form).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getRoleList();
          //关闭弹框
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="" scoped></style>
