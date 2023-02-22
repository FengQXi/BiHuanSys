<template>
    <div class="app-container">
        <el-container>
            <el-header>
                <el-row :gutter="10">
                    <!-- 请输入用户名称 -->
                    <el-col :span="7"><div class="grid-content bg-purple">用户昵称
                        <el-input
                            size="medium"
                            placeholder="请输入用户昵称"
                            style="width: 180px"
                            prefix-icon="el-icon-search"
                            v-model="nameInput">
                        </el-input>
                    </div></el-col>
                    <!-- 输入手机号 -->
                    <el-col :span="7"><div class="grid-content bg-purple">手机号
                        <el-input
                            size="medium"
                            placeholder="请输入手机号"
                            style="width: 180px"
                            prefix-icon="el-icon-search"
                            v-model="phoneInput">
                        </el-input>
                    </div></el-col>
                    <el-col :span="7" class="el-col-last-button"><div class="grid-content bg-purple">
                        <el-row>
                            <el-button type="primary" icon="el-icon-search" size="medium" @click="searchByCondition">搜索</el-button>
                            <el-button icon="el-icon-refresh" size="medium" @click="clearAllInput">重置</el-button>
                        </el-row>
                    </div></el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-tree
                        :data="sectorData"
                        :props="defaultProps"
                        accordion
                        @node-click="handleNodeClick">
                    </el-tree>
                </el-aside>
                <el-main>
                     <!-- 其他导入导出批量操作 -->
                    <div style="margin: 10px;margin-left: 0px;">
                        <el-button type="success" 
                            @click="centerDialogVisibleAdd=true;
                                addPersonData();" 
                            icon="el-icon-circle-plus-outline">添加</el-button>
                        <!-- <el-button @click="toggleSelection()">取消选择</el-button>
                        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
                    </div>
                    <!-- 表单 -->
                    <el-table
                        ref="multipleTable"
                        :data="personDataShow"
                        tooltip-effect="dark"
                        style="width: 100%"
                        max-height="490px"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            prop="id"
                            label="用户名称"
                            width="135"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="用户昵称"
                            width="135"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="sector"
                            label="部门"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="手机电话"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="状态"
                            width="135"
                            align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status == 1" class="spanIsOk">启用</span>
                                <span v-else-if="scope.row.status == 0" class="spanIsNo">停用</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="date"
                            label="注册时间"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="135"
                            align="center">  
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-edit" circle size="mini" 
                                    @click="
                                        centerDialogVisibleUpdate = true;
                                        updatePersonData(scope.row.id);">
                                </el-button>
                                <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deletePersonData(scope.row.id)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页器 -->
                    <div class="block">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="tableForm.pageNo"
                            :page-sizes="[6,8,10,12]"
                            :page-size="tableForm.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tableForm.totalCount">
                        </el-pagination>
                    </div>
                    <!-- 修改操作弹出框 -->
                    <el-dialog
                        title="提示"
                        :visible.sync="centerDialogVisibleUpdate"
                        width="45%"
                        @close="close()"
                        center>
                        <!-- 修改数据展示的form表格  -->
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="用户名称" prop="id">
                                <el-input v-model="ruleForm.id" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="用户昵称" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="归属部门" prop="sector">
                                <!-- <el-input v-model="ruleForm.sector"></el-input> -->
                                <el-select v-model="ruleForm.sector" placeholder="请选择部门">
                                    <el-option
                                        v-for="item in sectorData"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="手机电话" prop="phone">
                                <el-input v-model="ruleForm.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="用户角色" prop="role" show-message:false>
                                <el-select v-model="ruleForm.region" placeholder="请选择用户角色">
                                    <el-option label="超级用户" value="role1"></el-option>
                                    <el-option label="普通用户" value="role2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态" prop="status">
                                <el-switch v-model="ruleForm.status"></el-switch>
                            </el-form-item>
                            <el-form-item label="创建时间" show-message:false >
                                <el-input v-model="ruleForm.date" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="
                                    centerDialogVisibleUpdate = false;
                                    submitForm('ruleForm');">确 定</el-button>
                                <el-button @click="
                                    centerDialogVisibleUpdate = false;
                                    resetForm('ruleForm')">取 消</el-button>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                        </span>
                    </el-dialog>
                    <!-- 新增操作弹出框 -->
                    <el-dialog
                        title="提示"
                        :visible.sync="centerDialogVisibleAdd"
                        width="45%"
                        @close="close()"
                        center>
                        <!-- 新增数据展示的form表格  -->
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="用户名称" prop="id">
                                <el-input v-model="ruleForm.id" ></el-input>
                            </el-form-item>
                            <el-form-item label="用户昵称" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="归属部门" prop="sector">
                                <el-input v-model="ruleForm.sector"></el-input>
                            </el-form-item>
                            <el-form-item label="手机电话" prop="phone">
                                <el-input v-model="ruleForm.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="用户角色" prop="role" show-message:false>
                                <el-select v-model="ruleForm.region" placeholder="请选择用户角色">
                                    <el-option label="超级用户" value="role1"></el-option>
                                    <el-option label="普通用户" value="role2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态" prop="status">
                                <el-switch v-model="ruleForm.status"></el-switch>
                            </el-form-item>
                            <el-form-item label="创建时间" show-message:false >
                                <el-input v-model="ruleForm.date" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="
                                    centerDialogVisibleAdd = false;
                                    submitForm('ruleForm');">确 定</el-button>
                                <el-button @click="
                                    centerDialogVisibleAdd = false;
                                    resetForm('ruleForm')">取 消</el-button>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                        </span>
                    </el-dialog>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'UserManagement',
        data() {
            return {
                //侧边栏部门数据
                sectorData: this.$store.state.department.departmentList,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                //  列表数据：personData与personDataShow的关系
                /*
                        personData: 数据库数据
                        personDataShow: 前端发送请求后用于展示的数据，后期可以把personnData给删除，用以减小前端代码体积
                */
                personData: this.$store.state.allUser.allUserList,
                personDataShow:[],
                tableForm: {
                    pageNo:1,       // 默认当前是第一页
                    pageSize:8,    // 当前每页的数据是10条
                    totalCount:0    // 总数默认为0
                },
                //修改时参数数据
                centerDialogVisibleUpdate: false,
                centerDialogVisibleAdd: false,
                ruleForm: {
                    id:'',
                    name: '',
                    sector: '',
                    phone:'',
                    status: false,
                    date: '',
                    role:'',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户昵称', trigger: 'blur' },
                        { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                    ],
                    // sector: [
                    //     { required: true, message: '请输入归属部门', trigger: 'blur' },
                    // ],
                    phone: [
                        { required: true, message: '请输入电话号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度为 11 个字符', trigger: 'blur' }
                    ],
                    // role: [
                    //     { required: false, message: '请选择用户角色', trigger: 'change' }
                    // ],
                },
                //顶部搜索栏数据
                nameInput:'',
                phoneInput:''

            }
        },
        mounted(){              // 页面加载之前执行的函数s
            this.getCount();    // 获取当前数据的总数
            this.getList();     // 按当前的页号和每页的数据量进行查询
        },
        methods:{
            //侧边栏部门点击事件
            handleNodeClick(sector){
                this.personData = this.$store.state.allUser.allUserList
                 if(sector.children && sector.children.length){
                    this.personDataShow = this.personData.filter((data) => {
                        let flag = 0
                        for(let i = 0;i < sector.children.length;i++){
                            if(data.sector === sector.label || data.sector === sector.children[i].label) flag = 1
                        }
                        return flag
                    })
                } else {
                    this.personDataShow = this.personData.filter((data) => {
                        return data.sector === sector.label
                    })
                }
                this.tableForm.totalCount = this.personDataShow.length
            },
            //表单数据操作
            getCount(){       
                this.tableForm.totalCount = this.personData.length
            },
            getList(){
                this.personDataShow = []
                let start = this.tableForm.pageNo - 1
                for(let i = 0;i < this.tableForm.pageSize;i++){
                    if(this.personData[start * this.tableForm.pageSize + i]){
                        this.personDataShow[i] = this.personData[start * this.tableForm.pageSize + i]
                    }
                    else {
                        break
                    }
                }
                this.tableForm.totalCount = this.personData.length
            },
            handleSizeChange(val) {                 // 修改每页所存数据量的值所触发的函数
                this.tableForm.pageSize = val;      // 修改页的大小
                this.getList();                     // 按新的pageNo和pageSize进行查询
            },
            handleCurrentChange(val) {                  // 修改当前页所触发的函数
                this.tableForm.pageNo = val;            // 更新当前的页
                this.getList();                         // 按新的pageNo和pageSize进行查询
            },
            toggleSelection(rows) {
                if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                    his.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            updatePersonData(userId){
                console.log(this.ruleForm.status+'###')
                let person = []
                person = this.personDataShow.filter((data) => {
                    return data.id === userId
                })
                this.ruleForm = person[0]
                console.log(this.ruleForm.status+'@@@@'+person[0].status)
            },
            submitForm(formName) {  
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    //跟新数据操作
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            close() {
                this.ruleForm = {
                    id:'',
                    name: '',
                    sector: '',
                    phone:'',
                    status: false,
                    date: '',
                    role:'',
                }
            },
            deletePersonData(userId){
                //删除当前选择的数据,传入参数userId，然后跟新personDataShow
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    });
                    //发起删除用户请求，更新personDataShow
                    console.log('发起删除用户请求，更新personDataShow')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            addPersonData(){
                let yy = new Date().getFullYear();
                let mm = new Date().getMonth()+1;
                let dd = new Date().getDate(); 
                this.ruleForm.date =  yy+'-'+mm+'-'+dd
            },
            //顶部事件
            clearAllInput(){
                //请求数据，更新personDataShow
                this.idInput = ''
                this.phoneInput = ''
                this.personData = this.$store.state.allUser.allUserList
                this.getList()
            },
            searchByCondition(){
                if (this.nameInput) {//搜索名称
                    // this.personDataShow = this.personDataShow.filter((item) => {
                    //     return data.name === this.nameInput
                    // })
                    this.personData = this.personData.filter(item=>item.name.includes(this.nameInput))
                }
                if (this.phoneInput) {//搜索时间
                    this.personData = this.personData.filter((data) => {
                        return data.phone === this.phoneInput
                    })
                }
                this.personDataShow = this.personData
                this.tableForm.totalCount = this.personDataShow.length
            }
        },
        watch:{
            personDataShow:{
                immediate:true,
                deep:true,
                handler(){
                }
            }
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #fff;
        color: #333;
        text-align: center;
        line-height: 60px;
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
        padding-top: 0px;
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

    .el-pagination {
        text-align: right;
        margin-top: 20px;
    }

    .spanIsOk{
        color: #18A7FF;
    }
    .spanIsNo{
        color: #fb384b;
    }
</style>