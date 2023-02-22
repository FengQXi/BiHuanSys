<template>
    <div class="app-container">
        <!-- @tab-click="handleClick" -->
        <el-tabs v-model="activeName">
            <el-tab-pane name="first">
                <div slot="label">
                    <el-badge :value="pendingSolveList.length" class="item">
                        待处理问题
                    </el-badge>
                </div>

                <el-table :data="pendingSolveList" style="width: 100%" size="mini">
                    <el-table-column type="expand">
                        <template slot-scope="{row, $index}">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="产生原因">
                                    <span>{{ row.cause }}</span>
                                </el-form-item>
                                <el-form-item label="检查级别">
                                    <span>{{ row.level }}</span>
                                </el-form-item>
                                <el-form-item label="问题程度">
                                    <span>{{ row.degree }}</span>
                                </el-form-item>
                                <el-form-item label="负责部门">
                                    <span>{{ row.department.label }}</span>
                                </el-form-item>
                                <el-form-item label="负责人">
                                    <span>{{ row.responsePerson.name }}</span>
                                </el-form-item>
                                <el-form-item label="整改限期">
                                    <span>{{ row.limitTime }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="录入时间" prop="entryTime">
                    </el-table-column>
                    <el-table-column label="问题名称" prop="name">
                    </el-table-column>
                    <el-table-column label="问题描述" prop="describe">
                    </el-table-column>
                    <el-table-column label="问题类别" prop="category">
                    </el-table-column>
                    <el-table-column label="操作" width="300px">
                        <template slot-scope="{row, $index}">
                            <el-button icon="el-icon-edit" type="text" size="mini"
                                @click="checkView(row)">措施查看</el-button>
                            <el-button icon="el-icon-delete" type="text" size="mini" @click="submit(row)">整改提交</el-button>
                            <el-button icon="el-icon-check" type="text" size="mini" @click="">继续下发</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>

            <el-tab-pane name="second">
                <div slot="label">
                    <el-badge :value="pendingCheckList.length" class="item" type="warning">
                        待审核问题
                    </el-badge>
                </div>

                <el-table :data="pendingCheckList" style="width: 100%" size="mini">
                    <el-table-column type="expand">
                        <template slot-scope="{row, $index}">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="产生原因">
                                    <span>{{ row.cause }}</span>
                                </el-form-item>
                                <el-form-item label="检查级别">
                                    <span>{{ row.level }}</span>
                                </el-form-item>
                                <el-form-item label="问题程度">
                                    <span>{{ row.degree }}</span>
                                </el-form-item>
                                <el-form-item label="负责部门">
                                    <span>{{ row.department.label }}</span>
                                </el-form-item>
                                <el-form-item label="负责人">
                                    <span>{{ row.responsePerson.name }}</span>
                                </el-form-item>
                                <el-form-item label="整改限期">
                                    <span>{{ row.limitTime }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="录入时间" prop="entryTime">
                    </el-table-column>
                    <el-table-column label="问题名称" prop="name">
                    </el-table-column>
                    <el-table-column label="问题描述" prop="describe">
                    </el-table-column>
                    <el-table-column label="问题类别" prop="category">
                    </el-table-column>
                    <el-table-column label="操作" width="300px">
                        <template slot-scope="{row, $index}">
                            <el-button icon="el-icon-edit" type="text" size="mini" @click="">证据查看</el-button>
                            <el-button icon="el-icon-delete" type="text" size="mini">整改提交</el-button>
                            <el-button icon="el-icon-check" type="text" size="mini">继续下发</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>

            <el-tab-pane>
                <div slot="label">
                    <el-badge :value="0" class="item" type="primary">
                        经手闭环问题
                    </el-badge>
                </div>
                经手闭环问题
            </el-tab-pane>
        </el-tabs>

        <el-dialog :title="problem.solveMethods ? '修改措施' : '添加措施'" :visible.sync="dialogFormVisible" width="450px">
            <el-form :model="problem">
                <el-form-item label="措施描述" label-width="80px">
                    <el-input v-model="problem.solveMethods" type="textarea"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit()">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ProblemEntry',
    data() {
        return {
            activeName: 'first',
            dialogFormVisible: false,

            pendingSolveList: [{
                id: '2000001',
                entryTime: '2013-02-07',
                name: '单个问题',
                describe: '单个问题的描述',
                category: '安全',
                cause: '制度贯彻，执行问题',
                level: '一级',
                degree: '一般',
                department: {
                    id: '101101',
                    label: '重庆总站下属部门',
                },
                responsePerson: {
                    id: '1000002',
                    name: '大佬'
                },
                solveMethods: 'asdfasf',
                limitTime: '2013-02-07'
            },
            {
                id: '2000002',
                entryTime: '2013-02-07',
                name: '单个问题',
                describe: '单个问题的描述',
                category: '安全',
                cause: '制度贯彻，执行问题',
                level: '一级',
                degree: '一般',
                department: {
                    id: '101101',
                    label: '重庆总站下属部门',
                },
                responsePerson: {
                    id: '1000002',
                    name: '大佬'
                },
                solveMethods: '',
                limitTime: '2013-02-07'
            },
            ],
            pendingCheckList: [{
                id: '2000001',
                entryTime: '2013-02-07',
                name: '单个问题',
                describe: '单个问题的描述',
                category: '安全',
                cause: '制度贯彻，执行问题',
                level: '一级',
                degree: '一般',
                department: {
                    id: '101101',
                    label: '重庆总站下属部门',
                },
                responsePerson: {
                    id: '1000002',
                    name: '大佬'
                },
                limitTime: '2013-02-07'
            },
            {
                id: '2000001',
                entryTime: '2013-02-07',
                name: '单个问题',
                describe: '单个问题的描述',
                category: '安全',
                cause: '制度贯彻，执行问题',
                level: '一级',
                degree: '一般',
                department: {
                    id: '101101',
                    label: '重庆总站下属部门',
                },
                responsePerson: {
                    id: '1000002',
                    name: '大佬'
                },
                limitTime: '2013-02-07'
            },
            {
                id: '2000001',
                entryTime: '2013-02-07',
                name: '单个问题',
                describe: '单个问题的描述',
                category: '安全',
                cause: '制度贯彻，执行问题',
                level: '一级',
                degree: '一般',
                department: {
                    id: '101101',
                    label: '重庆总站下属部门',
                },
                responsePerson: {
                    id: '1000002',
                    name: '大佬'
                },
                limitTime: '2013-02-07'
            },
            {
                id: '2000001',
                entryTime: '2013-02-07',
                name: '单个问题',
                describe: '单个问题的描述',
                category: '安全',
                cause: '制度贯彻，执行问题',
                level: '一级',
                degree: '一般',
                department: {
                    id: '101101',
                    label: '重庆总站下属部门',
                },
                responsePerson: {
                    id: '1000002',
                    name: '大佬'
                },
                limitTime: '2013-02-07'
            },
            ],

            problem: {
                id: '',
                entryTime: '',
                name: '',
                describe: '',
                category: '',
                cause: '',
                level: '',
                degree: '',
                department: {
                    // id: '101101',
                    // label: '重庆总站下属部门',
                },
                responsePerson: {
                    // id: '1000002',
                    // name: '大佬'
                },
                solveMethods: '', // 输入的解决方法
                limitTime: ''
            }
        }
    },
    methods: {
        checkView(row) {
            this.dialogFormVisible = true
            this.problem = row
        },
        cancelEdit() {
            this.dialogFormVisible = false

            // 清空数据
            this.problem = {
                id: '',
                entryTime: '',
                name: '',
                describe: '',
                category: '',
                cause: '',
                level: '',
                degree: '',
                department: {
                    // id: '101101',
                    // label: '重庆总站下属部门',
                },
                responsePerson: {
                    // id: '1000002',
                    // name: '大佬'
                },
                solveMethods: '', // 输入的解决方法
                limitTime: ''
            }
        },
        submit(row) {
            // 发请求
        }
    }
}
</script>

<style scoped>
.item {
    margin: 10px 10px 0px 0px;
}

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 60px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>