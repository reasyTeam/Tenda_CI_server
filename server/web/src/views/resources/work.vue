<template>
    <div>
     <el-tabs tab-position="left" style="margin-left:-30px;">
    <el-tab-pane label="工作流程">
       <r-gantt/>
    </el-tab-pane>
    <el-tab-pane label="代码线">
      <div>
            <Vue2OrgTree :data="codeLines[0]" @on-expand="onExpand" 
            :render-content="renderContent" :horizontal="horizontal" :collapsable="collapsable" label-class-name="bg-white"/>
             <Vue2OrgTree :data="codeLines[1]" @on-expand="onExpand" 
            :render-content="renderContent" :horizontal="horizontal" :collapsable="collapsable" label-class-name="bg-white"/>
             <Vue2OrgTree :data="codeLines[2]" @on-expand="onExpand" 
            :render-content="renderContent" :horizontal="horizontal" :collapsable="collapsable" label-class-name="bg-white"/>
      </div>
    </el-tab-pane>
    <el-tab-pane label="组内工具">
      <el-table border
        :data="toolTableData"
        style="width: 100%" >
        <el-table-column
          prop="name"
          label=""
          width="200">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="300">
        </el-table-column>
        <el-table-column
          label="地址">
            <template slot-scope="scope">
            <a :href="scope.row.address" target="_blank" >{{ scope.row.address }}</a>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>  
    <el-tab-pane label="资源路径">
       <el-table border
        :data="resourceTableData"
        style="width: 100%" >
        <el-table-column
          prop="name"
          label=""
          width="200">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="300">
        </el-table-column>
        <el-table-column
          label="地址">
            <template slot-scope="scope">
          
            <a :href="scope.row.address" target="_blank">{{ scope.row.address }}</a>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>

    </div>
</template>

<script>
import {codeLines,resourceTableData,toolTableData} from "./workData"
import rGantt from "./rGantt.vue";
  export default {
    data() {
      return {
        isCollapse: true,
        activeNames: ['1'],
        collapsable: true,
        horizontal: true,
        expandAll: false,
        codeLines: codeLines,
        resourceTableData: resourceTableData,
        toolTableData:toolTableData
      };
    },
    components: {
     rGantt
  },
    methods: {
      renderContent(h,data){
        return data.label ;
      },
       onExpand(e,data) {
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
        var _this = this;
        list.forEach(function(child) {
          if (child.expand) {
            child.expand = false;
          }
          child.children && _this.collapse(child.children);
        });
      },
    }
  }
</script>

<style>
.el-collapse-item__content{
    text-align: left;
    margin-left: 30px;
}
.el-collapse-item__header{
    padding-left: 20px;
    background-color: antiquewhite;
}
.el-table .cell a{
  color:#409EFF;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-tabs__content{
  padding-left: 50px ;
}
.el-steps {
  margin-top:60px;
}
.org-tree-node-label-inner{
  font-size: 14px;
}
</style>
