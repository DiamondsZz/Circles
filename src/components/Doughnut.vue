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
          text: this.til,
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: this.data.types
        },
        series: [
          {
            name: "分类统计",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.data.types.map((type, i) => {
              return {
                value: this.data.count[i],
                name: type
              };
            })
          }
        ]
      });

      Chart.on("click", params => {
        this.$emit("showUser", params.data.name);
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
  height: 480px;
}
</style>