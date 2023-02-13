<template>
    <div class="app-container">
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">录入问题</el-button>

        <el-table :data="problemList" style="width: 100%">
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
            <el-table-column label="操作" width="260px">
                <template slot-scope="{row, $index}">
                    <el-button icon="el-icon-edit" type="warning" size="mini" @click="toUpdateProb(row)">修改</el-button>
                    <el-button icon="el-icon-delete" type="danger" size="mini">删除</el-button>
                    <el-button icon="el-icon-check" type="primary" size="mini">提交</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="this.problemInfo.id ? '修改问题' : '录入问题'" :visible.sync="dialogFormVisible" @close="dialogClose">
            <el-form :model="problemInfo">
                <el-form-item label="问题名称" label-width="120px" size="mini">
                    <el-input v-model="problemInfo.name"></el-input>
                </el-form-item>

                <el-form-item label="问题描述" label-width="120px" size="mini">
                    <el-input v-model="problemInfo.describe" autosize type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="问题类别" label-width="120px" size="mini">
                    <el-select v-model="problemInfo.category" placeholder="请选择活动区域">
                        <el-option v-for="item in categoryList" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="产生原因" label-width="120px" size="mini">
                    <el-select v-model="problemInfo.cause" placeholder="请选择活动区域">
                        <el-option v-for="item in causeList" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="检查级别" label-width="120px" size="mini">
                    <el-select v-model="problemInfo.level" placeholder="请选择活动区域">
                        <el-option v-for="item in levelList" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="问题程度" label-width="120px" size="mini">
                    <el-select v-model="problemInfo.degree" placeholder="请选择活动区域">
                        <el-option v-for="item in degreeList" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="产生部门" label-width="120px" size="mini">
                    <el-select v-model="selectedDepart" placeholder="请选择活动区域">
                        <el-option v-for="item in allDepartmentList" :label="item.label"
                            :value="`${item.id}:${item.label}`"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="负责人" label-width="120px" size="mini">
                    <el-select v-model="selectedPerson" placeholder="请选择活动区域">
                        <el-option v-for="item in allPeopleList" :label="item.name"
                            :value="`${item.id}:${item.name}`"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="整改时限" label-width="120px" size="mini">
                    <el-date-picker v-model="problemInfo.limitTime" type="date" placeholder="选择时限" value-format="yyyy-MM-dd" :picker-options="exceptTime">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClose">取 消</el-button>
                <el-button type="primary" @click="confirmUpdate">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ProblemEntry',
    data() {
        return {
            dialogFormVisible: false,
            categoryList: [
                {
                    id: '110',
                    name: '安全'
                },
                {
                    id: '111',
                    name: '生产',
                },
                {
                    id: '112',
                    name: '财务',
                },
                {
                    id: '113',
                    name: '巡查',
                },
                {
                    id: '114',
                    name: '审计',
                },
                {
                    id: '115',
                    name: '施工',
                },
                {
                    id: '116',
                    name: '其他',
                }
            ],
            causeList: [
                {
                    id: '1010',
                    name: '制度贯彻，执行问题'
                },
                {
                    id: '1011',
                    name: '思想认知问题'
                },
                {
                    id: '1012',
                    name: '管理存在漏洞'
                },
                {
                    id: '1013',
                    name: '能力欠缺问题'
                },
                {
                    id: '1014',
                    name: '履职问题'
                },
                {
                    id: '1015',
                    name: '业务流程问题'
                },
                {
                    id: '1016',
                    name: '其他'
                }
            ],
            levelList: [
                {
                    id: '10010',
                    name: '一级'
                },
                {
                    id: '10011',
                    name: '二级'
                }
            ],
            degreeList: [
                {
                    id: '100001',
                    name: '一般'
                },
                {
                    id: '100002',
                    name: '普通'
                },
                {
                    id: '100003',
                    name: '严重'
                }
            ],
            allDepartmentList: [
                {
                    id: 100,
                    date: '2013-02-07',
                    label: '项目部',
                }, {
                    id: 101,
                    date: '2000-04-07',
                    label: '重庆总站',
                }, {
                    id: 101101,
                    date: '2013-02-07',
                    label: '重庆总站下属部门',
                }, {
                    id: 102,
                    date: '2003-11-09',
                    label: '川南总站',
                }, {
                    id: 102102,
                    date: '2013-02-07',
                    label: '川南总站下属部门'
                }, {
                    id: 6,
                    date: '2013-02-07',
                    label: '川南总站下属部门'
                }, {
                    id: 104,
                    date: '2019-12-07',
                    label: '成都总站',
                }, {
                    id: 7,
                    date: '2013-02-07',
                    label: '成都总站下属部门'
                }, {
                    id: 8,
                    date: '2013-02-07',
                    label: '成都总站下属部门'
                }, {
                    id: 105,
                    date: '2013-02-07',
                    label: '办公室',
                }, {
                    id: 106,
                    date: '2013-02-07',
                    label: '财务共享中心',
                }, {
                    id: 107,
                    date: '2013-02-07',
                    label: '物联网业务部',
                }, {
                    id: 108,
                    date: '2013-02-07',
                    label: '党群科',
                }],
            allPeopleList: [
                {
                    id: '1000001',
                    name: '老丁'
                },
                {
                    id: '1000002',
                    name: '大佬'
                },
                {
                    id: '1000003',
                    name: '尤禹溪'
                },
                {
                    id: '1000004',
                    name: '花裤衩'
                },
                {
                    id: '1000005',
                    name: '优兹哎'
                },
                {
                    id: '1000006',
                    name: '读硬币'
                }
            ],

            problemList: [{
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
            problemInfo: { // 收集新增和修改的问题的信息
                entryTime: '',
                name: '',
                describe: '',
                category: '',
                cause: '',
                level: '',
                degree: '',
                department: {
                    // id: '',
                    // label: '',
                },
                responsePerson: {
                    // id: '',
                    // name: ''
                },
                limitTime: ''
            },
            selectedDepart: '',
            selectedPerson: '',
            exceptTime: {
				disabledDate(date) {
			        //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
                    // 今天之前的都不能选择
					return date.getTime() < Date.now() - 24 * 60 * 60 * 1000
				}
			},
        }
    },
    methods: {
        toUpdateProb(row) {
            // 这里数据结构复杂 要深拷贝
            // this.problemInfo = cloneDeep(row)
            this.problemInfo = JSON.parse(JSON.stringify(row))
            this.selectedDepart = row.department.label
            this.selectedPerson = row.responsePerson.name

            this.dialogFormVisible = true
        },
        dialogClose() {
            // 清除数据  防止残留
            this.problemInfo = { // 收集新增和修改的问题的信息
                entryTime: '',
                name: '',
                describe: '',
                category: '',
                cause: '',
                level: '',
                degree: '',
                department: {
                    // id: '',
                    // label: '',
                },
                responsePerson: {
                    // id: '',
                    // name: ''
                },
                limitTime: ''
            },
                this.selectedDepart = ''
            this.selectedPerson = ''

            this.dialogFormVisible = false
        },
        confirmUpdate() {
            const [departmentId, departmentLabel] = this.selectedDepart.split(':')
            const [personId, personName] = this.selectedPerson.split(':')

            this.problemInfo.department = { id: departmentId, label: departmentLabel }
            this.problemInfo.responsePerson = { id: personId, name: personName }

            // 发请求

            this.dialogClose()
        }
    },
}
</script>

<style scoped>
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>