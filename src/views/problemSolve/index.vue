<template>
    <div class="app-container">
        <!-- @tab-click="handleClick" -->
        <el-tabs v-model="activeName">
            <!--  待处理问题 -->
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
                                    <span>{{ row.seriousLevel }}</span>
                                </el-form-item>
                                <el-form-item label="负责部门">
                                    <span>{{ row.quesDept }}</span>
                                </el-form-item>
                                <el-form-item label="负责人">
                                    <span>{{ row.solveId }}</span>
                                </el-form-item>
                                <el-form-item label="整改限期">
                                    <span>{{ row.overtime.slice(0, 10) }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="录入时间" prop="createTime">
                    </el-table-column>
                    <el-table-column label="问题名称" prop="keyWord">
                    </el-table-column>
                    <el-table-column label="问题描述" prop="quesDesc">
                    </el-table-column>
                    <el-table-column label="问题类别" prop="category">
                    </el-table-column>
                    <el-table-column label="操作" width="300px">
                        <template slot-scope="{row, $index}">
                            <el-button icon="el-icon-edit" type="text" size="mini" @click="checkView(row)">
                                措施查看</el-button>
                            <el-button icon="el-icon-delete" type="text" size="mini" @click="submitReform(row)">
                                整改提交</el-button>
                            <!-- 
                                <el-button icon="el-icon-check" type="text" size="mini" @click="distributed(row)">继续下发</el-button>
                            -->
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <!-- 待审核问题 -->
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
                                    <span>{{ row.seriousLevel }}</span>
                                </el-form-item>
                                <el-form-item label="负责部门">
                                    <span>{{ row.quesDept }}</span>
                                </el-form-item>
                                <el-form-item label="负责人">
                                    <span>{{ row.solveId }}</span>
                                </el-form-item>
                                <el-form-item label="整改限期">
                                    <span>{{ row.overtime.slice(0, 10) }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="录入时间" prop="createTime">
                    </el-table-column>
                    <el-table-column label="问题名称" prop="keyWord">
                    </el-table-column>
                    <el-table-column label="问题描述" prop="quesDesc">
                    </el-table-column>
                    <el-table-column label="问题类别" prop="category">
                    </el-table-column>
                    <el-table-column label="操作" width="300px">
                        <template slot-scope="{row, $index}">
                            <el-button icon="el-icon-edit" type="text" size="mini" @click="checkViewDrawer(row)">
                                措施查看</el-button>
                            <el-button icon="el-icon-check" type="text" size="mini" @click="submitExamine(row)">
                                审核通过</el-button>
                            <el-button icon="el-icon-delete" type="text" size="mini" @click="removePending(row)">
                                重新处理</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <!-- 经手闭环问题 -->
            <el-tab-pane>
                <div slot="label">
                    <el-badge :value="completedList.length" class="item" type="primary">
                        经手闭环问题
                    </el-badge>
                </div>
                <!-- 经手闭环问题 -->
                <el-table :data="completedList" style="width: 100%" size="mini">
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
                                    <span>{{ row.seriousLevel }}</span>
                                </el-form-item>
                                <el-form-item label="负责部门">
                                    <span>{{ row.quesDept }}</span>
                                </el-form-item>
                                <el-form-item label="负责人">
                                    <span>{{ row.solveId }}</span>
                                </el-form-item>
                                <el-form-item label="整改限期">
                                    <span>{{ row.overtime.slice(0, 10) }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="录入时间" prop="createTime">
                    </el-table-column>
                    <el-table-column label="问题名称" prop="keyWord">
                    </el-table-column>
                    <el-table-column label="问题描述" prop="quesDesc">
                    </el-table-column>
                    <el-table-column label="问题类别" prop="category">
                    </el-table-column>
                    <!-- <el-table-column label="操作" width="300px">
                        <template slot-scope="{row, $index}">
                            <el-button icon="el-icon-edit" type="text" size="mini" @click="checkViewDrawer(row)">
                                措施查看</el-button>
                            <el-button icon="el-icon-delete" type="text" size="mini" @click="submit(row)">
                                整改提交</el-button> -->
                    <!-- <el-button icon="el-icon-check" type="text" size="mini">继续下发</el-button> -->
                    <!-- </template>
                    </el-table-column> -->
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <el-dialog :title="problem.solveMethods ? '修改措施' : '添加措施'" :visible.sync="dialogFormVisible" width="450px">
            <el-form :model="problem">
                <el-form-item label="措施描述" label-width="80px">
                    <el-input v-model="problem.solveMethod" type="textarea"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit()">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false;
                commitMethod()">确 定</el-button>
            </div>
        </el-dialog>
        <el-drawer title="措施查看" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
            <div style="margin: 10px 20px 0px 20px; border: 1px solid black; border-radius: 4px; padding: 4px">{{
                this.problem.solveMethod }}</div>
        </el-drawer>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ProblemSolve',
    data() {
        return {
            activeName: 'first',
            dialogFormVisible: false,

            // problem: {
            //     id: '',
            //     entryTime: '',
            //     name: '',
            //     describe: '',
            //     category: '',
            //     cause: '',
            //     level: '',
            //     degree: '',
            //     department: {
            //         // id: '101101',
            //         // label: '重庆总站下属部门',
            //     },
            //     responsePerson: {
            //         // id: '1000002',
            //         // name: '大佬'
            //     },
            //     solveMethods: '', // 输入的解决方法
            //     limitTime: ''
            // }
            problem: {
                quesId: '',
                category: '',
                level: '',
                solveId: null,
                quesDept: '',
                seriousLevel: '',
                cause: '',
                createTime: '',
                quesDesc: '',
                name: '',
                problemState: '',
                overTime: '',
            },
            //抽屉数据
            drawer: false,
            direction: 'rtl',
        }
    },
    computed: {
        ...mapState('problem', ['pendingSolveList', 'pendingCheckList', 'completedList'])
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
        commitMethod() {
            this.$store.dispatch('problem/getSolveMethod', {
                quesId: this.problem.quesId,
                solveMethod: this.problem.solveMethod
            })
        },
        submitReform(row) {
            this.$store.dispatch('problem/getChangeStatusReform', row.quesId)

            // this.$store.dispatch('problem/getPendingSolve', {
            //     checkId: parseInt(this.$store.state.user.token)
            // })
            // this.$store.dispatch('problem/getPendingCheck', {
            //     checkId: parseInt(this.$store.state.user.token)
            // })
            // this.$store.dispatch('problem/getCompletedList', {
            //     checkId: parseInt(this.$store.state.user.token)
            // })
        },
        submitExamine(row) {
            //发请求, 改变问题
            //this.row.problemState = parseInt(this.row.problemState) + 1
            //更新列表
            // this.problem = row
            this.$store.dispatch('problem/getChangeStatusExamine', row.quesId)

            // this.$store.dispatch('problem/getPendingSolve', {
            //     checkId: parseInt(this.$store.state.user.token)
            // })
            // this.$store.dispatch('problem/getPendingCheck', {
            //     checkId: parseInt(this.$store.state.user.token)
            // })
            // this.$store.dispatch('problem/getCompletedList', {
            //     checkId: parseInt(this.$store.state.user.token)
            // })

        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        checkViewDrawer(row) {
            this.drawer = true
            this.problem = row
        },
        removePending(row) {
            this.problem = row
            this.$store.dispatch('problem/getRemoveStatus', this.problem.quesId)

            // this.$store.dispatch('problem/getPendingSolve', {
            //     checkId: parseInt(this.$store.state.user.token)
            // })
            // this.$store.dispatch('problem/getPendingCheck', {
            //     checkId: parseInt(this.$store.state.user.token)
            // })
            // this.$store.dispatch('problem/getCompletedList', {
            //     checkId: parseInt(this.$store.state.user.token)
            // })
        }
    },
    mounted() {
        this.$store.dispatch('problem/getPendingSolve', {
            checkId: parseInt(this.$store.state.user.token)
        })
        this.$store.dispatch('problem/getPendingCheck', {
            checkId: parseInt(this.$store.state.user.token)
        })
        this.$store.dispatch('problem/getCompletedList', {
            checkId: parseInt(this.$store.state.user.token)
        })
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