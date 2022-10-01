<template>
    <div>
        <div class="flex">
          <div class="flex-1">
            <div class="flex-intial  ">
              <div class="flex md:flex-row flex-col">
                <div class="inline-flex m-1">
                  <buttonSelector 
                  :inputData="buttonSelectorData"
                  @variableSelectionEvent="readVariableSelectionEvent" 
                  />
                </div>
                <div class="md:flex-1 bg-white">
                </div>
                <div class="inline-flex  m-1">
                  <buttonSelector 
                  :inputData="buttonSelectorTimeFrame"
                  @variableSelectionEvent="readTimeFrameSelectionEvent" 
                  />
                </div>
              </div>
            </div>
            <div id="chart-area"></div>
          </div>
            <div class="row">
              <div class="col-md-12">
                <div id="chart-area"></div>                 
              </div> 
            </div>
        </div>
    </div>
</template>



<script>

import buttonSelector from '../buttonSelector.vue'

import * as d3 from "d3";
import data from '../../../assets/d3-data/coins.json'

export default {
  name: 'Graph',
  props: ["tokenData", "filteredData"],
  components: {buttonSelector},
  data() {
    return {
      
      data: data,
      interval: null,
      buttonText: "Play",
      g: null,
      continentColor: d3.scaleOrdinal(d3.schemePastel1),
      HEIGHT: 0,
      WIDTH: 0,
      area: null,
      x: null,
      y: null,
      xLabel: null,
      yLabel: null,
      xAxis: null,
      yAxis: null,
      xAxisCall: null,
      yAxisCall: null,
      timeLabel: null,
      bisectDate: null,
      time: 0,
      selectedData: null,

      buttonSelectorData: [{"display" : "Price", "value": "price_usd"}, {"display" : "Market Cap", "value": "market_cap"}, {"display" : "Volume", "value": "24h_vol"}],
      buttonSelectorTimeFrame: [{"display" : "Max", "value": "max"}, {"display" : "24h", "value": "1"}, {"display" : "7d", "value": "7"}, {"display" : "14d", "value": "14"}, {"display" : "30d", "value": "30"}],
      variableSelection: "market_cap"
    }
  },
  mounted() {
    const MARGIN = { LEFT: 25, RIGHT: 100, TOP: 50, BOTTOM: 25 }
    const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
    const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM
    this.HEIGHT = HEIGHT
    this.WIDTH = WIDTH

    const svg = d3.select("#chart-area").append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .attr("viewBox", [0, 0, WIDTH + MARGIN.LEFT + MARGIN.RIGHT, HEIGHT + MARGIN.TOP + MARGIN.BOTTOM])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    this.g = svg.append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

    // time parser for x-scale
    const parseTime = d3.timeParse("%d/%m/%Y")
    

    // for tooltip
    this.bisectDate = d3.bisector(d => d.date).left

     // scales
    this.x = d3.scaleTime().range([0, WIDTH])
    this.y = d3.scaleLinear().range([HEIGHT, 0])

    //add the line for the first time
    this.g.append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "#68d391")
      .attr("stroke-width", "6px")

      // append area of the graph to the group.
    this.g.append("path")
          .attr("id", "area")
          .attr("fill", "#C6F6D5")

    // axis labels
    this.xLabel = this.g.append("text")
      .attr("class", "x axisLabel")
      .attr("y", HEIGHT + 50)
      .attr("x", WIDTH / 2)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")

    this.yLabel = this.g.append("text")
      .attr("class", "y axisLabel")
      .attr("transform", "rotate(-90)")
      .attr("y", -30)
      .attr("x", -170)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")

    this.g.append("linearGradient")
        .attr("id", "temperature-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", 0)
        .attr("x2", 0).attr("y2", HEIGHT*1)
      .selectAll("stop")
        .data([
          {offset: "0%", color: "#9AE6B4"},
          {offset: "50%", color: "#C6F6D5"},
          {offset: "75%", color: "#F0FFF4"},
          {offset: "100%", color: "#fff"}
        ])
      .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });


    // axis generators
    this.xAxisCall = d3.axisBottom()
    this.yAxisCall = d3.axisRight()
      .ticks(6)
      .tickFormat(d => `${parseInt(d / 1000)}k`)
      .tickSize(-WIDTH)
      

    // axis groups
    this.xAxis = this.g.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${HEIGHT})`)
    this.yAxis = this.g.append("g")
      .attr("class", "y axis")
      .attr("transform", `translate(${WIDTH}, 0)`)

    
    
  },

  created() {
    // Update the graph if filterMarketChartData is updated in Vuex
    let unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type == 'filterMarketChartData') {
        this.update()
        console.log("updating graph")
      }
    })
  },

  
  beforeDestroy() {
    this.unsubscribe();
  },


  computed: {
    filteredMarketChartData() {
            let data = this.$store.getters.getFilteredMarketChartData;
            return data
        },
    timeFrame() {
        return this.$store.getters.getTimeFrame;
    },
  },

  methods: {

    update() {

       // Define local data and selection variables
        let data = this.filteredMarketChartData
        let yValue = this.variableSelection

        // Define transition time
        const t = d3.transition().duration(500)

        // update scales
        this.x.domain(d3.extent(data, d => d.date))
        this.y.domain([
          d3.min(data, d => d[yValue]) / 1.005, 
          d3.max(data, d => d[yValue]) * 1.005
        ])

        // fix for format values
        const formatSi = d3.format(",.2f")
        function formatAbbreviation(x) {
          const s = "$" + formatSi(x)
          return s
        }

        // fix for format values
        // const formatSi2 = d3.format(".2f")
        // function formatAbbreviation(x) {
        //   const s = formatSi2(x)
        //   switch (s[s.length - 1]) {
        //     case "B": return s.slice(0, -1) + "B" // billions
        //     case "k": return s.slice(0, -1) + "K" // thousands
        //   }
        // return s
        // }

        // update axes
        this.xAxisCall.scale(this.x)
        this.xAxis.transition(t).call(this.xAxisCall)
        this.yAxisCall.scale(this.y)
        this.yAxis.transition(t).call(this.yAxisCall.tickFormat(formatAbbreviation))

        /******************************** Tooltip Code ********************************/

        focus = this.g.append("g")
          .attr("class", "focus")
          .style("display", "none")

        focus.append("line")
          .attr("class", "x-hover-line hover-line")
          .attr("y1", 0)
          .attr("y2", this.HEIGHT)

        focus.append("line")
          .attr("class", "y-hover-line hover-line")
          .attr("x1", 0)
          .attr("x2", this.WIDTH)

        focus.append("circle")
          .attr("r", 5)

        focus.append("rect")
          .attr("fill", "#e2e8f0")
          .attr("x", -72)
          .attr("y", -70)
          .attr("width", 144)
          .attr("height", 64)

        focus.append("rect")
          .attr("fill", "white")
          .attr("x", -70)
          .attr("y", -68)
          .attr("width", 140)
          .attr("height", 60)
        
        focus.append("text")
          .attr("id", "value")
          .attr("x", -52)
          .attr("y", -50)
          .attr("font-size", "12px")
          .attr("dy", ".31em")

        focus.append("text")
          .attr("id", "date")
          .style('fill', '#666')
          .attr("x", -23)
          .attr("y", -23)
          .attr("font-size", "12px")
          .attr("dy", ".31em")

        this.g.append("rect")
          .attr("class", "overlay")
          .attr("width", this.WIDTH)
          .attr("height", this.HEIGHT)
          .on("mouseover", () => focus.style("display", null))
          .on("mouseout", () => focus.style("display", "none"))
          .on("mousemove", (event) => {
            
            const x0 = this.x.invert(d3.pointer(event)[0])
            const i = this.bisectDate(data, x0, 1)
            const d0 = data[i - 1]
            const d1 = data[i]
            const d = x0 - d0.date > d1.date - x0 ? d1 : d0
            focus.attr("transform", `translate(${this.x(d.date)}, ${this.y(d[yValue])})`)
            focus.select("#value").text("$" + formatSi(d[yValue]))

            const formatTime = d3.timeFormat("%d/%m/%Y")
            const dateFormatted = formatTime(d["date"])
            focus.select("#date").text(dateFormatted)
            
            focus.select(".x-hover-line").attr("y2", this.HEIGHT - this.y(d[yValue]))
            focus.select(".y-hover-line").attr("x2", -this.x(d.date))
            
          })

        /******************************** Tooltip Code ********************************/

        // Area Generator
        let area = d3.area()
          .x(d => { return this.x(d.date)})
          .y0(this.y(0))
          .y1(d => { return this.y(d[yValue])})

        // Update our area path
        this.g.select("#area")
          // .transition(t)
          .attr("d", area(data));

        // Path generator
        let line = d3.line()
          .x(d => this.x(d.date))
          .y(d => this.y(d[yValue]))

        // Update our line path
        this.g.select(".line")
          // .transition(t)
          .attr("d", line(data))

        // Update y-axis label
        const newText = (yValue === "price_usd") ? "Price ($)" 
          : (yValue === "market_cap") ? "Market Capitalization ($)" 
            : "24 Hour Trading Volume ($)"
        this.yLabel.text(newText)

    },

    // Run update when the variable changes
    readVariableSelectionEvent(payload) {
          console.log("readVariableSelectionEvent", payload)
          this.variableSelection = payload
          this.update()
    },

    readTimeFrameSelectionEvent(payload) {
          console.log("readTimeFrameSelectionEvent", payload)

          // dispatch update timeFrame state variable
          this.$store.commit("setTimeFrame", payload);

          // dispatch update market chart parameters with new volume
          this.$store.commit("updateMarketChartParams");

          // dispatch request new market chart data with new params
          this.$store.dispatch("fetchMarketChart", this.tokenData.name);

          // update chart with new data with corresponding timeFrame
          this.update()
    },

  }

}
</script>
