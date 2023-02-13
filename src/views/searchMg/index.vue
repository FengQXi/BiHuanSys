<template>
    <div class="app-container">
        <el-container>
            <el-header>
                <SearchHeader :searchData="searchData" :updateTableData="updateTableData"></SearchHeader>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <SearchAside :sectorClick="sectorClick"></SearchAside>
                </el-aside>
                <el-main>
                    <SearchMain :tableData="tableData"></SearchMain>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import SearchMain from './SearchMain.vue';
    import SearchHeader from './SearchHeader.vue';
    import SearchAside from './SearchAside.vue';
    export default {
        name: 'SearchManagement',
        components:{SearchMain,SearchHeader,SearchAside},
        data() {
            return {
                tableData: [{
                    date: '2022-09-04',
                    name: 55,
                    level: '级别2',
                    category: '党建',
                    sector: '项目部',
                    dutyPerson: '老幺',
                    timeout:0,
                    status:1
                },{
                    date: "2001-03-24",
                    name: 84,
                    level: "级别2",
                    category: "glcgb",
                    sector: "重庆总站",
                    dutyPerson: "熊杰",
                    timeout: 1,
                    status: 0
                },{
                    date: "2001-01-09",
                    name: 91,
                    level: "级别2",
                    category: "iele",
                    sector: "重庆总站下属部门",
                    dutyPerson: "秦超",
                    timeout: 0,
                    status: 1
                }, {
                    date: "2016-02-15",
                    name: 9,
                    level: "级别2",
                    category: "xcfq",
                    sector: "党群科",
                    dutyPerson: "叶刚",
                    timeout: 1,
                    status: 0
                },{
                    date: "2018-08-31",
                    name: 81,
                    level: "级别2",
                    category: "dxuim",
                    sector: "重庆总站",
                    dutyPerson: "陆芳",
                    timeout: 1,
                    status: 1
                },{
                    date: "1970-09-18",
                    name: 99,
                    level: "级别2",
                    category: "tfu",
                    sector: "川南总站下属",
                    dutyPerson: "姜秀兰",
                    timeout: 1,
                    status: 1
                },{
                    date: "1991-06-04",
                    name: 114,
                    level: "级别2",
                    category: "gkg",
                    sector: "川南总站部门",
                    dutyPerson: "苏杰",
                    timeout: 0,
                    status: 0
                },{
                    date: "2010-02-20",
                    name: 27,
                    level: "级别2",
                    category: "eehh",
                    sector: "重庆总站",
                    dutyPerson: "秦娜",
                    timeout: 1,
                    status: 1
                },{
                    date: "2006-01-24",
                    name: 53,
                    level: "级别2",
                    category: "eeb",
                    sector: "党群科",
                    dutyPerson: "夏军",
                    timeout: 1,
                    status: 0
                },{
                    date: "2014-03-23",
                    name: 96,
                    level: "级别2",
                    category: "jguf",
                    sector: "重庆总站",
                    dutyPerson: "吕勇",
                    timeout: 1,
                    status: 0
                },{
                    date: "1989-04-27",
                    name: 58,
                    level: "级别2",
                    category: "ddhlr",
                    sector: "规划计划部",
                    dutyPerson: "黄涛",
                    timeout: 1,
                    status: 1
                },{
                    date: "1981-12-18",
                    name: 58,
                    level: "级别2",
                    category: "myht",
                    sector: "党群科",
                    dutyPerson: "李静",
                    timeout: 1,
                    status: 1
                },{
                    date: "2018-04-18",
                    name: 114,
                    level: "级别2",
                    category: "gcmo",
                    sector: "规划计划部",
                    dutyPerson: "康娟",
                    timeout: 1,
                    status: 1
                },{
                    date: "1997-06-19",
                    name: 88,
                    level: "级别2",
                    category: "srxj",
                    sector: "党群科",
                    dutyPerson: "潘涛",
                    timeout: 0,
                    status: 1
                },{
                    date: "1972-11-01",
                    name: 49,
                    level: "级别2",
                    category: "liw",
                    sector: "项目部",
                    dutyPerson: "吴伟",
                    timeout: 0,
                    status: 0
                },{
                    date: "1983-10-01",
                    name: 5,
                    level: "级别2",
                    category: "ikfk",
                    sector: "规划计划部",
                    dutyPerson: "袁涛",
                    timeout: 1,
                    status: 1
                },{
                    date: "1972-05-10",
                    name: 103,
                    level: "级别2",
                    category: "fxg",
                    sector: "企业法规科",
                    dutyPerson: "孟勇",
                    timeout: 0,
                    status: 0
                },{
                    date: "1987-03-27",
                    name: 7,
                    level: "级别2",
                    category: "wykgx",
                    sector: "项目部",
                    dutyPerson: "范敏",
                    timeout: 0,
                    status: 1
                },{
                    date: "2000-10-07",
                    name: 39,
                    level: "级别2",
                    category: "kbvhn",
                    sector: "企业法规科",
                    dutyPerson: "高艳",
                    timeout: 0,
                    status: 1
                },{
                    date: "1981-10-31",
                    name: 76,
                    level: "级别2",
                    category: "xpfmw",
                    sector: "项目部",
                    dutyPerson: "黎敏",
                    timeout: 0,
                    status: 0
                },{
                    date: "1972-03-20",
                    name: 62,
                    level: "级别2",
                    category: "unpx",
                    sector: "成都总站",
                    dutyPerson: "梁静",
                    timeout: 0,
                    status: 1
                },{
                    date: "2013-11-08",
                    name: 116,
                    level: "级别2",
                    category: "sbz",
                    sector: "企业法规科",
                    dutyPerson: "陈刚",
                    timeout: 1,
                    status: 0
                },{
                    date: "2011-03-25",
                    name: 74,
                    level: "级别2",
                    category: "fel",
                    sector: "项目部",
                    dutyPerson: "白超",
                    timeout: 1,
                    status: 0
                },{
                    date: "1989-01-14",
                    name: 6,
                    level: "级别2",
                    category: "elpm",
                    sector: "企业法规科",
                    dutyPerson: "夏娜",
                    timeout: 0,
                    status: 1
                },{
                    date: "2005-04-12",
                    name: 8,
                    level: "级别2",
                    category: "wjqr",
                    sector: "成都总站",
                    dutyPerson: "史娟",
                    timeout: 1,
                    status: 0
                },{
                    date: "2018-05-10",
                    name: 92,
                    level: "级别2",
                    category: "dndd",
                    sector: "项目部",
                    dutyPerson: "邹刚",
                    timeout: 0,
                    status: 1
                },{
                    date: "1985-01-11",
                    name: 3,
                    level: "级别2",
                    category: "gfwny",
                    sector: "企业法规科",
                    dutyPerson: "薛强",
                    timeout: 0,
                    status: 1
                },{
                    date: "1974-11-28",
                    name: 112,
                    level: "级别2",
                    category: "hgdb",
                    sector: "成都总站",
                    dutyPerson: "黄秀英",
                    timeout: 0,
                    status: 0
                },{
                    date: "1971-02-15",
                    name: 63,
                    level: "级别2",
                    category: "xsfb",
                    sector: "项目部",
                    dutyPerson: "谢娜",
                    timeout: 1,
                    status: 0
                },{
                    date: "1986-03-11",
                    name: 94,
                    level: "级别2",
                    category: "vzqx",
                    sector: "企业法规科",
                    dutyPerson: "胡娜",
                    timeout: 0,
                    status: 1
                },{
                    date: "1970-08-14",
                    name: 51,
                    level: "级别2",
                    category: "dhod",
                    sector: "成都总站",
                    dutyPerson: "陈霞",
                    timeout: 1,
                    status: 1
                }],
            }
        },
        methods:{
            searchData(nameInput,dateInput){
                if (nameInput) {//搜索名称
                    this.tableData = this.tableData.filter((data) => {
                        return data.name === parseInt(nameInput)
                    })
                }
                if (dateInput) {//搜索时间
                    this.tableData = this.tableData.filter((data) => {
                        return data.date === dateInput
                    })
                }
                console.log(this.tableData)
            },
            sectorClick(label,children){
                //需要请求数据，更新tableData
                if(children){
                    this.tableData = this.tableData.filter((data) => {
                        let flag = 0
                        for(let i = 0;i < children.length;i++){
                            if(data.sector === label || data.sector === children[i].label) flag = 1
                        }
                        return flag
                    })
                } else {
                    this.tableData = this.tableData.filter((data) => {
                        return data.sector === label
                    })
                }
            },
            updateTableData(){
                //请求数据,更新tableData
            }
        }
    }
</script>

<style scoped>
    .el-header{
        background-color: #fff;
        color: #333;
        /* text-align: center;
        line-height: 60px; */
    }
    
    .el-aside {
        background-color: #fff;
        color: #333;
        /* text-align: center;
        line-height: 200px; */
    }
    
    .el-main {
        background-color: #fff;
        color: #333;
        /* text-align: center;
        line-height: 160px; */
    }
    
    body > .el-container {
        margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>