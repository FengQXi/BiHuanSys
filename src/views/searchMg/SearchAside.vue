<template>
    <ul>
        <el-tree
            :data="data"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick">
        </el-tree>
    </ul>
</template>

<script>
    export default {
        name:'SearchAside',
        props:['sectorClick'],
        data() {
            return {
                data: [
                {
                    id: 100,
                    label: '项目部',
                },{
                    id: 101,
                    label: '重庆总站',
                    children: [{
                        id: 101101,
                        label: '重庆总站下属部门',
                }]
                }, {
                    id: 102,
                    label: '川南总站',
                    children: [{
                        id: 102102,
                        label: '川南总站下属部门'
                    }, {
                        id: 6,
                        label: '川南总站下属部门'
                    }]
                }, {
                    id: 103,
                    label: '川西总站',
                    children: [{
                        id: 7,
                        label: '川西总站下属部门'
                    }, {
                        id: 8,
                        label: '川西总站下属部门'
                    }]
                },{
                    id: 104,
                    label: '成都总站',
                    children: [{
                        id: 7,
                        label: '成都总站下属部门'
                    }, {
                        id: 8,
                        label: '成都总站下属部门'
                    }]
                },{
                    id: 105,
                    label: '办公室',
                },{
                    id: 106,
                    label: '财务共享中心',
                },{
                    id: 107,
                    label: '物联网业务部',
                },{
                    id: 108,
                    label: '党群科',
                },{
                    id: 109,
                    label: '规划计划部',
                },{
                    id: 110,
                    label: '财务科',
                },{
                    id: 111,
                    label: '纪委办公室',
                },{
                    id: 112,
                    label: '人事科',
                },{
                    id: 113,
                    label: '生产运行科',
                },{
                    id: 114,
                    label: '企业法规科',
                },{
                    id: 115,
                    label: '质量安全环保科',
                },{
                    id: 116,
                    label: '物资采购管理部',
                },{
                    id: 117,
                    label: '勘探与生产数据中心',
                },{
                    id: 118,
                    label: '网络安全监督中心',
                },{
                    id: 119,
                    label: '建设项目管理部',
                },{
                    id: 120,
                    label: '信息系统业务部',
                },{
                    id: 121,
                    label: '信息技术应用研究所',
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            handleNodeClick(data) {
                this.sectorClick(data)
            }
        },
    }
</script>

<style scoped>
    ul{
        /* width: 100%;
        height: 100%; */
        background-color: #E9EEF3;  
        list-style: none;  
        margin: 0px; 
        padding: 20px;
    }

    li{
        background-color: #E9EEF3;
        padding-top: 6px;
    }

    li:hover{
        background-color: #f7fafd;
        border-radius: 6px
    }
</style>