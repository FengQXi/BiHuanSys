<template>
    <div class="app-container">
        <div>
            <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 20px;"
                @click="dialogFormVisible = true">添加角色</el-button>

            <el-table :data="roleList" style="width: 100%" border>
                <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>

                <el-table-column prop="roleName" label="角色名称" width="150px"></el-table-column>

                <el-table-column label="权限列表">
                    <template slot-scope="{row, $index}">
                        <el-tag style="margin-right: 10px" type="success" v-for="authority in row.authorityList"
                            :key="authority.id">{{ authority.authorityName }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="150px">
                    <template slot-scope="{row, $index}">
                        <el-button type="warning" icon="el-icon-edit" size="mini" style="margin-right: 10px"
                            @click="updateRole(row)">
                        </el-button>
                        <!-- 气泡确认框 -->
                        <el-popconfirm :title="`确定删除${row.roleName}属性吗？`" @onConfirm="deleteAttr(row.id)">
                            <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 添加或者修改共用 -->
        <el-dialog title="角色管理" :visible.sync="dialogFormVisible" @close="cancelAdd">
            <el-form label-position="left" :model="roleInfo" label-width="80px">
                <el-form-item label="角色名">
                    <el-input v-model="roleInfo.roleName" placeholder="请输入角色名"></el-input>
                </el-form-item>

                <el-form-item v-show="roleInfo.authorityList.length" label="已选权限">
                    <el-tag style="margin-right: 10px" type="success" closable
                        v-for="authority in roleInfo.authorityList" :key="authority.id"
                        @close="roleInfo.authorityList.splice(index, 1)">{{ authority.authorityName }}</el-tag>
                </el-form-item>

                <el-form-item label="未选权限">
                    <el-select :disabled="!roleInfo.roleName" v-model="selectedAuthority" multiple collapse-tags
                        :placeholder="`还有${unSelectedAuthority.length}未选择`">
                        <el-option v-for="unselect in unSelectedAuthority" :key="unselect.authorityId"
                            :label="unselect.authorityName"
                            :value="`${unselect.authorityId}:${unselect.authorityName}`">
                        </el-option>
                    </el-select>

                    <el-button type="primary" icon="el-icon-plus" :disabled="!selectedAuthority.length"
                        @click="addAuthority" style="margin-left: 10px">
                        添加权限</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary">保存</el-button>
                    <el-button @click="cancelAdd">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'RoleManagement',
    data() {
        return {
            isShowTable: true,
            dialogFormVisible: false,
            roleList: [{
                id: 1,
                roleName: '超级用户',
                authorityList: [{
                    authorityId: '11',
                    authorityName: '用户管理',
                },
                {
                    authorityId: '12',
                    authorityName: '角色管理管理',
                },
                {
                    authorityId: '13',
                    authorityName: '部门管理',
                }]
            }],
            allAuthorityList: [{
                authorityId: '11',
                authorityName: '用户管理',
            },
            {
                authorityId: '12',
                authorityName: '角色管理管理',
            },
            {
                authorityId: '13',
                authorityName: '部门管理',
            },
            {
                authorityId: '14',
                authorityName: '图表管理',
            }
            ],
            roleInfo: {// 收集新增和修改的角色
                roleName: '',
                authorityList: [
                    // {
                    //     authorityId: '11',
                    //     authorityName: '用户管理',
                    // }
                ]
            },
            selectedAuthority: [],
        }
    },
    computed: {
        unSelectedAuthority() {
            return this.allAuthorityList.filter(item => {
                return this.roleInfo.authorityList.every(item1 => {
                    return item.authorityName != item1.authorityName
                })
            })
        }
    },
    methods: {
        updateRole(row) {
            this.dialogFormVisible = true
            // 这里数据结构复杂 要深拷贝
            // this.roleInfo = cloneDeep(row)
            this.roleInfo = JSON.parse(JSON.stringify(row))
            // this.roleInfo.authorityList.forEach(item => {
            //     this.$set(item, 'flag', false)
            // })
        },
        addAuthority() {
            this.selectedAuthority.forEach(element => {
                const [authorityId, authorityName] = element.split(':')
                // 修改spu对象
                let newAuthority = {
                    authorityId,
                    authorityName,
                }
                this.roleInfo.authorityList.push(newAuthority) // 可以数据代理
            });
            // 发请求
            this.selectedAuthority = [] // 置空 刷新select框
        },
        cancelAdd() {
            this.roleInfo = {
                roleName: '',
                authorityList: [
                    // {
                    //     authorityId: '11',
                    //     authorityName: '用户管理',
                    // }
                ]
            }
            this.dialogFormVisible = false
        },
    },
}
</script>

<style>

</style>