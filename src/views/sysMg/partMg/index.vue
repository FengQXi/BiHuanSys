<template>
    <div class="app-container">
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 20px;"
            @click="dialogFormVisible = true">添加部门</el-button>


        <el-table :data="departmentList" style="width: 100%;margin-bottom: 20px;" row-key="deptId" border default-expand-all
            :tree-props="{ children: 'sub' }">

            <el-table-column label="创建日期" sortable width="280">
                <template slot-scope="{row, $index}">
                    <span style="margin-left: 10px">{{ row.createTime.slice(0, 10) }}</span>
                </template>
            </el-table-column>

            <el-table-column label="部门名称" width="280">
                <template slot-scope="{row, $index}">
                    <el-tag v-if="!row.parentId" size="medium" type="success">{{ row.deptName }}</el-tag>
                    <el-tag v-else size="medium" type="success" style="float: right">{{ row.deptName }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="操作" align="right">
                <template slot-scope="{row, $index}">
                    <el-button v-if="!row.parentId" size="mini" type="primary" @click="toAddDepart(row)" style="margin-right: 20px">添加下级部门</el-button>

                    <el-popconfirm :title="`确定删除(${row.deptName})吗？`" @onConfirm="deleteDepart(row)">
                        <el-button size="mini" type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>
                    <!-- <el-button size="mini" type="danger" @click="deleteDepart(row)">删除</el-button> -->
                </template>
            </el-table-column>

        </el-table>



        <el-dialog title="添加部门" :visible.sync="dialogFormVisible" @close="closeDialog()">
            <el-form :model="formData">
                <el-form-item label="部门名称" label-width="120px">
                    <el-input v-model="formData.deptName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog()">取 消</el-button>
                <el-button type="primary" @click="addDepart()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';

let id = 1000

export default {
    name: 'DepartmentManagement',
    data() {
        return {
            dialogFormVisible: false,
            formData: {
                parentId: '',
                deptName: '',
            },
        }
    },
    computed: {
        ...mapState('department', ['departmentList']),
    },
    methods: {
        toAddDepart(row) {
            this.formData.parentId = row.deptId
            this.dialogFormVisible = true
        },
        addDepart() {
            this.$store.dispatch('department/addDepart', this.formData)
            this.closeDialog()
        },
        deleteDepart(row) {
            // console.log(row);
            this.$store.dispatch('department/deleteDepart', row.deptId)
        },
        closeDialog() {
            this.formData = { // 清空数据
                parentId: '',
                deptName: '',
            }
            this.dialogFormVisible = false
        },
    },
    mounted() {
        //获取所有部门信息
        // this.$store.dispatch('department/getDepartList')
    },
}
</script>

<style>
.el-tree-node__content {
    margin: 4px 0px;
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>