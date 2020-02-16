<template>
  <div id="chart" ref="chart"></div>
</template>
<script>
export default {
  props: ["chartData", "til"],
  data() {
    return {
      data: {}
    };
  },
  methods: {
    mountChart() {
      let Chart = this.$echarts.init(this.$refs.chart);
      Chart.setOption({
        title: {
          left: "center",
          text: this.til
        },
        xAxis: {
          type: "category",
          data: this.data.x,
          axisLabel: {
            interval: 0 //间隔
          },
          triggerEvent :true
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.data.y,
            type: "line",
            smooth: true
          }
        ]
      });
      Chart.on("click", function(params) {
        console.log(params);
      });
    }
  },
  watch: {
    chartData(val) {
      this.data = val;
      this.mountChart();
    }
  },
  components: {}
};
</script>
<style scoped>
#chart {
  width: 360px;
  height: 300px;
}
</style>