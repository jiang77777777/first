<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加管理员' : '修改管理员'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <!-- 用户名称 -->
        <el-form-item
          prop="specsname"
          label="规格名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in arrAttr"
          label="规格属性"
          :key="index"
          :label-width="formLabelWidth"
        >
          <el-input
            class="inputW"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index == 0" type="primary" @click="addAttr"
            >新增规格属性</el-button
          >
          <el-button v-else type="danger" @click="delAttr(item)">删除</el-button>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" :label-width="formLabelWidth">
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
        <el-button
          type="primary"
          v-if="addInfo.isAdd"
          @click="add('formDialog')"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update('formDialog')"
          >修 改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入封装好的接口
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      arrAttr: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "", // 商品规格名称
        attrs: "", // 商品规格属性值
        status: 1, // 状态 1正常 2禁用
      },
      rules: {
        specsname: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  methods: {
    reset() {
      this.form = {
        specsname: "", // 商品规格名称
        attrs: "", // 商品规格属性值
        status: 1, // 状态 1正常 2禁用
      };
      this.arrAttr = [
        {
          value: "",
        },
      ];
    },
    ...mapActions({
      getSpecsList: "specs/getSpecsAction",
      changePageAction: "specs/changePageAction",
      getSpecsCount: "specs/getCountAction",
    }),
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    // 添加属性
    addAttr() {
      if (this.arrAttr.length <= 6) {
        this.arrAttr.push({ value: "" });
      } else {
        this.$message.warning("最多添加六条！！");
      }
    },
    delAttr(item) {
      var index = this.arrAttr.indexOf(item);
      if (index !== -1) {
        this.arrAttr.splice(index, 1);
      }
    },
    // 添加事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.attrs = this.arrAttr.map((item) => item.value).join(",");

          getSpecsAdd(this.form)
            .then((res) => {
              // console.log(res, '添加的响应');
              if (res.data.code === 200) {
                this.$message.success(res.data.msg);
                this.cancel();
                this.getSpecsList();
                this.getSpecsCount();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 查看一条事件
    look(id) {
      // console.log(id);
      // 调取接口
      getSpecsInfo({ id })
        .then((res) => {
          if (res.data.code == 200) {
            this.form = res.data.list[0];
            this.form.id = id;
            this.arrAttr = this.form.attrs.map((item) => {
              return { value: item };
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 确定修改
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.attrs = this.arrAttr.map((item) => item.value).join(",");

          getSpecsEdit(this.form)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                this.cancel();
                this.getSpecsList();
                this.getSpecsCount();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
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

<style scoped>
.inputW {
  width: 70%;
}
</style>