<template>
    <div class="app-container">
        <el-container>
            <el-header>
                <SearchHeader :searchProblem="searchProblem" :updateTableData="updateTableData"></SearchHeader>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <SearchAside :sectorClick="sectorClick"></SearchAside>
                </el-aside>
                <el-main>
                    <SearchMain :tableData="newTableData" :thePagnation="thePagnation"></SearchMain>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import SearchMain from './SearchMain.vue';
    import SearchHeader from './SearchHeader.vue';
    import SearchAside from './SearchAside.vue';
    export default {
        name: 'SearchProblem',
        components:{SearchMain,SearchHeader,SearchAside},
        data() {
            return {
                tableData:[],
                newTableData:[],
                searchData:{
                    nameInput:'',
                    dateInput:'',
                    deptId:'',
                    pageNo:1,      
                    pageSize:8,   
                    totalCount:0    
                }
            }
        },
        mounted(){
            this.combiningTableData()
            this.data()
        },
        methods:{
            //整理搜索数据
            searchProblem(input){
                // if (nameInput) {//搜索名称
                //     this.newTableData = this.tableData.filter((data) => {
                //         return data.name === nameInput
                //     })
                // }
                // if (dateInput) {//搜索时间
                //     this.newTableData = this.tableData.filter((data) => {
                //         return data.date === dateInput
                //     })
                // }
                this.searchData.nameInput = input.nameInput
                this.searchData.dateInput = input.dateInput
                this.searchData.pageNo = 1
                this.searchData.pageSize = 8
            },
            sectorClick(data){
                //需要请求数据，更新tableData 
                // if(children && children.length){
                //     this.newTableData = this.tableData.filter((data) => {
                //         let flag = 0
                //         for(let i = 0;i < children.length;i++){
                //             if(data.department.label === label || data.department.label === children[i].label) flag = 1
                //         }
                //         return flag
                //     })
                // } else {
                //     this.newTableData = this.tableData.filter((data) => {
                //         return data.department.label === label
                //     })
                // }
                this.searchData.nameInput = ''
                this.searchData.dateInput = ''
                this.searchData.pageNo = 1
                this.searchData.pageSize = 8
                this.searchData.deptId = data.deptId
            },
            thePagnation(data){
                this.searchData.pageNo = data.pageNo
                this.searchData.pageSize = data.pageSize
            },
            updateTableData(){
                //请求数据,更新tableData
                this.searchData = {
                    nameInput:'',
                    dateInput:'',
                    deptId:''
                }
                this.$store.dispatch('problem/getProblem',this.searchData)
            },
            //请求数据:数据包含状态码为1、2、3
            requestData(){
                this.$store.dispatch('problem/getProblem',this.searchData)
            },
            combiningTableData(){
                this.tableData = [...this.$store.state.problem.pendingSolveList,...this.$store.state.problem.pendingCheckList,...this.$store.state.problem.completedList]
            },
            data(){
                this.newTableData = this.tableData
            },
        }
    }
</script>

<style scoped>
    .el-header{
        background-color: #fff;
        color: #333;
        /* text-align: center;
        line-height: 60px; */
    }
    
    .el-aside {
        background-color: #fff;
        color: #333;
        /* text-align: center;
        line-height: 200px; */
    }
    
    .el-main {
        background-color: #fff;
        color: #333;
        /* text-align: center;
        line-height: 160px; */
    }
    
    body > .el-container {
        margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>