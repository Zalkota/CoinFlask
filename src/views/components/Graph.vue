<template>
    <div>
       <!-- <svg
        :height="height"
        :width="width"
        ></svg> -->
        <div id="chart-area"></div>

        
    </div>
</template>


<script>

// import Spinner from "./Spinner.vue";
// import NetworkError from "./NetworkError.vue";
import * as d3 from "d3";
import data from '../../assets/d3-data/buildings.json'



export default {
  name: 'Graph',
  props: ["tokenData"],
  components: {},
  data() {
    return {
      data: data
    }
  },
  mounted() {
    const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 }
    const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
    const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

    let flag = true

    const svg = d3.select("#chart-area").append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

    const g = svg.append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

    // X label
    const xLabel = g.append("text")
      .attr("class", "x axis-label")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 110)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Month")

    // Y Label
    const yLabel = g.append("text")
      .attr("class", "y axis-label")
      .attr("x", - (HEIGHT / 2))
      .attr("y", -60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")

    // Scales
    const x = d3.scaleBand()
      .range([0, WIDTH])
      .paddingInner(0.2)
      .paddingOuter(0.2)

    const y = d3.scaleLinear()
      .range([HEIGHT, 0]) 

    // Axis Groups
    const xAxisGroup = g.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${HEIGHT})`)

    const yAxisGroup = g.append("g")
      .attr("class", "y axis")
    
    this.data.forEach(d => {
      d.revenue = Number(d.revenue)
      d.profit = Number(d.profit)
    })

    // Updater
    d3.interval(() => {
      flag = !flag
      update(this.data)

    }, 1000)

    update(this.data)

    function update(data) {
      const value = flag ? "profit" : "revenue"
      const t = d3.transition().duration(750)

      x.domain(data.map(d => d.month))
      y.domain([0, d3.max(data, d => d[value])])

      const xAxisCall = d3.axisBottom(x)
      xAxisGroup.call(xAxisCall)
        .selectAll("text")
          .attr("y", "10")
          .attr("x", "-5")
          .attr("text-anchor", "end")
          .attr("transform", "rotate(-40)")


      const yAxisCall = d3.axisLeft(y)
        .ticks(3)
        .tickFormat(d => d + "m") // Showing all values in meters
      yAxisGroup.transition(t).call(yAxisCall)

      // Spawn SVGs
      const rects = g.selectAll("circle")
        .data(data)

      console.log(rects)

      // EXIT old elemnts not present in new data
      rects.exit()
        .attr("fill", "red")
        .transition(t)
          .attr("cy", y(0))
          .remove()

      // UPDATE old ellements present in new data
      rects.transition(t)
        .attr("cy", d => y(d[value]))
        .attr("width", 50)
        .attr("height", d => HEIGHT - y(d[value]))
        
      // ENTER new elements present in new data
      rects.enter().append("circle")
        .attr("cy", d => y(0))
        .attr("r", 5)
        .attr("fill", "grey")
        .transition(t)
          .attr("cx", d => x(d.month) + (x.bandwidth() /2))
          .attr("cy", d => y(d[value]))

        const text = flag ? "Profit ($)" : "Revenue ($)"

      yLabel.text(text)
    }
  },

  created() {

  },

  computed: {
  },

  methods: {
    
    
  }
}
</script>
