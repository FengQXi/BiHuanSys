<template>
    <div class="demo-input-size">
        <el-row :gutter="10">
            <!-- 请输入检查名称 -->
            <el-col :span="7"><div class="grid-content bg-purple">检查名称
                <el-input
                    size="medium"
                    placeholder="请输入检查名称"
                    style="width: 180px"
                    prefix-icon="el-icon-search"
                    v-model="nameInput">
                </el-input>
            </div></el-col>
             <!-- 输入时间 -->
            <el-col :span="10"><div class="grid-content bg-purple">
                <div class="block">录入时间
                    <el-date-picker
                        v-model="dateInput"
                        type="date"
                        placeholder="选择录入日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        size="medium">
                    </el-date-picker>
                </div>
            </div></el-col>
            <el-col :span="7" class="el-col-last-button"><div class="grid-content bg-purple">
                <el-row>
                    <el-button type="primary" icon="el-icon-search" size="medium" @click="searchByCondition">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="medium" @click="clearAllInput">重置</el-button>
                </el-row>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name:'SearchHeader',
        props:['searchData','updateTableData'],
        data() {
            return {
                nameInput:'',
                dateInput:''
            }
        },
        methods:{
            clearAllInput(){
                this.nameInput = ''
                this.dateInput = ''
                this.updateTableData()
            },
            searchByCondition(){
                this.searchData(this.nameInput,this.dateInput)
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
    .el-col-last-button{
        margin-bottom: 0px;
    }
    .el-col {
        margin-top: 14px;
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #fff;
    }
    .bg-purple {
        background: #fff;
    }
    .bg-purple-light {
        background: #fff;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>