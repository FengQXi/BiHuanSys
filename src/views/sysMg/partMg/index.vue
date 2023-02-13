<template>
    <div class="app-container">
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 20px;"
            @click="dialogFormVisible = true">添加部门</el-button>


        <el-table :data="depart" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
            :tree-props="{ children: 'children' }">

            <el-table-column prop="date" label="创建日期" sortable width="280">
            </el-table-column>

            <el-table-column label="部门名称" width="280">
                <template slot-scope="{row, $index}">
                    <el-tag v-if="row.children" size="medium" type="success">{{ row.label }}</el-tag>
                    <el-tag v-else size="medium" type="success" style="float: right">{{ row.label }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="操作" align="right">
                <template slot-scope="{row, $index}">
                    <el-button v-if="row.children" size="mini" type="primary" @click="dialogFormVisible = true">添加下级部门</el-button>

                    <el-button size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>

        </el-table>


        <!-- <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
            <div class="custom-tree-node" slot-scope="{ node, data }" style="font-size: 18px;">
                <span>{{ node.label }}</span>
                <div>
                    <el-button v-if="node.level == '1'" type="primary" size="mini" @click="dialogFormVisible = true">
                        添加下级部门
                    </el-button>
                    <el-button type="danger" size="mini" @click="() => remove(node, data)">
                        删除
                    </el-button>
                </div>
            </div>
        </el-tree> -->

        <el-dialog title="添加部门" :visible.sync="dialogFormVisible">
            <el-form :model="formData">
                <el-form-item label="部门名称" label-width="120px">
                    <el-input v-model="formData.newDepartName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
let id = 1000

export default {
    name: 'DepartmentManagement',
    data() {
        const data = [{
            id: 1,
            label: '一级 1',
            level: '1',
            children: [{
                id: 4,
                label: '二级 1-1',
                level: '2',
            }]
        }, {
            id: 2,
            label: '一级 2',
            level: '1',
            children: [{
                id: 5,
                label: '二级 2-1',
                level: '2',
            }, {
                id: 6,
                label: '二级 2-2',
                level: '2',
            }]
        }, {
            id: 3,
            label: '一级 3',
            level: '1',
            children: [{
                id: 7,
                label: '二级 3-1',
                level: '2',
            }, {
                id: 8,
                label: '二级 3-2',
                level: '2',
            }]
        }];
        const depart = [
            {
                id: 100,
                date: '2013-02-07',
                label: '项目部',
                children: []
            }, {
                id: 101,
                date: '2000-04-07',
                label: '重庆总站',
                children: [{
                    id: 101101,
                    date: '2013-02-07',
                    label: '重庆总站下属部门',
                }]
            }, {
                id: 102,
                date: '2003-11-09',
                label: '川南总站',
                children: [{
                    id: 102102,
                    date: '2013-02-07',
                    label: '川南总站下属部门'
                }, {
                    id: 6,
                    date: '2013-02-07',
                    label: '川南总站下属部门'
                }]
            }, {
                id: 104,
                date: '2019-12-07',
                label: '成都总站',
                children: [{
                    id: 7,
                    date: '2013-02-07',
                    label: '成都总站下属部门'
                }, {
                    id: 8,
                    date: '2013-02-07',
                    label: '成都总站下属部门'
                }]
            }, {
                id: 105,
                date: '2013-02-07',
                label: '办公室',
                children: []
            }, {
                id: 106,
                date: '2013-02-07',
                label: '财务共享中心',
                children: []
            }, {
                id: 107,
                date: '2013-02-07',
                label: '物联网业务部',
                children: []
            }, {
                id: 108,
                date: '2013-02-07',
                label: '党群科',
                children: []
            }]
        return {
            dialogFormVisible: false,
            data: JSON.parse(JSON.stringify(data)),
            depart: JSON.parse(JSON.stringify(depart)),
            formData: {
                newDepartName: ''
            },
        }
    },
    methods: {
        // addDepart(setLevel) {
        //     this.dialogFormVisible = true
        //     const depart = {}
        //     if(setLevel == '1') {
        //         depart = { id: id++, label: this.formData.newDepartName, level: setLevel, children: [] }; 
        //     }
        //     else depart = { id: id++, label: this.formData.newDepartName, level: setLevel, }; 
        //     this.data.push(depart)
        // },

        // 在传入的节点下增加节点
        append(data) {
            const newChild = { id: id++, label: 'testtest', level: '2', children: [] };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },

        // 移除点击的节点
        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
    }
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