<template>
  <div class="container-box">
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="getHandleList" class="refresh"></el-button>
    <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'name', order: 'ascending'}">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" label-width="120px" inline class="demo-table-expand table-form"
            :rules="formRules">
            <el-form-item label="项目" prop="name">
              <span>{{ props.row.name}}</span>
            </el-form-item>

            <el-form-item label="项目阶段" prop="process">
              <span>{{ props.row.process}}</span>
            </el-form-item>

            <el-form-item label="web负责人" prop="response">
                <el-tag type="small" v-for="tag in props.row.response" :key="tag">{{allMembers[tag]}}</el-tag>
            </el-form-item>

            <el-form-item label="PL/导师" prop="teacher">
              <el-tag type="small" v-for="tag in props.row.teacher" :key="tag">{{allMembers[tag]}}</el-tag>
            </el-form-item>

            <el-form-item label="简要描述" prop="remarks">
                <span>{{ props.row.remarks}}</span>
              </el-form-item>
  
            <el-form-item label="审批意见" v-if="showOptions(props.row) == 1" prop="opinion">
              <el-input type="textarea" autosize v-model="props.row.opinion"></el-input>
            </el-form-item>

            <el-form-item label="checklist表" prop="checklistData">
              <el-button type="text" @click="dialogTableVisible = true;rowChecklistData = props.row.checklistData">
                查看修改checklist表</el-button>
            </el-form-item>

            <el-form-item label="流程节点" prop="processnode" style="width: 140%">
              <el-table :data="props.row.processnode" style="width: 160%" border>
                <el-table-column prop="nodename" label="节点名称" width="80">
                </el-table-column>
                <el-table-column prop="operator" label="姓名" width="80">
                </el-table-column>
                <el-table-column prop="remarks" label="备注" width="180">
                </el-table-column>
                <el-table-column prop="time" label="时间" width="180">
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="项目" sortable width="180"></el-table-column>

      <el-table-column prop="process" label="项目阶段" sortable width="180"></el-table-column>

      <el-table-column prop="responses" label="web负责人" sortable></el-table-column>

      <el-table-column prop="statusStr" label="项目状态"></el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="showOptions(scope.row) == 1" size="mini" type="primary"
            @click="handlePass(scope.$index, scope.row)">通过</el-button>
          <el-button v-if="showOptions(scope.row) == 1" size="mini" type="danger"
            @click="handleReject(scope.$index, scope.row)">驳回</el-button>
          <el-button v-if="showOptions(scope.row) == 2" size="mini" disabled>待审核</el-button>
          <el-button v-if="showOptions(scope.row) == 3" size="mini" type="primary"
            @click="handleSubmit(scope.$index, scope.row)">提交</el-button>
          <el-button v-if="showOptions(scope.row) == 3" size="mini" type="primary"
            @click="dialogEditVisible = true;rowProcedure = scope.row">修改项目</el-button>

          <el-button v-if="showOptions(scope.row) == 4" size="mini" disabled>待他人提交</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="checklist表" width="80%" height="50%" :visible.sync="dialogTableVisible">
      <checklistTable :checklistData="rowChecklistData"></checklistTable>
    </el-dialog>

    <el-dialog title="checklist表" width="60%" height="50%" :visible.sync="dialogEditVisible">
        <newchecklist :name="name" :members="members" :procedure = 'rowProcedure' :edit = "edit" ></newchecklist>
    </el-dialog>

  </div>
</template>

<script>
  import newchecklist from "./newchecklist.vue";
  import checklistTable from "./checkListTable.vue";
  export default {
    props: ['status', 'checklistData'],
    data() {
      return {
        dialogTableVisible: false,
        dialogEditVisible: false,
        edit:true,
        rowChecklistData: [],
        tableData: [],
        members: [],
        allMembers: {},
        temp: [],
        name: "",
        rowProcedure: {},
        statusTrans: {
          pending: "待审核",
          resubmit: "待提交",
          ending: "结束"
        },
        formRules: {
        },
        process: {
          "1": "第一轮转测",
          "2": "第二轮转测"
        }
      };
    },
    components: {
      checklistTable,
      newchecklist
    },

    methods: {
      transMembers: function (members) {
        for (let i in members) {
          let value = members[i];
          this.allMembers[value.mail] = value.name;
        }
        this.members = members;
        this.members.splice(0,1);
      },
      getHandleList: function () {
        let that = this;
        //获取所有待处理的数据
         this.$http.post("/api/procedure/getHandleList", { status: that.status }).then(res => {
          // if(res.indexOf('<!DOCTYPE') !=-1){
          //   
           // window.location.href ="./";
          //  }
          that.name = res.data.name;
          that.transMembers(res.data.members);
          that.tableData = res.data.HandleLists;
          //处理 list表中的内容
          for (var item of that.tableData) {
            item.statusStr = that.statusTrans[item.status];
            item.mail = item.mail.split(",");
            item.response = item.response.split(",");
            item.responses = [];

            for (i in item.response) {
              item.responses[i] = that.allMembers[item.response[i]] + " ";
            }
            item.teacher = item.teacher.split(",");

            for (var i = 0; i < 18; i++) {
              item.checklistData[i].checklistDetail = that.checklistData[i].checklistDetail;
              item.checklistData[i].checklist = that.checklistData[i].checklist;
              item.checklistData[i].step = that.checklistData[i].step;
              item.checklistData[i].Result = that.checklistData[i].Result;
            }
          }
        });
      },
      showOptions: function (row) {
        if (row.status == "pending") {
          if (!RegExp(this.name).test(row.responses)) {
            return 1;
          } else {
            return 2;
          }
        }
        if (row.status == "resubmit") {
          if (!RegExp(this.name).test(row.submit)) {
            return 3;
          } else {
            return 4;
          }
        }
        return 5;
      },
      handlePass: function (index, row) {
        var submitData = { id: row.id, status: "ending", opinion: row.opinion, response: row.response.join(','), name: row.name  };
        this.$http.post("/api/procedure/handleProcedure", submitData).then(res => {

          this.notify(res.data);
          this.getHandleList();
        });
      },
      handleReject: function (index, row) {
        var submitData = { id: row.id, status: "resubmit", opinion: row.opinion, response: row.response.join(','), name: row.name };
        this.$http.post("/api/procedure/handleProcedure", submitData).then(res => {

          this.notify(res.data);
          this.getHandleList();
        });
      },
      handleSubmit: function (index, row) {
        var submitData = { id: row.id, name: row.name, status: "pending", remarks: row.remarks, submit: row.submit, response: row.response.join(',') };
        this.$http.post("/api/procedure/handleSubmit", submitData).then(res => {
          // if(res.indexOf('<!DOCTYPE') !=-1){
          //     window.location.href ="./";
          //  }
          this.notify(res.data);
          this.getHandleList();
        });
      },
      handleEditProcedure:function(){
        var submitData = { id: row.id, name: row.name, status: "pending", remarks: row.remarks, submit: row.submit, response: row.response.join(',') };
        this.$http.post("/api/procedure/handleEdit", submitData).then(res => {
          // if(res.indexOf('<!DOCTYPE') !=-1){
          //     window.location.href ="./";
          //  }
          this.notify(res.data);
          this.getHandleList();
        });
      }
    },
    mounted: function () {
     this.getHandleList();
    }
  };
</script>

<style lang="scss" scoped>
  .refresh {
    float: right;
    margin-right: 20px;
  }
</style>