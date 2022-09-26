<template>
    <div class="container mx-auto mt-2 lg:mt-16 mb-12 lg:mb-32  px-4 sm:px-6 lg:px-10">
        <div class="flex flex-wrap">
            <div class="w-full">
                <ul v-show="this.$route.name == 'home'" class="flex mb-0 list-none flex-wrap pt-3 flex-row border-b border-gray-300">
                  <li class="-mb-px mr-2 last:mr-0 flex-0 text-center">
                    <a class="text-sm text-gray-600 font-bold px-6 py-3 pl-2 block leading-normal no-underline cursor-pointer" v-on:click="toggleTabs(1)" v-bind:class="{'border-none': openTab !== 1, 'border-b-2 border-green-400 text-green-400': openTab === 1}">
                        <img class="inline-block h-6 w-auto" src="@/assets/images/icon-star-active.svg" alt="CoinFlask Logo" />
                      Favorites
                    </a>
                  </li>
                  <li class="-mb-px mr-2 last:mr-0 flex-0 text-center">
                    <a class="text-sm text-gray-600 font-bold px-5 py-3 block leading-normal no-underline cursor-pointer" v-on:click="toggleTabs(2)" v-bind:class="{'border-none': openTab !== 2, 'border-b-2 border-green-400 text-green-400': openTab === 2}">
                      Coins
                    </a>
                  </li>
                </ul>


                <!-- <button v-on:click="getFavoritesData()" name="button"> {{ getFavoritesData.id }}</button> -->
                <div class="relative flex flex-col min-w-0 break-words w-full">
                    <div class="flex-auto">
                        <div v-show="this.$route.name == 'home'" class="tab-content tab-space">
                            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">

                                <div class="flex  mb-2 mx-auto py-4 ">
                                    <div class="flex-1">
                                          <h1 class="text-gray-900 font-bold text-xl lg:text-2xl mb-1" style="font-family: Russo One;">Cryptocurrency Prices by Market Cap</h1>
                                          <h2 class="text-gray-600 font-thin text-sm ">The global cryptocurrency market cap today is {{ getCurrencySymbol }}{{totalMarketCap}} Trillion.</h2>
                                    </div>
                                </div>

                                  <div  class="mx-auto text-left w-full">

                                      <DataTable
                                      :tableData = "marketData"
                                      :favoriteMarketData = "favoriteMarketData"
                                      @FavoriteEvent = "readFavoriteToggleEvent"
                                      />

                                  </div>

                            </div>
                            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">

                                <div class="flex  mb-2 mx-auto py-4 ">
                                    <div class="flex-1">
                                          <h1 class="text-gray-900 font-bold text-xl lg:text-2xl mb-1" style="font-family: Russo One;">Your Portfolio</h1>
                                          <h2 class="text-gray-600 font-thin text-sm ">Add coins to your portfolio by clicking on the yellow star.</h2>
                                    </div>
                                </div>

                                <div  class="mx-auto text-left w-full">

                                    <DataTable
                                    :tableData = "favoriteMarketData"
                                    :favoriteMarketData = "favoriteMarketData"
                                    @FavoriteEvent = "readFavoriteToggleEvent"
                                    />

                                    <div v-show="favoriteMarketData && favoriteMarketData.length == 0" class=" text-sm text-center text-gray-600 mx-auto my-6">
                                        No coins were found.
                                    </div>

                                  </div>
                            </div>
                        </div>

                        <div v-if="this.$route.name == 'search'" class="tab-content tab-space">
                            <div class="flex  mb-2 mx-auto py-4 ">
                                <div class="flex-1">
                                      <h1 class="text-gray-900 font-bold text-xl lg:text-2xl mb-1" style="font-family: Russo One;">Cryptocurrency Search Results</h1>
                                      <h2 class="text-gray-600 font-thin text-sm ">Search by coin name.</h2>
                                </div>
                            </div>
                            <div  class="mx-auto text-left w-full">
                                    <DataTable
                                    :tableData = "marketData"
                                    :favoriteMarketData = "favoriteMarketData"
                                    @FavoriteEvent = "readFavoriteToggleEvent"
                                    />
                            </div>
                            <div v-show="marketData && marketData.length == 0" class=" text-sm text-center text-gray-600 mx-auto my-6">
                                    No results were found.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import CoinGecko from 'coingecko-api'
const coinGeckoClient = new CoinGecko();
import DataTable from "./DataTable.vue";

export default {
  name: 'TableFrame',
  props: ["marketData", "totalMarketCap"],
  components: {DataTable},
  data() {
    return {
         openTab: 2,
         alwaysTrue: true,
         alwaysFalse: false,
         tableData: [],
    }
  },
  computed: {


      favoriteArray() {
          return this.$store.getters.getStoredfavoriteArray;
      },

      favoriteMarketData() {
          return this.$store.getters.getStoredFavoriteMarketData;
      },

      getCurrencySymbol() {
          return this.$store.getters.getCurrencySymbol
      },


  },

  methods: {

      readFavoriteToggleEvent(payload) {
          let id = payload.id
          this.toggleFavorite(id)
          console.log("readFavoriteToggleEvent", id)
      },


     toggleFavorite(id) {
         let position = this.favoriteMarketData.map((element) => element.id).indexOf(id)
         console.log("position", position)

         // check is id is already found in favoriteMarketData
         if (position > -1) {
             // Object already in favorites
             // remove it
             this.favoriteMarketData.splice(position, 1);
             this.$store.commit('setFavoriteMarketData', this.favoriteMarketData)
             // console.log("Favorite removed", id, "from", this.favoriteMarketData)

         } else {
             // Object not found in favorites
             // obtain market data for that favorite
             let marketDataQuery = this.marketData.filter(x => x.id.toLowerCase() == id)
             // add it to the favoriteMarketData array
             this.favoriteMarketData.push(marketDataQuery[0])
             this.$store.commit('setFavoriteMarketData', this.favoriteMarketData)
             // console.log("Favorite added", id, "to", this.favoriteMarketData)

         }
     },

    toggleTabs: function(tabNumber){
        this.openTab = tabNumber
    }
  }
}
</script>
