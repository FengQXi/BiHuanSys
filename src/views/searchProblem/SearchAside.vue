<template>
    <ul>
        <el-tree
            :data="sectorData"
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
                sectorData:this.$store.state.department.departmentList,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            handleNodeClick(data) {
                if(!data.children) this.sectorClick(data.label,null)
                else this.sectorClick(data.label,data.children)
            }
        },
    }
</script>

<style scoped>
    ul{
        /* width: 100%;
        height: 100%; */
        background-color: #fff;  
        list-style: none;  
        margin: 0px; 
        padding: 20px;
    }

    li{
        background-color: #fff;
        padding-top: 6px;
    }

    li:hover{
        background-color: #fff;
        border-radius: 6px
    }
</style>