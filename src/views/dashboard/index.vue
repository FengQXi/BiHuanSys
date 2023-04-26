<template>
    <div class="dashboard-container">
        <div class="dashboard-text">你好: {{ name }}</div>
        <el-row>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>所有部门产生的问题</span>
                    </div>
                    <div style="height: 450px; width: 450px;">
                        <div class="chart" ref="chart"></div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>本人问题</span>
                    </div>
                    <div style="height: 450px; width: 650px;">
                        <div class="chart" ref="chart1"></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>



    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from "echarts"
import { reqChartsData } from '@/api/user'
import { getUserId } from '@/utils/auth'

export default {
    name: 'Dashboard',
    data() {
        return {
            peiChartData: [
                { value: 6, name: '项目部' },
                { value: 0, name: '重庆总站' },
                { value: 26, name: '川南总站' },
                { value: 0, name: '成都总站' },
                { value: 1, name: '办公室' },
                { value: 0, name: '党群科' },
                { value: 2, name: '财务科' },
                { value: 0, name: '人事科' },
                { value: 4, name: '物联网业务部' },
                { value: 0, name: '环保科' },
            ],
            barChartLabel: ['待提交', '待处理', '待审核', '已闭环',],
            barChartData: [8, 2, 6, 14],
        }
    },
    computed: {
        ...mapGetters([
            'name'
        ])
    },
    methods: {
        async getChartData() {
            let id = getUserId() // cookie 中得id
            let result = await reqChartsData(id)
            if(result.code == 200) {
                let dept = result.data.dept
                let status = result.data.state

                let pCD = []
                for(key in dept) {
                    pCD.push({
                        name: key,
                        value: dept.key
                    })
                }
                this.peiChartData = pCD // 饼状图数据

                let bCL = []
                let bCD = []
                for(key in status) {
                    bCL.push(key)
                    bCD.push(status.key)
                }
                this.barChartLabel = bCL
                this.barChartData = bCD // 条形图数据
            }
        }
    },
    mounted() {
        this.getChartData()

        let peiChart = echarts.init(this.$refs.chart)
        peiChart.setOption({
            title: {
                text: '项目部',
                subtext: '6',
                left: 'center',
                top: 'center',
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'outside',
                    },
                    labelLine: {
                        show: true
                    },
                    data: this.peiChartData
                }
            ]
        })
        // 绑定事件
        peiChart.on("mouseover", (param) => {
            const { value, name } = param.data
            peiChart.setOption({
                title: {
                    text: name,
                    subtext: value,
                }
            })
        })

        let barChart = echarts.init(this.$refs.chart1)
        barChart.setOption({
            xAxis: {
                type: 'category',
                data: this.barChartLabel
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: this.barChartData,
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
                }
            ]
        })
    },
}
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}

.chart {
    width: 100%;
    height: 100%;
}
</style>
