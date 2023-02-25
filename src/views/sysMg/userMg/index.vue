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
                            v-model="searchdata.userName">
                        </el-input>
                    </div></el-col>
                    <!-- 输入手机号 -->
                    <el-col :span="7"><div class="grid-content bg-purple">手机号
                        <el-input
                            size="medium"
                            placeholder="请输入手机号"
                            style="width: 180px"
                            prefix-icon="el-icon-search"
                            v-model="searchdata.phonenumber">
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
                        :data="departmentList"
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
                        :data="personData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        max-height="490px">
                        <el-table-column
                            prop="userId"
                            label="用户Id"
                            width="135"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="nickName"
                            label="用户昵称"
                            width="135"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="deptName"
                            label="部门"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="phonenumber"
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
                            prop="createTime"
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
                                        updatePersonData(scope.row.userId);">
                                </el-button>
                                <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deletePersonData(scope.row.userId)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页器 -->
                    <div class="block">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="tableForm.page"
                            :page-sizes="[6,8,10,12]"
                            :page-size="tableForm.limit"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalCount">
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
                            <el-form-item label="用户名称" prop="userId">
                                <el-input v-model="ruleForm.userId" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="用户昵称" prop="nickName">
                                <el-input v-model="ruleForm.nickName"></el-input>
                            </el-form-item>
                            <el-form-item label="归属部门" prop="deptName">
                                <!-- <el-input v-model="ruleForm.sector"></el-input> -->
                                <el-select v-model="ruleForm.deptName" placeholder="请选择部门">
                                    <el-option
                                        v-for="item in departmentList"
                                        :key="item.deptId"
                                        :label="item.deptName"
                                        :value="item.deptName">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="手机电话" prop="phonenumber">
                                <el-input v-model="ruleForm.phonenumber"></el-input>
                            </el-form-item>
                            <el-form-item label="用户角色" prop="roleName" show-message:false>
                                <!-- <el-select v-model="ruleForm.roleName" placeholder="请选择用户角色">
                                    <el-option label="超级用户" value="role1"></el-option>
                                    <el-option label="普通用户" value="role2"></el-option>
                                </el-select> -->
                                <el-select v-model="ruleForm.roleName" placeholder="请选择用户角色">
                                    <el-option
                                        v-for="item in roleList"
                                        :key="item.roleId"
                                        :label="item.roleName"
                                        :value="item.roleName">
                                    </el-option>
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
                            <el-form-item label="用户名称" prop="userId">
                                <el-input v-model="ruleForm.userId" ></el-input>
                            </el-form-item>
                            <el-form-item label="用户昵称" prop="nickName">
                                <el-input v-model="ruleForm.nickName"></el-input>
                            </el-form-item>
                            <el-form-item label="归属部门">
                                <!-- <el-input v-model="ruleForm.deptName"></el-input> -->
                                <!-- <el-select v-model="ruleForm.deptName" placeholder="请选择部门">
                                    <el-option
                                        v-for="item in departmentList"
                                        :key="item.deptId"
                                        :label="item.deptName"
                                        :value="`${item.deptId}:${item.deptName}`">
                                    </el-option>
                                </el-select> -->
                                <el-select v-model="ruleForm.deptName" placeholder="请选择部门">
                                    <el-option
                                        v-for="item in departmentList"
                                        :key="item.deptId"
                                        :label="item.deptName"
                                        :value="`${item.deptId}:${item.deptName}`">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="手机电话" prop="phonenumber">
                                <el-input v-model="ruleForm.phonenumber"></el-input>
                            </el-form-item>
                            <el-form-item label="用户角色" prop="roleName" show-message:false>
                                <!-- <el-select v-model="ruleForm.region" placeholder="请选择用户角色">
                                    <el-option label="超级用户" value="role1"></el-option>
                                    <el-option label="普通用户" value="role2"></el-option>
                                </el-select> -->
                                <el-select v-model="ruleForm.roleName" placeholder="请选择用户角色">
                                    <el-option
                                        v-for="item in roleList"
                                        :key="item.roleId"
                                        :label="item.roleName"
                                        :value="`${item.roleId}:${item.roleName}`">
                                    </el-option>
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
    import { mapState } from 'vuex'

    export default {
        name: 'UserManagement',
        data() {
            return {
                //侧边栏部门数据
                defaultProps: {
                    children: 'sub',
                    label: 'deptName'
                },
                //修改时参数数据
                centerDialogVisibleUpdate: false,
                centerDialogVisibleAdd: false,
                ruleForm: {
                    userId:'',
                    nickName: '',
                    deptName: '',
                    phonenumber:'',
                    status: '',
                    roleName:'',
                    createTime:'',
                    deptId:'',
                    roleId:'',
                },
                rules: {
                    nickName: [
                        { required: true, message: '请输入用户昵称', trigger: 'blur' },
                        { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                    ],
                    // deptName: [
                    //     { required: true, message: '请输入归属部门', trigger: 'blur' },
                    // ],
                    phonenumber: [
                        { required: true, message: '请输入电话号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度为 11 个字符', trigger: 'blur' }
                    ],
                    // roleName: [
                    //     { required: false, message: '请选择用户角色', trigger: 'change' }
                    // ],
                },
                //顶部搜索栏数据
                searchdata:{
                    userName:'',
                    phonenumber:'',
                    deptId:'',
                },
                tableForm: {
                    page:1,       // 默认当前是第一页
                    limit:8,    // 当前每页的数据是10条
                },
                totalCount:0    // 总数默认为0
            }
        },
        computed: {
            ...mapState('department', ['departmentList']),
            ...mapState('allUser', ['allUserList']),
            ...mapState('roleAndAuthority',['roleList']),
            personData() {
                // 深拷贝
                return JSON.parse(JSON.stringify(this.allUserList))
            },
            personDataShow:{
                get(){
                    let arr = []
                    let start = this.tableForm.page - 1
                    for(let i = 0;i < this.tableForm.limit;i++){
                        if(this.personData[start * this.tableForm.limit + i]){
                            arr[i] = this.personData[start * this.tableForm.limit + i]
                        }
                        else {
                            break
                        }
                    }
                    this.totalCount = this.personData.length
                    return arr
                },
                set(value){}
            },
        },
        methods:{
            //侧边栏部门点击事件
            handleNodeClick(sector){
                this.searchdata.userName = ''
                this.searchdata.phonenumber = ''
                this.searchdata.deptId = sector.deptId
                this.$store.dispatch('allUser/getAllUserList',this.searchdata)//顶部按钮点击
            },
            //分页器数据
            handleSizeChange(val) {
                this.tableForm.limit = val;      // 修改页的大小
            },
            handleCurrentChange(val) {                  
                this.tableForm.page = val;            // 更新当前的页
            },
            //弹出框事件
            updatePersonData(userId){
                let person = []
                person = this.personData.filter((data) => {
                    return data.userId === userId
                })
                this.ruleForm = person
            },
            submitForm(formName) {  
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //跟新数据操作
                        let arr = this.ruleForm.deptName.split(':')
                        // 修改spu对象
                        console.log(this.ruleForm.deptName)
                        this.ruleForm.deptName = arr[1]
                        this.ruleForm.deptId = arr[0]
                        // arr = this.ruleForm.roleName.split(':')
                        arr = this.selectDept.split(':')
                        // 修改spu对象
                        this.ruleForm.roleName = arr[1]
                        this.ruleForm.roleId = arr[0]
                        console.log(this.ruleForm)
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            close() {
                this.ruleForm = {
                    userId:'',
                    nickName: '',
                    deptName: '',
                    phonenumber:'',
                    status: '',
                    roleName:'',
                    createTime:'',
                    deptId:'',
                    roleId:'',
                }
            },
            //删除操作
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
            //新增操作
            addPersonData(){
                let yy = new Date().getFullYear();
                let mm = new Date().getMonth()+1;
                let dd = new Date().getDate(); 
                this.ruleForm.date =  yy+'-'+mm+'-'+dd
            },
            //顶部事件
            clearAllInput(){
                this.searchdata.userName = ''
                this.searchdata.phonenumber = ''
                this.tableForm.page = 1
                this.tableForm.limit = 8
                this.$store.dispatch('allUser/getAllUserList',this.searchdata,this.tableForm)
                //显示条数的修改
                //this.totalCount = 
            },
            searchByCondition(){
                this.$store.dispatch('allUser/getAllUserList',this.searchdata)//顶部按钮点击
            }
        },
        // watch:{
        //     personDataShow:{
        //         immediate:true,
        //         deep:true,
        //         handler(){}
        //     }
        // },
        mounted() {
            //传入分页的数据，返回当前页展示的数据
            //this.$store.dispatch('allUser/getAllUserList',this.searchdata,this.tableForm)
            this.$store.dispatch('allUser/getAllUserList', {...this.searchdata, ...this.tableForm})
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