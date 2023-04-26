<template>
    <div class="app-container">
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">单个录入</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">文件导入</el-button>

        <el-table :data="problemList" style="width: 100%" size="medium">
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
            <el-table-column label="操作" width="260px">
                <template slot-scope="{row, $index}">
                    <el-button icon="el-icon-edit" type="warning" size="mini" @click="toUpdateProb(row)"
                        style="margin-right: 10px;">修改</el-button>
                    <el-popconfirm title="确定删除吗？" @onConfirm="deleteProblem(row.quesId)">
                        <el-button slot="reference" icon="el-icon-delete" type="danger" size="mini">删除</el-button>
                    </el-popconfirm>
                    <!-- <el-button icon="el-icon-delete" type="danger" size="mini" @click="deleteProblem(row.quesId)">删除</el-button> -->
                    <el-button icon="el-icon-check" type="primary" size="mini" @click="submitProblem(row.quesId)"
                        style="margin-left: 10px;">提交</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="this.problemInfo.id ? '修改问题' : '录入问题'" :visible.sync="dialogFormVisible" @close="dialogClose">
            <el-form :model="problemInfo">
                <el-form-item label="问题名称" label-width="120px" size="mini">
                    <el-input v-model="problemInfo.keyWord"></el-input>
                </el-form-item>

                <el-form-item label="问题描述" label-width="120px" size="mini">
                    <el-input v-model="problemInfo.quesDesc" autosize type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="问题类别" label-width="120px" size="mini">
                    <el-select v-model="problemInfo.category" placeholder="请选择活动区域">
                        <el-option v-for="item in categoryList" :label="item.name" :value="item.name"
                            :disabled="!item.flag"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="产生原因" label-width="120px" size="mini">
                    <el-select v-model="problemInfo.cause" placeholder="请选择活动区域">
                        <el-option v-for="item in causeList" :label="item.name" :value="item.name"
                            :disabled="!item.flag"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="检查级别" label-width="120px" size="mini">
                    <el-select v-model="problemInfo.level" placeholder="请选择活动区域">
                        <el-option v-for="item in levelList" :label="item.name" :value="item.name"
                            :disabled="!item.flag"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="问题程度" label-width="120px" size="mini">
                    <el-select v-model="problemInfo.seriousLevel" placeholder="请选择活动区域">
                        <el-option v-for="item in degreeList" :label="item.name" :value="item.name"
                            :disabled="!item.flag"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="产生部门" label-width="120px" size="mini">
                    <el-select v-model="selectedDepart" placeholder="请选择活动区域" @change="selectDepartChange()">
                        <el-option v-for="item in allDepartList" :label="item.deptName"
                            :value="`${item.deptId}:${item.deptName}`"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="负责人" label-width="120px" size="mini">
                    <el-select v-model="problemInfo.solveId" placeholder="请选择活动区域">
                        <el-option v-for="item in allPeopleList" :label="item.nickName" :value="item.userId"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="整改时限" label-width="120px" size="mini">
                    <el-date-picker v-model="problemInfo.overtime" type="date" placeholder="选择时限" value-format="yyyy-MM-dd"
                        :picker-options="exceptTime">
                    </el-date-picker>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClose()">取 消</el-button>
                <el-button type="primary" @click="confirmUpdate()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="文件导入" :visible.sync="dialogVisible" @closed="closed()">
            <el-upload class="upload-demo" drag multiple action accept=".xlsx,.xls" :auto-upload="false" :on-change="handle"
                style="height: 205px; width: 360px; text-align: center;margin: auto;">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传excel文件,且不超过500kb</div>
            </el-upload>

            <!-- :data -->
            <el-table :data="fileData" style="width: 100%" max-height="250">
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
                                <span>{{ row.overtime.slice(0, 11) }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="录入时间" prop="createTime">
                </el-table-column> -->
                <el-table-column label="问题名称" prop="keyWord">
                </el-table-column>
                <el-table-column label="问题描述" prop="quesDesc">
                </el-table-column>
                <el-table-column label="问题类别" prop="category">
                </el-table-column>
            </el-table>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false;
                submintTheFile()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { readFile, character } from '@/utils/index'
import * as XLSX from 'xlsx'
import { mapGetters, mapState } from 'vuex'
import { reqUserByDept } from '@/api/sysCon/allUser'
import { getUserId } from '@/utils/auth'

export default {
    name: 'ProblemEntry',
    data() {
        return {
            dialogFormVisible: false,
            dialogVisible: false,

            // 所有的部门需要等待计算 先写死的
            // allDepartmentList: [
            //     {
            //         id: 100,
            //         date: '2013-02-07',
            //         label: '项目部',
            //     }, {
            //         id: 101,
            //         date: '2000-04-07',
            //         label: '重庆总站',
            //     }, {
            //         id: 101101,
            //         date: '2013-02-07',
            //         label: '重庆总站下属部门',
            //     }, {
            //         id: 102,
            //         date: '2003-11-09',
            //         label: '川南总站',
            //     }, {
            //         id: 102102,
            //         date: '2013-02-07',
            //         label: '川南总站下属部门'
            //     }, {
            //         id: 6,
            //         date: '2013-02-07',
            //         label: '川南总站下属部门'
            //     }, {
            //         id: 104,
            //         date: '2019-12-07',
            //         label: '成都总站',
            //     }, {
            //         id: 7,
            //         date: '2013-02-07',
            //         label: '成都总站下属部门'
            //     }, {
            //         id: 8,
            //         date: '2013-02-07',
            //         label: '成都总站下属部门'
            //     }, {
            //         id: 105,
            //         date: '2013-02-07',
            //         label: '办公室',
            //     }, {
            //         id: 106,
            //         date: '2013-02-07',
            //         label: '财务共享中心',
            //     }, {
            //         id: 107,
            //         date: '2013-02-07',
            //         label: '物联网业务部',
            //     }, {
            //         id: 108,
            //         date: '2013-02-07',
            //         label: '党群科',
            //     }],
            // 这里不是全部人的列表 是需要选择部门后 查询所得
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

            problemInfo: { // 收集新增和修改的问题的信息
                // createTime: '',
                // name: '',
                // describe: '',
                // category: '',
                // cause: '',
                // level: '',
                // degree: '',
                // department: {
                //     // id: '',
                //     // label: '',
                // },
                // responsePerson: {
                //     // id: '',
                //     // name: ''
                // },
                // limitTime: ''

                quesId: null,
                keyWord: '',
                quesDesc: '',
                category: '',
                cause: '',
                level: '',
                seriousLevel: '',
                quesDept: '',
                solveId: null,
                overtime: '',

                checkId: null,
                solveMethod: '',

            },
            selectedDepart: '',
            // 设置日期在天之前的都不能选择
            exceptTime: {
                disabledDate(date) {
                    //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
                    return date.getTime() < Date.now() - 24 * 60 * 60 * 1000
                }
            },
            //文件操作数据
            fileData: []
        }
    },
    computed: {

        ...mapState('template', ['categoryList', 'causeList', 'levelList', 'degreeList']),
        ...mapState('problem', ['problemList',]), // 获取未提交的问题列表

        ...mapGetters('department', ['allDepartList']), // 获取所有部门列表
    },
    methods: {
        toUpdateProb(row) {
            // 这里数据结构复杂 要深拷贝
            // this.problemInfo = cloneDeep(row)
            this.problemInfo = JSON.parse(JSON.stringify(row))
            this.selectedDepart = row.quesDept

            this.dialogFormVisible = true
        },
        async selectDepartChange() {
            const [deptId, deptName] = this.selectedDepart.split(':')
            // 发请求二级联动
            let result = await reqUserByDept(deptId)
            // console.log(result);
            this.allPeopleList = result.data

            this.problemInfo.quesDept = deptName
        },
        dialogClose() {
            // 清除数据  防止残留
            this.problemInfo = { // 收集新增和修改的问题的信息
                quesId: null,
                keyWord: '',
                quesDesc: '',
                category: '',
                cause: '',
                level: '',
                seriousLevel: '',
                quesDept: '',
                solveId: null,
                overtime: '',

                checkId: null,
                solveMethod: '',
            },
                this.selectedDepart = ''

            this.dialogFormVisible = false
        },
        confirmUpdate() {


            this.problemInfo.checkId = this.$store.state.user.token

            if (this.problemInfo.quesId) {
                // console.log("2213");
                this.$delete(this.problemInfo, 'createTime')
                this.$store.dispatch('problem/updateProblem', this.problemInfo)
            }
            else this.$store.dispatch('problem/addProblem', this.problemInfo)
            // 发请求

            this.dialogClose()
        },
        deleteProblem(id) {
            this.$store.dispatch('problem/deleteProblem', id)
            // 回显
            // this.$store.dispatch('problem/get0ProblemList', {
            //     checkId: parseInt(this.$store.state.user.token)
            // })
        },
        submitProblem(id) {
            this.$store.dispatch('problem/submitProblem', id)
            // 回显
            // this.$store.dispatch('problem/get0ProblemList', {
            //     checkId: parseInt(this.$store.state.user.token)
            // })
        },
        //文件导入操作
        async handle(ev) {
            if (ev.row) return

            let data = await readFile(ev.raw);
            let workBook = XLSX.read(data, { type: 'binary' })
            let workSheet = workBook.Sheets[workBook.SheetNames[0]]
            data = XLSX.utils.sheet_to_json(workSheet)

            let arr = []
            data.forEach(item => {
                let obj = this.problemInfo
                for (let key in character) {
                    if (!character.hasOwnProperty(key)) break
                    let v = character[key]
                    let text = v.text
                    let type = v.type
                    v = item[text] || ''
                    type === 'string' ? (v = String(v)) : null
                    type === 'Int' ? (v = Int(v)) : null
                    obj[key] = v
                }
                arr.push(obj)
                this.dialogClose()
            })
            this.fileData = arr
        },
        submintTheFile() {
            this.fileData.forEach(item => {
                item.checkId = this.$store.state.user.token
            })
            this.fileData.forEach(item => {
                if (!/^\d+$/.test(item.overtime)) return
                item.overtime = parseInt(item.overtime)
                let millisecond = 0 // 转化后的毫秒数
                if (item.overtime > 60) { // 对大于60的日期进行减1处理
                    millisecond = (item.overtime - 25568 - 1) * 3600 * 24 * 1000
                } else {
                    millisecond = (item.overtime - 25568) * 3600 * 24 * 1000
                }
                const date = new Date(millisecond) // 根据转化后的毫秒数获取对应的时间
                const yy = date.getFullYear()
                const m = date.getMonth() + 1
                const mm = m >= 10 ? m : '0' + m
                const d = date.getDate()
                const dd = d >= 10 ? d : '0' + d
                const time = yy + '-' + mm + '-' + dd
                item.overtime = time
            })
            this.$store.dispatch('problem/getSubmitTheFile', this.fileData)
        },
        closed() {
            this.fileData = []
        }
    },
    mounted() {
        this.$store.dispatch('problem/get0ProblemList', {
            checkId: parseInt(getUserId())
        })
    }
}
</script>

<style scoped>
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
}</style>