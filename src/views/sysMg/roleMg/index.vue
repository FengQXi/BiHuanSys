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
                        <el-tag style="margin-right: 10px" type="success" v-for="authority in row.list"
                            :key="authority.menuId">{{ authority.name }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="150px">
                    <template slot-scope="{row, $index}">
                        <el-button type="warning" icon="el-icon-edit" size="mini" style="margin-right: 10px"
                            @click="toUpdateRole(row)">
                        </el-button>
                        <!-- 气泡确认框 -->
                        <el-popconfirm :title="`确定删除${row.roleName}属性吗？`" @onConfirm="deleteRole(row.roleId)">
                            <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 添加或者修改共用 -->
        <el-dialog :title="roleInfo.roleId? '修改角色' : '添加角色'" :visible.sync="dialogFormVisible" @close="cancelAdd">
            <el-form label-position="left" :model="roleInfo" label-width="80px">
                <el-form-item label="角色名">
                    <el-input v-model="roleInfo.roleName" placeholder="请输入角色名"></el-input>
                </el-form-item>

                <el-form-item v-show="roleInfo.list.length" label="已选权限">
                    <el-tag style="margin-right: 10px" type="success" closable
                        v-for="authority in roleInfo.list" :key="authority.menuId"
                        @close="roleInfo.list.splice(index, 1)">{{ authority.name }}</el-tag>
                </el-form-item>

                <el-form-item label="未选权限">
                    <el-select :disabled="!roleInfo.roleName" v-model="selectedAuthority" multiple collapse-tags
                        :placeholder="`还有${unSelectedAuthority.length}未选择`">
                        <el-option v-for="unselect in unSelectedAuthority" :key="unselect.menuId"
                            :label="unselect.name"
                            :value="`${unselect.menuId}:${unselect.name}`">
                        </el-option>
                    </el-select>

                    <el-button type="primary" icon="el-icon-plus" :disabled="!selectedAuthority.length"
                        @click="addAuthority()" style="margin-left: 10px">
                        添加权限</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submit()">保存</el-button>
                    <el-button @click="cancelAdd">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'RoleManagement',
    data() {
        return {
            isShowTable: true,
            dialogFormVisible: false,
            // allAuthorityList: this.$store.state.roleAndAuthority.allAuthorityList,
            
            roleInfo: {// 收集新增和修改的角色
                roleId: '',
                roleName: '',
                list: [// 权限列表
                    // {
                    //     menuId: '2',
                    //     menuName: 'SearchManagement'
                    //     name: '用户管理',
                    // }
                ]
            },
            selectedAuthority: [],
        }
    },
    computed: {
        ...mapState('roleAndAuthority', ['roleList', 'allAuthorityList']),
        unSelectedAuthority() {
            return this.allAuthorityList.filter(item => {
                return this.roleInfo.list.every(item1 => {
                    return item.name != item1.name
                })
            })
        }
    },
    methods: {
        toUpdateRole(row) {
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
                const [menuId, name] = element.split(':')
                // 修改spu对象
                let newAuthority = {
                    menuId,
                    name,
                }
                this.roleInfo.list.push(newAuthority) // 可以数据代理
            });
            // 发请求
            this.selectedAuthority = [] // 置空 刷新select框
        },
        submit() {
            this.$store.dispatch('roleAndAuthority/addRole', this.roleInfo)
        },
        deleteRole(roleId) {
            this.$store.dispatch('roleAndAuthority/deleteRole', roleId)
        },
        cancelAdd() {
            this.roleInfo = {
                roleId: '',
                roleName: '',
                list: [// 权限列表
                    // {
                    //     menuId: '2',
                    //     menuName: 'SearchManagement'
                    //     name: '用户管理',
                    // }
                ]
            }
            this.dialogFormVisible = false
        },
    },
    mounted() {
        // 获取全部角色
        this.$store.dispatch('roleAndAuthority/getRoleList')
    }
}
</script>

<style>

</style>