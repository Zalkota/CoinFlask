<template>
    <div>
       <!-- <svg
        :height="height"
        :width="width"
        ></svg> -->
        <div id="chart-area">test</div>

        
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

      const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 }
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


      const x = d3.scaleBand()
        .domain(this.data.map(d => d.name))
        .range([0, WIDTH])
        .paddingInner(0.2)
        .paddingOuter(0.2)

      const y = d3.scaleLinear()
        .domain([0, d3.max(this.data, d => d.height)])
        .range([0, HEIGHT]) 

      const rects = g.selectAll("rect")
        .data(this.data)

      rects.enter().append("rect")
      .attr("y", 0)
      .attr("x", (d) => x(d.name))
      .attr("width", 50)
      .attr("height", d => y(d.height))
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
