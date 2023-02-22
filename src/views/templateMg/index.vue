<template>
    <div class="app-container">
        <el-container>
            <el-header>
                <!-- 表格导出 -->
                <el-button type="success" icon="el-icon-download" @click="exportExcel(fileColumData)">导出表格</el-button>
            </el-header>
            <el-main>
                <template>
                    <el-table :data="fileColumData" style="width: 100%">
                        <el-table-column prop="id" label="字典类型" align="right">
                        </el-table-column>
                        <el-table-column></el-table-column>
                        <el-table-column prop="data" label="字典项" align="left">
                            <template slot-scope="scope">
                                <div>
                                    <div v-for="(item, index) in scope.row.data" :key="index" class="text item">
                                        <el-switch 
                                            v-model="item.flag" 
                                            active-color="#13ce66" 
                                            inactive-color="#ff4949" >
                                        </el-switch>{{ item.name }}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
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
            categoryFileList: [],
            causeFileList: [],
            levelFileList: [],
            degreeFileList: [],
            departmentLabelFileList: [],
        };
    },
    computed: {
        // allDepartmentList 暂缓
        ...mapState('template',['categoryList', 'causeList', 'levelList', 'degreeList', 'allDepartmentList']),
        fileColumData(){
            return [{
                id: '问题类别',
                data: this.categoryList
            }, {
                id: '产生原因',
                data: this.causeList
            }, {
                id: '检查级别',
                data: this.levelList
            }, {
                id: '问题程度',
                data: this.degreeList
            }, {
                id: '负责部门',
                data: this.allDepartmentList
            }]
        }
    },
    methods: {
        //excel表格数据验证
        getCellData(sheet1) {
            //数据验证：问题类别
            sheet1.getCell('E2').dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.categoryFileList,
            };
            sheet1.getCell('E3').dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.categoryFileList,
            };
            sheet1.getCell('E4').dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.categoryFileList,
            };
            sheet1.getCell('E5').dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.categoryFileList,
            };
            //数据验证：产生原因
            sheet1.getCell("F2").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.causeFileList,
            };
            sheet1.getCell("F3").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.causeFileList,
            };
            sheet1.getCell("F4").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.causeFileList,
            };
            sheet1.getCell("F5").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.causeFileList,
            };
            //数据验证：检查级别
            sheet1.getCell("G2").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.levelFileList,
            };
            sheet1.getCell("G3").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.levelFileList,
            };
            sheet1.getCell("G4").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.levelFileList,
            };
            sheet1.getCell("G5").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.levelFileList,
            };
            //数据验证：问题程度
            sheet1.getCell("H2").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.degreeFileList,
            };
            sheet1.getCell("H3").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.degreeFileList,
            };
            sheet1.getCell("H4").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.degreeFileList,
            };
            sheet1.getCell("H5").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.degreeFileList,
            };
            //数据验证：负责部门
            sheet1.getCell("J2").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.departmentLabelFileList,
            };
            sheet1.getCell("J3").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.departmentLabelFileList,
            };
            sheet1.getCell("J4").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.departmentLabelFileList,
            };
            sheet1.getCell("J5").dataValidation = {
                type: "list",
                allowBlank: true,
                formulae: this.departmentLabelFileList,
            };
        },
        exportExcel(arr) {
            //校验数据生成
            arr.forEach(value=>{
                this.theListFnished(value)
            })
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
                this.categoryFileList = []
                this.categoryFileList.push(optionExcel)
            }
            else if(value.id == '产生原因'){
                value.data.forEach(item =>{
                    if(item.flag) {
                        optionExcel=optionExcel+item.name+','
                    }
                       
                })
                optionExcel = optionExcel+'"'
                this.causeFileList = []
                this.causeFileList.push(optionExcel) 
            }
            else if(value.id == '检查级别'){
                value.data.forEach(item =>{
                    if(item.flag) {
                        optionExcel=optionExcel+item.name+','
                    }
                       
                })
                optionExcel = optionExcel+'"'
                this.levelFileList = []
                this.levelFileList.push(optionExcel) 
            }
            else if(value.id == '问题程度'){
                value.data.forEach(item =>{
                    if(item.flag) {
                        optionExcel=optionExcel+item.name+','
                    }
                       
                })
                optionExcel = optionExcel+'"'
                this.degreeFileList = []
                this.degreeFileList.push(optionExcel) 
            }
            else{
                value.data.forEach(item =>{
                    if(item.flag) {
                        optionExcel=optionExcel+item.name+','
                    }
                       
                })
                optionExcel = optionExcel+'"'
                this.departmentLabelFileList = []
                this.departmentLabelFileList.push(optionExcel) 
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