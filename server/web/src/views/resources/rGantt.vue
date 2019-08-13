<template>
    <div id='tableData' style="position:relative">
        <!--生成 title -->
        <div style="margin-bottom:30px;font-size:16px;"  class="link" @click="downloadExcel('WEB开发流程.xlsx')" alt="下载流程详细表格">项目流程</div>


        <div class="table-group" v-for='(item,itemname,itemindex) in processData'  :key="itemindex"
        :style="getStyle(item)">
           <div class="table-title"> {{item.title}}</div>

        <div :class="{ 'active':isActive == name,'table-child':true ,'ui':name == 'uiReview'|| name == 'sit'}" v-for='(block,name,index) in item.childNode'  :key="index" 
        :style="getStyle(block,item,index)" @click="showData(name,$event)">
            {{block.title}}
        </div>

        </div>
        <!-- 显示具体信息 -->
        <el-collapse v-model="activeNames" v-bind="colData">
            <el-collapse-item title="输入" name="1" class='col-title'>
                <div  v-for='item in colData.input'  :key="item">{{item}} </div>
            </el-collapse-item>
            <el-collapse-item title="输出" name="2" class='col-title'>
                <div  v-for='item in colData.output'  :key="item">{{item}} </div>
            </el-collapse-item>
            <el-collapse-item title="备注及参考资料" name="3" class='col-title'>
                <div  v-for='(item,index) in colData.remarks'  :key="index">
                <div v-if='item.type =="string"'>{{item.content}}</div>  
                <div v-if='item.type =="link"' class="link" @click="downloadExcel(item.link)" >{{item.content}}</div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import {processData,detailData} from "./workData"

export default {
    data() {
        this.blockIndex = 0;
        this.blockwidth = 0;
        this.lastWidth = 0;
        return{
            blockheight:40,
            activeNames: ['1','2','3'],
            isActive:"pa",
            processData:processData,
            detailData:detailData,
            colData:{}
        }
    },
    
    methods: {
        pickColor(){
            var color = "rgb(",i=0;
            for(i =0 ;i <3 ;i++){
                 color += Math.random()*256 ;
            }
            color +=')'
            return 'rgb('+ (Math.random()*128+128)+','+ (Math.random()*128+128)+','+( Math.random()*128+128)+')';
        },
        getStyle(item,block,index){
            var blockStyle ={
                width:item.width,
                backgroundColor:item.color?item.color:this.pickColor()
            }

            if(block){
                if(index==0){
                    this.blockwidth = parseInt(item.width);
                    blockStyle.marginTop =  ( this.blockIndex * this.blockheight)+'px'; 
                }else{
                    if(item.sameTime){
                        blockStyle.marginLeft = this.lastWidth + '%';
                    } else{
                        blockStyle.marginLeft = this.blockwidth + '%';
                        this.lastWidth =this.blockwidth;
                        this.blockwidth +=  parseInt(item.width);
                    }
                }
                this.blockIndex++;
            }
            if(item.title == '总结'){
                this.blockIndex = 0;
                this.blockwidth = 0;
                this.lastWidth  = 0;
            }
            return blockStyle;
        },
        showData(name,event){
            this.isActive = name;
            this.colData = this.detailData[name];
        },
        downloadExcel: function(productName) {
                let a = document.createElement("a");
                //这种请求时get的
                a.href = `/api/work/download/excel/${productName}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
        }
        
    },
    mounted(){
         this.colData = this.detailData['packageReview'];
    }
}
</script>
<style scoped>
.table-title{
    height:50px;
    padding-top:15px;
    text-align: right;
}
.table-group{
    height:650px;
    float:left;
    text-align: center;
    
}
.table-child{
    height:40px;
    line-height: 40px;
    border-radius: 5%;
    color: white;
    /* position: absolute; */
}
.el-collapse-item{
    text-align: left;
    margin-left: 30px;
}
.el-collapse-item__header{
    padding-left: 20px;
    background-color: antiquewhite;
}
.el-collapse-item .el-collapse-item__header{
    padding-left: 20px;
    background-color: antiquewhite;
}
.active{
    height: 50px;
    line-height: 50px;
    color: red;
}
.ui{
        font-size: 12PX
}
.link{
    color:#2196f3;
}
</style>
