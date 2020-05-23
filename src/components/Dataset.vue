<template>
  <div id="chart" ref="chart"></div>
</template>
<script>
export default {
  props: ["chartData", "til"],
  data() {
    return {
      data: { x: [], y: [] }
    };
  },
  methods: {
    mountChart() {
      let Chart = this.$echarts.init(this.$refs.chart);
      Chart.off("click"); //避免多次触发
      Chart.setOption({
        title: { text: this.til },
        legend: {},
        tooltip: {},
        dataset: {
          source: [this.data.x, this.data.y]
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: this.data.x.slice(1).map(() => {
          return {
            type: "bar"
          };
        })
      });
      Chart.on("click", params => {
        this.$emit("name", params.seriesName);
      });
    }
  },
  mounted() {
    this.mountChart();
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
  width: 800px;
  height: 480px;
}
</style>