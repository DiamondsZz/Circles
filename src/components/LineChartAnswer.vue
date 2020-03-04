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
        grid: {
          bottom: 220
        },
        xAxis: {
          type: "category",
          data: this.data.x.map(item => {
            return item.til;
          }),
          axisLabel: {
            interval: 0, //间隔
            formatter: function(value) {
              let str = "";
              let num = 4; //每行显示字数
              let valLength = value.length; //该项x轴字数
              let rowNum = Math.ceil(valLength / num); // 行数
              if (rowNum > 1) {
                for (let i = 0; i < rowNum; i++) {
                  let temp = "";
                  let start = i * num;
                  let end = start + num;
                  temp = value.substring(start, end) + "\n";
                  str += temp;
                }
                return str;
              } else {
                return value;
              }
            }
          },
          triggerEvent: true
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
      Chart.on("click", params => {
        let index = this.data.x.findIndex(item => {
          return item.til === params.value;
        });

        this.$router.push({
          path: "details",
          query: {
            id: this.data.x[index]._id
          }
        });
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
  height: 500px;
}
</style>