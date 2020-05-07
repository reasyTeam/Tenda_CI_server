<template>
  <div>
    <el-tabs tab-position="left" style="margin-left:-30px;">
      <el-tab-pane label="工作流程"> <r-gantt /> </el-tab-pane>
      <el-tab-pane label="代码线">
        <div>
          <Vue2OrgTree
            v-for="item in codeLines"
            :key="item"
            :data="item"
            @on-expand="onExpand"
            :render-content="renderContent"
            :horizontal="horizontal"
            :collapsable="collapsable"
            label-class-name="bg-white"
            @on-node-click="onNodeClick"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="组内工具">
        <el-table border :data="toolTableData" style="width: 100%">
          <el-table-column prop="name" label="标题" width="200">
          </el-table-column>
          <el-table-column prop="description" label="描述" width="300">
          </el-table-column>
          <el-table-column label="地址">
            <template slot-scope="scope">
              <a :href="scope.row.address" target="_blank">
                {{ scope.row.address }}
              </a>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="showForm(scope.row, 'tool')"
                type="text"
                size="small"
              >
                编辑
              </el-button>
              <el-button @click="delitem(scope.row)" type="text" size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="showForm({}, 'tool')">新增</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="资源路径">
        <el-table border :data="resourceTableData" style="width: 100%">
          <el-table-column prop="name" label="标题" width="200">
          </el-table-column>
          <el-table-column prop="description" label="描述" width="300">
          </el-table-column>
          <el-table-column label="地址">
            <template slot-scope="scope">
              <a :href="scope.row.address" target="_blank">
                {{ scope.row.address }}
              </a>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="showForm(scope.row, 'work')"
                type="text"
                size="small"
              >
                编辑
              </el-button>
              <el-button @click="delitem(scope.row)" type="text" size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="showForm({}, 'work')">新增</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="" :visible.sync="dialogFormVisible">
      <!-- 弹窗 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item label="标题" prop="name">
          <el-input
            type="text"
            v-model="ruleForm.name"
            required
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            type="text"
            v-model="ruleForm.description"
            required
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input type="text" v-model="ruleForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { codeLines } from "./workData";
import rGantt from "./rGantt.vue";

export default {
  data() {
    return {
      getUrl: "/api/resource/getResourceList",
      addUrl: "/api/resource/insertResourceList",
      editUrl: "/api/resource/updateResourceList",
      delUrl: "/api/resource/deleteResourceList",
      isCollapse: true,
      activeNames: ["1"],
      collapsable: true,
      horizontal: true,
      expandAll: false,
      codeLines: codeLines,
      resourceTableData: [],
      toolTableData: [],
      dialogFormVisible: false,
      ruleForm: {
        name: "",
        description: "",
        address: "",
        typesOf: "tool", // tool 或者 work
        id: "" // 新增的话没有id 修改和删除需要
      },
      defaultForm: {
        name: "",
        description: "",
        address: ""
      },
      rules: {
        name: [{ required: true, message: "请输入标题", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    rGantt
  },
  created() {
    this.getToolResourcesList();
    this.getWorkResourcesList();
  },
  methods: {
    renderContent(h, data) {
      return data.label;
    },
    onExpand(e, data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    collapse(list) {
      list.forEach(child => {
        if (child.expand) {
          child.expand = false;
        }
        child.children && this.collapse(child.children);
      });
    },
    onNodeClick(e, data) {
      data.detail &&
        this.$notify({
          title: data.label,
          message: `<div class="break"> ${data.detail}</div>`,
          duration: 0,
          dangerouslyUseHTMLString: true
        });
    },
    getToolResourcesList() {
      this.$http.post(this.getUrl, { typesOf: "tool" }).then(res => {
        this.toolTableData = [...res.data.list];
      });
    },
    getWorkResourcesList() {
      this.$http.post(this.getUrl, { typesOf: "work" }).then(res => {
        this.resourceTableData = [...res.data.list];
      });
    },
    //显示编辑弹窗
    showForm(data, type) {
      this.dialogFormVisible = true;
      this.ruleForm = { ...this.defaultForm, ...data };
      this.ruleForm.typesOf = type;
      this.resetForm();
    },
    // 新增提交
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let submitUrl,
            submitData = this.ruleForm;

          if (submitData.id == undefined) {
            submitUrl = this.addUrl;
          } else {
            submitUrl = this.editUrl;
          }

          this.$http.post(submitUrl, submitData).then(res => {
            this.notify(res.data);
            this.dialogFormVisible = false;
            this.getToolResourcesList();
            this.getWorkResourcesList();
          });
        } else {
          this.notify("输入有误，请检查后提交");
          return false;
        }
      });
    },
    // 删除信息
    delitem(data) {
      this.$http.post(this.delUrl, data).then(res => {
        this.notify(res.data);
        this.getToolResourcesList();
        this.getWorkResourcesList();
      });
    },
    // 表单重置
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style>
.el-collapse-item__content {
  text-align: left;
  margin-left: 30px;
}
.el-collapse-item__header {
  padding-left: 20px;
  background-color: antiquewhite;
}
.el-table .cell a {
  color: #409eff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-tabs__content {
  padding-left: 50px;
}
.el-steps {
  margin-top: 60px;
}
.org-tree-node-label-inner {
  font-size: 14px;
}
.break {
  word-break: break-all;
}
</style>
