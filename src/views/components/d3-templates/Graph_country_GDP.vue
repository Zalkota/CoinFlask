<template>
    <div>
       <!-- <svg
        :height="height"
        :width="width"
        ></svg> -->
        <div id="chart-area"></div>

        <div class="flex">
          <div class="flex-1">
            <button id="play-button" v-on:click="play()" class="btn btn-primary bg-green-500 text-white py-3 px-4 mr-2">{{ buttonText }}</button>
            <button id="reset-button" v-on:click="reset()" class="btn btn-primary bg-red-500 text-white p-3">Reset</button>
          </div>
          <div class="flex-1">
            <div id="slider-div">
              <label>Date: <span id="dateLabel1">12/05/2013</span> - <span id="dateLabel2">31/10/2017</span></label>
              <div id="date-slider"></div>
            </div>
          </div>
          <div class="flex-1">
            <select v-model="selection" @change="onChange($event)" class="form-control bg-gray-300">
              <option value="all">All</option>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
              <option value="americas">Americas</option>
              <option value="africa">Africa</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div id="chart-area"></div>                 
          </div> 
		  </div>
        
    </div>
</template>


<script>

import * as d3 from "d3";
import data from '../../assets/d3-data/data.json'
import d3Tip from "d3-tip";




export default {
  name: 'Graph',
  props: ["tokenData"],
  components: {},
  data() {
    return {
      data: data,
      filteredData: null,
      interval: null,
      buttonText: "Play",
      g: null,
      continentColor: d3.scaleOrdinal(d3.schemePastel1),
      tipFunction: null,
      x: null,
      y: null,
      area: null,
      timeLabel: null,
      time: 0,
      selectedData: null,
      selection: "all"
    }
  },
  mounted() {
    const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 }
    const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
    const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM


    const svg = d3.select("#chart-area").append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

    this.g = svg.append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

    // Tooltip
    const tip = d3Tip()
      .attr('class', 'd3-tip')
      .html((event, d) => {
        console.log(d)
        let text = `<strong>Country:</strong> <span style='color:red;text-transform:capitalize'>${d.country}</span><br>`
        text += `<strong>Continent:</strong> <span style='color:red;text-transform:capitalize'>${d.continent}</span><br>`
        text += `<strong>Life Expectancy:</strong> <span style='color:red'>${d3.format(".2f")(d.life_exp)}</span><br>`
        text += `<strong>GDP Per Capita:</strong> <span style='color:red'>${d3.format("$,.0f")(d.income)}</span><br>`
        text += `<strong>Population:</strong> <span style='color:red'>${d3.format(",.0f")(d.population)}</span><br>`
        return text
      })
      this.g.call(tip)

    this.tipFunction = tip

    // X label
    const xLabel = this.g.append("text")
      .attr("class", "x axis-label")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 50)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("GDP-per-capitath")

    // Y Label
    const yLabel = this.g.append("text")
      .attr("class", "y axis-label")
      .attr("x", -170)
      .attr("y", -40)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Life Expenctancy")

    // Time Label
    this.timeLabel = this.g.append("text")
      .attr("y", HEIGHT - 10)
      .attr("x", WIDTH - 40)
      .attr("font-size", "40px")
      .attr("text-anchor", "middle")
      .text("1800")
      

    // Scales
    this.x = d3.scaleLog()
      .base(10)
      .range([0, WIDTH])
      .domain([142, 150000])

    this.y = d3.scaleLinear()
      .range([HEIGHT, 0])
      .domain([0, 90])
    
    this.area = d3.scaleLinear()
      .range([25*Math.PI, 1500*Math.PI])
      .domain([2000, 1400000000])

    // X Axis
    const xAxisCall = d3.axisBottom(this.x)
      .tickValues([400, 4000, 40000])
      .tickFormat(d3.format("$"));
    this.g.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${HEIGHT})`)
      .call(xAxisCall)

    // Y Axis
    const yAxisCall = d3.axisLeft(this.y)
    this.g.append("g")
      .attr("class", "y axis")
      .call(yAxisCall)

    // Legend
    const legend = this.g.append("g")
      .attr("transform", `translate(${WIDTH - 1}, ${HEIGHT - 125})`)

    const continents = ["europe", "asia", "americas", "africa"]

    continents.forEach((continent, i) => {
      const legendRow = legend.append("g")
        .attr("transform", `translate(0, ${i * 20})`)

      legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", this.continentColor(continent))

      legendRow.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .style("text-transform", "capitalize")
        .text(continent)
    })  

    
    
    //Filter Function
    this.filteredData = this.data.map(year => {
      return year["countries"].filter(country => {
        const dataExists = (country.income && country.life_exp)
        return dataExists
      }).map(country => {
        country.income = Number(country.income)
        country.life_exp = Number(country.life_exp)
        return country
      })
    })

    

    this.update(this.filteredData[0])

    


  },

  created() {

  },

  computed: {

    // selectData() {
    //   this.selectedData = this.filteredData.filter(d => {
    //     if (this.selection === "all")  return true
    //     else {
    //       return d.continent == this.selection
    //     }
    //   })
    // }

    

  },

  methods: {

    update(data) {
        // standard transition time for the visualization
        const t = d3.transition()
          .duration(100)

        this.selectedData = data.filter(d => {
        if (this.selection === "all") return true
        else {
          return d.continent == this.selection
        }
      })

        // JOIN new data with old elements.
        const circles = this.g.selectAll("circle")
          .data(this.selectedData, d => d.country)

        // EXIT old elements not present in new data.
        circles.exit().remove()

        // ENTER new elements present in new data.
        circles.enter().append("circle")
          .attr("fill", d => this.continentColor(d.continent))
          .on("mouseover", this.tipFunction.show)
          .on("mouseout", this.tipFunction.hide)
          .merge(circles)
          .transition(t)
            .attr("cy", d => this.y(d.life_exp))
            .attr("cx", d => this.x(d.income))
            .attr("r", d => Math.sqrt(this.area(d.population) / Math.PI))

        // update the time label
        this.timeLabel.text(String(this.time + 1800))
    },

    step() {
      this.time = (this.time < 214) ? this.time + 1 : 0
      this.update(this.filteredData[this.time])
    },
    
    play() {
      if (this.buttonText === "Play") {
        console.log("Buttontext = play")
        this.buttonText = "Pause"
        this.interval = setInterval(this.step, 100)
      } else {
        console.log("Buttontext = Pause")
        this.buttonText = "Play"
        clearInterval(this.interval)
      }
    },

    reset() {
      this.time = 0
      this.update(this.filteredData[0])
    },

    onChange(event) {
      this.update(this.filteredData[this.time])
    }

    // selectedData() {
    //   console.log(this.filteredData)
    //   return this.filteredData.filter(d => {
    //     if (this.selection === "all")  return true
    //     else {
    //       return d.continent == this.selection
    //     }
    //   })
    // }

    
    
  }
}
</script>
