<template>
    <div>

        <Navbar
        :marketData = "marketData"
        :totalMarketCap = "totalMarketCap"
        :totalVolume = "totalVolume"
        />

        <TableFrame
        :marketData = "marketData"
        :totalMarketCap = "totalMarketCapTruncated"
        />

        <Footer/>

    </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import TableFrame from "./components/TableFrame.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "Home",
  components: { Navbar, Footer, TableFrame},
  computed: {
      marketData() {
          return this.$store.getters.getStoredMarketData;
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
                  // result = sum / sum.length
              }
              return Number(sum).toLocaleString()
          } return ''
      },

      totalVolume() {
          let sum = 0
          if(this.marketData.length > 0 ){
              for(let i = 0; i < this.marketData.length; i++) {

                  sum = this.marketData[i].total_volume + sum
                  // result = sum / sum.length
              }
              return Number(sum).toLocaleString()
          } return ''
      }

  },


};
</script>
