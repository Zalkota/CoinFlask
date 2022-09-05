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
    this.renderChart().catch(error => {
      console.log(error)
    })

  },

  created() {
    // this.colorScale = d3
    //   .scaleOrdinal()
    //   .range(["#dc2626", "#16a34a", "#0891b2", "#7e22ce"]);

    
  },

  computed: {
  },

  methods: {
    renderChart() {

      const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 }
      const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
      const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

      console.log(MARGIN, WIDTH, HEIGHT)

      this.data.forEach(d => {
        d.height = Number(d.height)
        console.log(d.height)
      })

      const svg = d3.select("#chart-area").append("svg")
        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

      const g = svg.append("g")
        .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

      // X label
      g.append("text")
        .attr("class", "x axis-label")
        .attr("x", WIDTH / 2)
        .attr("y", HEIGHT + 110)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("The world's tallest buildings")

      // Y Label
      g.append("text")
        .attr("class", "y axis-label")
        .attr("x", - (HEIGHT / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Height (m)")

      const x = d3.scaleBand()
        .domain(this.data.map(d => d.name))
        .range([0, WIDTH])
        .paddingInner(0.2)
        .paddingOuter(0.2)

      const y = d3.scaleLinear()
        .domain([0, d3.max(this.data, d => d.height)])
        .range([HEIGHT, 0]) 

      const xAxisCall = d3.axisBottom(x)
      g.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${HEIGHT})`)
        .call(xAxisCall)
        .selectAll("text")
          .attr("y", "10")
          .attr("x", "-5")
          .attr("text-anchor", "end")
          .attr("transform", "rotate(-40)")


      const yAxisCall = d3.axisLeft(y)
        .ticks(3)
        .tickFormat(d => d + "m") // Showing all values in meters
      g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall)


      const rects = g.selectAll("rect")
        .data(this.data)

      rects.enter().append("rect")
      .attr("y", d => y(d.height))
      .attr("x", (d) => x(d.name))
      .attr("width", 50)
      .attr("height", d => HEIGHT - y(d.height))
      .attr("fill", d => {
        if (d.name == "Burj Khalifa") {
          return "Blue" 
        } else {
          return "Red"
        }
      })
    }

  }
}
</script>
