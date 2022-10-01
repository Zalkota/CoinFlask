<template>
    <div>
        

        <div class="flex">
          <div class="flex-1">
            <div class="inline-flex">
              <button v-on:click="variableSelectionFunction(`price_usd`)" :class="variableSelection == 'price_usd' ?  `bg-white border border-gray-400 bg-gray-200 text-gray-800 font-bold py-1 px-4 rounded-l-md` : `bg-white border border-gray-400 hover:bg-gray-200 text-gray-800 font-bold py-1 px-4 rounded-l-md`">
                Price
              </button>
              <button v-on:click="variableSelectionFunction(`market_cap`)" :class="variableSelection == 'market_cap' ? `bg-white border-t border-b border-gray-400 bg-gray-200 text-gray-800 font-bold py-1 px-4 rounded-none` : `bg-white border-t border-b border-gray-400 hover:bg-gray-200 text-gray-800 font-bold py-1 px-4 rounded-none`">
                Market Cap
              </button>
              <button v-on:click="variableSelectionFunction(`24h_vol`)" :class="variableSelection == '24h_vol' ? 'bg-white border border-gray-400 bg-gray-200 text-gray-800 font-bold py-1 px-4 rounded-r-md' : 'bg-white border border-gray-400 hover:bg-gray-200 text-gray-800 font-bold py-1 px-4 rounded-r-md'">
                Volume
              </button>
            </div>
            <div id="chart-area"></div>
          </div>
          <div class="flex flex-1 bg-gray-100 border border-gray-300 ml-8 p-4 rounded-md shadow-md">
            <div class="flex-1">
              <h2 class="text-2xl font-bold">Info</h2>
              <br>
              <div id="slider-div">
                <label>Date: <span id="dateLabel1">12/05/2013</span> - <span id="dateLabel2">31/10/2017</span></label>
                <div id="date-slider"></div>
              </div>
            </div>
            <div class="flex-1">
              <select v-model="coinSelection" @change="onChange($event)" class="form-control bg-gray-100">
                <option value="bitcoin">Bitcoin</option>
                <option value="bitcoin_cash">Bitcoin Cash</option>
                <option value="ethereum">Ethereum</option>
                <option value="litecoin">Litecoin</option>
                <option value="ripple">Ripple</option>
              </select>
            </div>
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

import * as d3 from "d3";
import data from '../../../assets/d3-data/coins.json'
import filteredMarketChartData from '../../../assets/d3-data/coins_2.json'
import d3Tip from "d3-tip";




export default {
  name: 'Graph',
  props: ["tokenData"],
  components: {},
  data() {
    return {
      data: data,
      filteredData: {},
      interval: null,
      buttonText: "Play",
      g: null,
      continentColor: d3.scaleOrdinal(d3.schemePastel1),
      HEIGHT: 0,
      WIDTH: 0,
      tipFunction: null,
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
      coinSelection: "bitcoin",
      variableSelection: "price_usd"
    }
  },
  mounted() {
    const MARGIN = { LEFT: 100, RIGHT: 100, TOP: 50, BOTTOM: 100 }
    const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
    const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM
    this.HEIGHT = HEIGHT
    this.WIDTH = WIDTH

    const svg = d3.select("#chart-area").append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

    this.g = svg.append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

    // time parser for x-scale
    const parseTime = d3.timeParse("%d/%m/%Y")
    

    // for tooltip
    this.bisectDate = d3.bisector(d => d.date).left

    // add the line for the first time
    this.g.append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "#68d391")
      .attr("stroke-width", "3px")

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
      .text("Price ($)")

    // scales
    this.x = d3.scaleTime().range([0, WIDTH])
    this.y = d3.scaleLinear().range([HEIGHT, 0])

    // axis generators
    this.xAxisCall = d3.axisBottom()
    this.yAxisCall = d3.axisRight()
      .ticks(6)
      .tickFormat(d => `${parseInt(d / 1000)}k`)

    // axis groups
    this.xAxis = this.g.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${HEIGHT})`)
    this.yAxis = this.g.append("g")
      .attr("class", "y axis")
      .attr("transform", `translate(${WIDTH}, 0)`)

    // Clean Data

    Object.keys(this.data).forEach(coin => {
      this.filteredData[coin] = this.data[coin]
        .filter(d => {
          return !(d["price_usd"] == null)
        }).map(d => {
          d["24h_vol"] = Number(d["24h_vol"])
          d["date"] = parseTime(d["date"])
          d["market_cap"] = Number(d["market_cap"])
          d["price_usd"] = Number(d["price_usd"])
          return d
        })
    })

    console.log('filtered data', this.filteredData)

    this.update()
  },

  created() {

  },

  computed: {
    filteredMarketChartData() {
            
            let data = this.$store.getters.getFilteredMarketChartData;
            console.log("filteredMarketChartData", data)
            return data
        },
  },

  methods: {

    update() {
        let data = this.filteredMarketChartData
        let yValue = this.variableSelection
        const t = d3.transition().duration(500)

        console.log('data', data)
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
          // const s = formatSi(x)
          // switch (s[s.length - 1]) {
          //   case "G": return "$" + s + "B" // billions
          //   case "k": return "$" + s + "K" // thousands
          // }
          return s
        }

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
          .attr("x", -41)
          .attr("y", -56)
          .attr("width", 82)
          .attr("height", 42)

        focus.append("rect")
          .attr("fill", "white")
          .attr("x", -40)
          .attr("y", -55)
          .attr("width", 80)
          .attr("height", 40)
        
        focus.append("text")
          .attr("id", "value")
          .attr("x", -32)
          .attr("y", -40)
          .attr("font-size", "18px")
          .attr("dy", ".31em")

        focus.append("text")
          .attr("id", "date")
          .style('fill', '#777')
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
            focus.select("#value").text("$" + d[yValue])

            const formatTime = d3.timeFormat("%m/%Y")
            const dateFormatted = formatTime(d["date"])
            focus.select("#date").text(dateFormatted)
            
            focus.select(".x-hover-line").attr("y2", this.HEIGHT - this.y(d[yValue]))
            focus.select(".y-hover-line").attr("x2", -this.x(d.date))
            
          })

        /******************************** Tooltip Code ********************************/

        // Path generator
        let line = d3.line()
          .x(d => this.x(d.date))
          .y(d => this.y(d[yValue]))

        // Update our line path
        this.g.select(".line")
          .transition(t)
          .attr("d", line(data))
 

        // Update y-axis label
        const newText = (yValue === "price_usd") ? "Price ($)" 
          : (yValue === "market_cap") ? "Market Capitalization ($)" 
            : "24 Hour Trading Volume ($)"
        this.yLabel.text(newText)

    },

    onChange(event) {
      this.update(this.filteredData)
    },

    variableSelectionFunction(payload) { 
      this.variableSelection = payload 
      this.update(this.filteredData)
    }

  }
}
</script>
