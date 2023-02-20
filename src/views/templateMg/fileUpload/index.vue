<template>
    <el-container>
        <el-header>
            <el-upload
                action
                accept=".xlsx,.xls"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handle">
                <el-button type="primary" slot="trigger">选取EXCEL文件</el-button>
            </el-upload>
        </el-header>
        <el-main>Main</el-main>
    </el-container>
</template>

<script>
    export default {
        name: 'FileUpload',
        methods:{
            handle(ev){
                console.log(ev)
                let file = ev.row
                if (!file) return
                
            },
        }
    }
</script>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    
    body > .el-container {
        margin-bottom: 40px;
    }
    
    /* .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    } */
</style>