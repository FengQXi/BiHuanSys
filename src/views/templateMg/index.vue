<template>
    <div class="app-container">
        <el-container>
            <el-header>
                <!-- 表格导出 -->
                <el-button type="success" icon="el-icon-download" @click="exportExcel()">导出表格</el-button>
            </el-header>
            <el-main>
                <!-- <template>
                    <el-table :data="fileColumData" style="width: 100%">
                        <el-table-column prop="id" label="字典类型" align="right">
                        </el-table-column>
                        <el-table-column></el-table-column>
                        <el-table-column prop="data" label="字典项" align="left">
                            <template slot-scope="scope">
                                <div>
                                    <div v-for="(item, index) in scope.row.data" :key="index" class="text item">
                                        <el-switch v-model="item.flag" active-color="#13ce66" inactive-color="#ff4949" @change="theListFnished(scope.row)">
                                        </el-switch>{{ item.name }}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template> -->
            </el-main>

        </el-container>
    </div>
</template>

<script>
import ExcelJS from "exceljs";
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { mapState } from "vuex";

export default {
    name: 'TemplateDownload',
    data() {
        return {
            // fileColumData: [{
            //     id: '问题类别',
            //     data: [{
            //         name: '安全',
            //         flag: true
            //     }, {
            //         name: '党建',
            //         flag: true
            //     }, {
            //         name: '巡查',
            //         flag: true
            //     }, {
            //         name: '生产',
            //         flag: true
            //     }, {
            //         name: '审计',
            //         flag: true
            //     }, {
            //         name: '财务',
            //         flag: true
            //     }, {
            //         name: '其他',
            //         flag: true
            //     }]
            // }, {
            //     id: '产生原因',
            //     data: [{
            //         name: '制度宣贯，执行问题',
            //         flag: true
            //     }, {
            //         name: '思想认识问题',
            //         flag: true
            //     }, {
            //         name: '管理存在漏洞',
            //         flag: true
            //     }, {
            //         name: '能力欠缺问题',
            //         flag: true
            //     }, {
            //         name: '履行问题',
            //         flag: true
            //     }, {
            //         name: '业务流程问题',
            //         flag: true
            //     }, {
            //         name: '其他',
            //         flag: true
            //     }]
            // }, {
            //     id: '检查级别',
            //     data: [{
            //         name: '级别1',
            //         flag: true
            //     }, {
            //         name: '级别2',
            //         flag: true
            //     }]
            // }, {
            //     id: '问题程度',
            //     data: [{
            //         name: '一般',
            //         flag: true
            //     }, {
            //         name: '普通',
            //         flag: true
            //     }, {
            //         name: '严重',
            //         flag: true
            //     }]
            // }, {
            //     id: '负责部门',
            //     data: [{
            //         name: '成都总站',
            //         flag: true
            //     }, {
            //         name: '川南总站',
            //         flag: true
            //     }, {
            //         name: '川中总站',
            //         flag: true
            //     }, {
            //         name: '川西总站',
            //         flag: true
            //     }, {
            //         name: '重庆总站',
            //         flag: true
            //     }, {
            //         name: '项目部',
            //         flag: true
            //     }, {
            //         name: '其他',
            //         flag: true
            //     }]
            // }],
            categoryList: ['"安全,党建,巡查,生产,审计,财务,其他,"'],
            causeList: ['"制度宣贯，执行问题,思想认识问题,管理存在漏洞,能力欠缺问题,履行问题,业务流程问题,其他,"'],
            levelList: ['"级别1,级别2"'],
            degreeList: ['"一般,普通,严重"'],
            departmentLabelList: ['"成都总站,川南总站,川中总站,川西总站,重庆总站,项目部,其他"'],
        };
    },
    computed: {
        // allDepartmentList 暂缓
        ...mapState('template',['categoryList', 'causeList', 'levelList', 'degreeList', 'allDepartmentList']),
    },
    methods: {
        //excel表格数据验证
        getCellData(sheet1) {
            //数据验证：问题类别
            sheet1.getCell('E2').dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.categoryList,
            };
            sheet1.getCell('E3').dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.categoryList,
            };
            sheet1.getCell('E4').dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.categoryList,
            };
            sheet1.getCell('E5').dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.categoryList,
            };
            //数据验证：产生原因
            sheet1.getCell("F2").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.causeList,
            };
            sheet1.getCell("F3").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.causeList,
            };
            sheet1.getCell("F4").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.causeList,
            };
            sheet1.getCell("F5").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.causeList,
            };
            //数据验证：检查级别
            sheet1.getCell("G2").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.levelList,
            };
            sheet1.getCell("G3").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.levelList,
            };
            sheet1.getCell("G4").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.levelList,
            };
            sheet1.getCell("G5").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.levelList,
            };
            //数据验证：问题程度
            sheet1.getCell("H2").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.degreeList,
            };
            sheet1.getCell("H3").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.degreeList,
            };
            sheet1.getCell("H4").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.degreeList,
            };
            sheet1.getCell("H5").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.degreeList,
            };
            //数据验证：负责部门
            sheet1.getCell("J2").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.departmentLabelList,
            };
            sheet1.getCell("J3").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.departmentLabelList,
            };
            sheet1.getCell("J4").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.departmentLabelList,
            };
            sheet1.getCell("J5").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.departmentLabelList,
            };
        },
        exportExcel() {
            /** 
            //导出当前表格
            var wb = XLSX.utils.table_to_book(document.querySelector("#tableId")); //表格id
            var wbout = XLSX.write(wb, {
                bookType: "xlsx",
                bookSST: true,
                type: "array",
            });
            try {
                FileSaver.saveAs(
                    new Blob([wbout], { type: "application/octet-stream" }),
                    "导出详情单.xlsx"
                ); //文件名
            } catch (e) {
                if (typeof console !== "undefined") console.log(e, wbout);
            }
            return wbout;
            */
            // 创建工作簿
            const workbook = new ExcelJS.Workbook();
            // 添加工作表
            const sheet1 = workbook.addWorksheet("sheet1");

            //设置表头
            sheet1.columns = [
                { header: "Id", key: "id", width: 15 },
                { header: "录入时间", key: "entryTime", width: 15 },
                { header: "问题名称", key: "name", width: 15 },
                { header: "问题描述", key: "describe", width: 15 },
                { header: "问题类别", key: "category", width: 15 },
                { header: "产生原因", key: "cause", width: 15 },
                { header: "检查级别", key: "level", width: 15 },
                { header: "问题程度", key: "degree", width: 15 },
                { header: "负责部门Id", key: "departmentId", width: 15 },
                { header: "负责部门", key: "departmentLabel", width: 15 },
                { header: "负责人Id", key: "responsePersonId", width: 15 },
                { header: "负责人", key: "responsePersonName", width: 15 },
                { header: "整改限期", key: "limitTime", width: 15 },
            ];
            this.getCellData(sheet1)

            // 导出表格
            workbook.xlsx.writeBuffer().then((buffer) => {
                let file = new Blob([buffer], {
                    type: "application/octet-stream",
                });
                FileSaver.saveAs(file, "闭环管理模板.xlsx");
            });
        },
        //模板数据验证字典项选择
        theListFnished(value){
            let optionExcel = '"'
            if(value.id == '问题类别'){
                value.data.forEach(item =>{
                    if(item.flag) {
                        optionExcel=optionExcel+item.name+','
                    }
                       
                })
                optionExcel = optionExcel+'"'
                this.categoryList = []
                this.categoryList.push(optionExcel)
            }
            else if(value.id == '产生原因'){
                value.data.forEach(item =>{
                    if(item.flag) {
                        optionExcel=optionExcel+item.name+','
                    }
                       
                })
                optionExcel = optionExcel+'"'
                this.causeList = []
                this.causeList.push(optionExcel) 
            }
            else if(value.id == '检查级别'){
                value.data.forEach(item =>{
                    if(item.flag) {
                        optionExcel=optionExcel+item.name+','
                    }
                       
                })
                optionExcel = optionExcel+'"'
                this.levelList = []
                this.levelList.push(optionExcel) 
            }
            else if(value.id == '问题程度'){
                value.data.forEach(item =>{
                    if(item.flag) {
                        optionExcel=optionExcel+item.name+','
                    }
                       
                })
                optionExcel = optionExcel+'"'
                this.degreeList = []
                this.degreeList.push(optionExcel) 
            }
            else{
                value.data.forEach(item =>{
                    if(item.flag) {
                        optionExcel=optionExcel+item.name+','
                    }
                       
                })
                optionExcel = optionExcel+'"'
                this.departmentLabelList = []
                this.departmentLabelList.push(optionExcel) 
            }
        }
    },
}
</script>

<style scoped>
.el-header {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-main {
    background-color: #fff;
    color: #333;
    padding: 0px;
    /* text-align: center;
    line-height: 160px; */
}

body>.el-container {
    margin-bottom: 40px;
}
</style>