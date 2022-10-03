<template>

<div>

    <Navbar
    ref="navbar"
    :marketData = "marketData"
    :totalMarketCap = "totalMarketCap"
    :totalVolume = "totalVolume"
    />

    <BreadCrumb 
    :tokenName = "StrSearch"
    />

    <div class="pt-1">
        <TableFrame
        :marketData = "getSearchResults"
        :totalMarketCap = "totalMarketCapTruncated"
        />
    </div>

    <Footer/>

</div>
</template>


<script>

import Vue from 'vue'

import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import TableFrame from "./components/TableFrame.vue";
import SearchBar from './components/SearchBar.vue'
import BreadCrumb from './components/BreadCrumb.vue';


export default {
  name: 'Search',
  props: [ ],
  components: { Navbar, Footer, SearchBar, TableFrame, BreadCrumb },
  data() {
    return {
      initialQuery: null,
      searchResults: [],
      marketSearchData: [],
      StrSearch: "Search"
    }
  },
  computed: {
      marketData() {
          return this.$store.getters.getStoredMarketData;
      },

      getSearchResults() {
          this.$store.dispatch("setSearchResults");
          return this.$store.getters.getSearchResults
      },


      totalMarketCapTruncated() {
          let sum = 0
          if(this.marketData.length > 0 ){
              for(let i = 0; i < this.marketData.length; i++) {

                  sum = this.marketData[i].market_cap + sum
              }
              let result = sum / 1000000000000
              return result.toFixed(2)
          } return ''
      },

      totalMarketCap() {
          let sum = 0
          if(this.marketData.length > 0 ){
              for(let i = 0; i < this.marketData.length; i++) {

                  sum = this.marketData[i].market_cap + sum
              }
              return Number(sum).toLocaleString()
          } return ''
      },

      totalVolume() {
          let sum = 0
          if(this.marketData.length > 0 ){
              for(let i = 0; i < this.marketData.length; i++) {

                  sum = this.marketData[i].total_volume + sum
              }
              return Number(sum).toLocaleString()
          } return ''
      },

  },
  mounted () {
    this.populateMarketSearchData()
  },

  methods: {

      populateMarketSearchData(){
          if(this.marketData.length > 0 ) {
            this.marketData.forEach(x => {
                x.push(this.marketData[i].id)
                x.push(this.marketData[i].symbol)
            })
          } 
          console.log("this.marketSearchData", this.marketSearchData)
      },
  }
}
</script>
