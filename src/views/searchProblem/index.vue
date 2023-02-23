<template>
    <div class="app-container">
        <el-container>
            <el-header>
                <SearchHeader :searchData="searchData" :updateTableData="updateTableData"></SearchHeader>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <SearchAside :sectorClick="sectorClick"></SearchAside>
                </el-aside>
                <el-main>
                    <SearchMain :tableData="newTableData"></SearchMain>
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
                newTableData:[]
            }
        },
        mounted(){
            this.combiningTableData()
            this.data()
        },
        methods:{
            searchData(nameInput,dateInput){
                if (nameInput) {//搜索名称
                    this.newTableData = this.tableData.filter((data) => {
                        return data.name === nameInput
                    })
                }
                if (dateInput) {//搜索时间
                    this.newTableData = this.tableData.filter((data) => {
                        return data.date === dateInput
                    })
                }
            },
            sectorClick(label,children){
                //需要请求数据，更新tableData 
                if(children && children.length){
                    this.newTableData = this.tableData.filter((data) => {
                        let flag = 0
                        for(let i = 0;i < children.length;i++){
                            if(data.department.label === label || data.department.label === children[i].label) flag = 1
                        }
                        return flag
                    })
                } else {
                    this.newTableData = this.tableData.filter((data) => {
                        return data.department.label === label
                    })
                }
            },
            updateTableData(){
                //请求数据,更新tableData
                this.data()
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