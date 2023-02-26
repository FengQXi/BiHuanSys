<template>
    <div style="height: 540px;">
        <el-table
            :data="tableData"
            style="width: 100% "
            max-height="490px">
            <el-table-column
                prop="createTime"
                label="问题录入时间"
                align="center">
            </el-table-column>
            <el-table-column
                prop="keyWord"
                label="检查名称"
                align="center">
            </el-table-column>
            <el-table-column
                prop="level"
                label="检查级别"
                width="100"
                align="center">
            </el-table-column>
            <el-table-column
                prop="category"
                label="检查类别"
                align="center">
            </el-table-column>
            <el-table-column
                prop="quesDept"
                label="问题产生部门"
                align="center">
            </el-table-column>
            <el-table-column
                prop="solveId"
                label="整改责任人"
                width="100"
                align="center">
            </el-table-column>
            <el-table-column
                label="超时"
                width="100"
                align="center">
                <template slot-scope="scope">
                    <span v-show="timeout(scope.row)" class="spanIsOk">是</span>
                    <span v-show="!timeout(scope.row)" class="spanIsNo">否</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="problemState"
                label="状态"
                width="100"
                align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.problemState == '1'" class="spanIsNo">处理中</span>
                    <span v-else-if="scope.row.problemState == '2'" class="spanIsIng">待审核</span>
                    <span v-else-if="scope.row.problemState == '0'" class="spanIsCommit">待提交</span>
                    <span v-else-if="scope.row.problemState == '3'" class="spanIsOk">已闭环</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="tableForm.pageNo"
                :page-sizes="[8,10,12,14]"
                :page-size="tableForm.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name:'SearchMain',
        props:['tableData','thePagnation','total'],
        data() {
            return {
                tableDataShow: [],
                tableForm: {
                    pageNo:1,       // 默认当前是第一页
                    pageSize:8,    // 当前每页的数据是10条
                } 
            }
        },
        mounted(){              // 页面加载之前执行的函数
            this.getCount();    // 获取当前数据的总数
            this.getList();     // 按当前的页号和每页的数据量进行查询
        },
        methods: {
            getCount(){       
                this.otalCount = this.tableData.length
            },
            getList(){
                // this.tableDataShow = []
                // let start = this.tableForm.pageNo - 1
                // for(let i = 0;i < this.tableForm.pageSize;i++){
                //     if(this.tableData[start * this.tableForm.pageSize + i]){
                //         this.tableDataShow[i] = this.tableData[start * this.tableForm.pageSize + i]
                //     }
                //     else {
                //         break
                //     }
                // }
                this.thePagnation(this.tableForm)
            },
            handleSizeChange(val) {                 // 修改每页所存数据量的值所触发的函数
                this.tableForm.pageSize = val;      // 修改页的大小
                this.getList();                     // 按新的pageNo和pageSize进行查询
            },
            handleCurrentChange(val) {                  // 修改当前页所触发的函数
                this.tableForm.pageNo = val;            // 更新当前的页
                this.getList();                      // 按新的pageNo和pageSize进行查询
            },
            timeout(value){
                var entryTime = Date.parse(new Date(value.entryTime));
                var limitTime = Date.parse(new Date(value.limitTime));
                return limitTime - entryTime > 0 ? true : false
            }
        },
        watch:{
            tableData:{
                immediate:false,
                deep:true,
                handler(){
                    this.getList();
                    this.totalCount = this.tableData.length
                }
            }
        }
    }
</script>

<style scoped>
    .spanIsOk{
        color: #3bc93b;
    }
    .spanIsIng{
        color: #18A7FF;
    }
    .spanIsNo{
        color: #fb384b;
    }
    .spanIsCommit{
        color: #dfe570;
    }

    .el-pagination {
        text-align: right;
        margin-top: 20px;
    }
</style>