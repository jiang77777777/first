<template>
  <div>
    <!-- 
      对话框属性
      visible	是否显示 Dialog，支持 .sync 修饰符
      center	是否对头部和底部采用居中布局
      formLabelWidth label的宽度
      before-close 属性	关闭前的回调，会暂停 Dialog 的关闭
      opened	Dialog 打开动画结束时的回调
      close	Dialog 关闭的回调
      closed	Dialog 关闭动画结束时的回调
     -->
    <el-dialog
      :title="addInfo.isAdd ? '添加会员' : '编辑会员'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item prop="phone" label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="nickname"
          label="昵称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 小开关的状态 -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 可以使用active-color属性与inactive-color属性来设置开关的背景色。 -->
          <el-switch
            v-model="form.status"
            active-color="blue"
            inactive-color="red"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <!-- 添加和编辑的切换 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!--formDialog 用于 表单的验证  -->
        <el-button
          v-if="addInfo.isAdd"
          @click="update('formDialog')"
          type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update('formDialog')" type="danger"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMemberInfo,getMemberEdit } from "../../util/axios";

//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        uid: 0, //会员编号，必填项
        nickname: "", //昵称
        phone: "", //手机号
        password: "", //密码
        status: 1, //状态1正常2禁用
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 11个字符", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "请选择上级菜单", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  computed: {
    //获取菜单列表的值
    ...mapGetters({
      memberList: "member/getMemberList",
    }),
  },
  methods: {
    //封装一个重置事件
    reset() {
      this.form = {
        uid: 0, //会员编号，必填项
        nickname: "", //昵称
        phone: "", //手机号
        password: "", //密码
        status: 1, //状态1正常2禁用
      };
    },
    mounted() {
      this.getMemberList();
    },
    ...mapActions({
      getMemberList: "member/getMemberAction",
    }),
    //取消事件，关闭弹框，修改父组件数据
    cancel() {
      this.$emit("cancel", false);
      //调用重置函数
      this.reset();
    },
    //查看一条事件
    look(uid) {
      console.log(uid,'形参')
      //调取查看列表
      getMemberInfo({ uid }).then((res) => {
        console.log(res,'一条数据')
        if (res.data.code == 200) {
          this.form = res.data.list;
          //当前表单没有id 创建一个id，给确定提交用
          this.form.uid = uid;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //确定修改事件
    update(formName) {
      // console.log(formName);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //修改逻辑
          //调取修改接口
          getMemberEdit(this.form).then((res) => {
            console.log(res, "修改响应");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getMemberList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="" scoped></style>
