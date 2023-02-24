<template>
    <div class="app-container">
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 20px;"
            @click="dialogFormVisible = true">添加部门</el-button>


        <el-table :data="departmentList" style="width: 100%;margin-bottom: 20px;" row-key="deptId" border default-expand-all
            :tree-props="{ children: 'sub' }">

            <el-table-column prop="createTime" label="创建日期" sortable width="280">
            </el-table-column>

            <el-table-column label="部门名称" width="280">
                <template slot-scope="{row, $index}">
                    <el-tag v-if="!row.parentId" size="medium" type="success">{{ row.deptName }}</el-tag>
                    <el-tag v-else size="medium" type="success" style="float: right">{{ row.deptName }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="操作" align="right">
                <template slot-scope="{row, $index}">
                    <el-button v-if="!row.parentId" size="mini" type="primary" @click="dialogFormVisible = true">添加下级部门</el-button>

                    <el-button size="mini" type="danger" @click="deleteDepart(row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>



        <el-dialog title="添加部门" :visible.sync="dialogFormVisible" @close="cancel()">
            <el-form :model="formData">
                <el-form-item label="部门名称" label-width="120px">
                    <el-input v-model="formData.deptName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取 消</el-button>
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
        addDepart() {
            this.$store.dispatch('department/addDepart', this.formData)
        },
        deleteDepart(row) {
            // console.log(row);
            this.$store.dispatch('department/deleteDepart', row.deptId)
        },
        cancel() {
            this.formData = { // 清空数据
                parentId: '',
                deptName: '',
            }
            this.dialogFormVisible = false
        },
    },
    mounted() {
        //获取所有部门信息
        this.$store.dispatch('department/getDepartList')
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