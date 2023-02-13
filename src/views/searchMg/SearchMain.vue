<template>
    <div>
        <el-table
            :data="tableDataShow"
            style="width: 100% "
            height="100%">
            <el-table-column
                fixed
                prop="date"
                label="问题录入时间"
                width="150"
                align="center">
            </el-table-column>
            <el-table-column
                prop="name"
                label="检查名称"
                width="150"
                align="center">
            </el-table-column>
            <el-table-column
                prop="level"
                label="检查级别"
                width="150"
                align="center">
            </el-table-column>
            <el-table-column
                prop="category"
                label="检查类别"
                width="150"
                align="center">
            </el-table-column>
            <el-table-column
                prop="sector"
                label="问题产生部门"
                width="150"
                align="center">
            </el-table-column>
            <el-table-column
                prop="dutyPerson"
                label="整改责任人"
                width="150"
                align="center">
            </el-table-column>
            <el-table-column
                prop="timeout"
                label="超时"
                width="150"
                align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.timeout=== 1" class="spanIsOk">否</span>
                    <span v-else-if="scope.row.timeout=== 0" class="spanIsNo">是</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="150"
                align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.status=== 1" class="spanIsOk">处理完成</span>
                    <span v-else-if="scope.row.status=== 0" class="spanIsNo">正在处理中</span>
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
                :total="tableForm.totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name:'SearchMain',
        props:['tableData'],
        data() {
            return {
                tableDataShow: [],
                tableForm: {
                    pageNo:1,       // 默认当前是第一页
                    pageSize:10,    // 当前每页的数据是10条
                    totalCount:0    // 总数默认为0
                } 
            }
        },
        mounted(){              // 页面加载之前执行的函数
            this.getCount();    // 获取当前数据的总数
            this.getList();     // 按当前的页号和每页的数据量进行查询
        },
        methods: {
            getCount(){       
                this.tableForm.totalCount = this.tableData.length
            },
            getList(){
                this.tableDataShow = []
                let start = this.tableForm.pageNo - 1
                for(let i = 0;i < this.tableForm.pageSize;i++){
                    if(this.tableData[start * this.tableForm.pageSize + i]){
                        this.tableDataShow[i] = this.tableData[start * this.tableForm.pageSize + i]
                    }
                    else {
                        break
                    }
                }
            },
            handleSizeChange(val) {                 // 修改每页所存数据量的值所触发的函数
                this.tableForm.pageSize = val;      // 修改页的大小
                this.getList();                     // 按新的pageNo和pageSize进行查询
            },
            handleCurrentChange(val) {                  // 修改当前页所触发的函数
                this.tableForm.pageNo = val;            // 更新当前的页
                this.getList();                         // 按新的pageNo和pageSize进行查询
            }
        },
        watch:{
            tableData:{
                immediate:true,
                deep:true,
                handler(){
                    this.tableDataShow = this.tableData
                    this.tableForm.totalCount = this.tableDataShow.length
                }
            }
        }
    }
</script>

<style scoped>
    .spanIsOk{
        color: #18A7FF;
    }
    .spanIsNo{
        color: #fb384b;
    }

    .el-pagination {
        text-align: right;
        margin-top: 20px;
    }
</style>