<template>
    <div>
        <Navbar :marketData="marketData" :totalMarketCap="totalMarketCap" :totalVolume="totalVolume" />
        <BreadCrumb :tokenName="filterTokenData.name + ' Price'" />
        <div class="container mx-auto mt-2 lg:mt-16 mb-12 lg:mb-32  px-4 sm:px-6 lg:px-10">

            <div class="flex">

                <div class="flex-1 w-2/3">
                    
                    <div class="flex">
                        <div class="flex-initial pr-2">
                            <img class="block h-8" :src="filterTokenData.image" alt="CoinFlask Logo" />
                        </div>
                        <div class="flex-1">
                            <h1 class="my-0 text-xl font-bold pt-1">{{  filterTokenData.name  }} ({{
                                filterTokenData.symbol.toUpperCase()  }})</h1>
                        </div>
                    </div>

                    <div class="flex mt-2">
                        <div class="flex-initial">
                            <h3 class="text-3xl font-bold">{{ getCurrencySymbol }}{{  addCommasToNumber(filterTokenData.current_price)  }}</h3>
                        </div>
                        <div class="flex-1 p-2">
                            <span :class="{ 'text-green-500 text-xl font-bold': filterTokenData.price_change_percentage_24h >= 0, 'text-red-500 text-xl font-bold': filterTokenData.price_change_percentage_24h < 0 }">
                                {{  convertToPercentage(filterTokenData.price_change_percentage_24h)  }}
                            </span>
                        </div>
                    </div>



                    <div class="flex flex-row text-sm mt-4">
                        <div class="flex flex-col w-1/2">
                            <div class="flex-1 flex flex-row border-b border-gray-300">
                                <div class="flex-1 p-2 text-gray-600 font-thin text-sm">Market Cap</div>
                                <div class="flex-initial p-2 font-bold">{{ getCurrencySymbol }}{{  addCommasToNumber(filterTokenData.market_cap)  }}
                                </div>
                            </div>
                            <div class="flex-1 flex flex-row border-b border-gray-300">
                                <div class="flex-1 p-2 text-gray-600 font-thin text-sm">Total Volume </div>
                                <div class="flex-initial p-2 font-bold">{{ getCurrencySymbol }}{{  addCommasToNumber(filterTokenData.total_volume) 
                                    }}</div>
                            </div>
                            <div class="flex-1 flex flex-row border-b border-gray-300">
                                <div class="flex-1 p-2 text-gray-600 font-thin text-sm">Fully Diluted Valuation </div>
                                <div class="flex-initial p-2 font-bold">{{ getCurrencySymbol }}{{
                                    addCommasToNumber(filterTokenData.fully_diluted_valuation)  }}</div>
                            </div>
                        </div>

                        <div class="flex flex-col w-1/2">
                            <div class="flex-1 flex flex-row border-b border-gray-300">
                                <div class="flex-1 p-2 text-gray-600 font-thin text-sm">Circulating Supply</div>
                                <div class="flex-initial p-2 font-bold">{{ getCurrencySymbol }}{{
                                    addCommasToNumber(filterTokenData.circulating_supply)  }}</div>
                            </div>
                            <div class="flex-1 flex flex-row border-b border-gray-300">
                                <div class="flex-1 p-2 text-gray-600 font-thin text-sm">Total Supply</div>
                                <div class="flex-initial p-2 font-bold">{{ getCurrencySymbol }}{{  addCommasToNumber(filterTokenData.total_supply) 
                                    }}</div>
                            </div>
                            <div class="flex-1 flex flex-row border-b border-gray-300">
                                <div class="flex-1 p-2 text-gray-600 font-thin text-sm">Max Supply</div>
                                <div class="flex-initial p-2 font-bold">{{ getCurrencySymbol }}{{  addCommasToNumber(filterTokenData.max_supply)  }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-1/3">
                    <h3 class="text-xl font-bold">Info</h3>
                </div>
            </div>

            <div class="mt-8">
                <ul class="flex mb-0 list-none flex-wrap pt-3 flex-row border-b border-gray-300">
                    <li class="-mb-px mr-2 last:mr-0 flex-0 text-center">
                        <a class="text-sm text-gray-600 font-bold px-6 py-3 pl-2 block leading-normal no-underline cursor-pointer"
                            v-on:click="toggleTabs(0)"
                            v-bind:class="{ 'border-none': openTab !== 0, 'border-b-2 border-green-400 text-green-400': openTab === 0 }">
                            Overview
                        </a>
                    </li>
                    <li class="-mb-px mr-2 last:mr-0 flex-0 text-center">
                        <a class="text-sm text-gray-600 font-bold px-5 py-3 block leading-normal no-underline cursor-pointer"
                            v-on:click="toggleTabs(1)"
                            v-bind:class="{ 'border-none': openTab !== 1, 'border-b-2 border-green-400 text-green-400': openTab === 1 }">
                            Markets
                        </a>
                    </li>
                </ul>
            </div>

            <div class="relative flex flex-col min-w-0 break-words w-full">
                <div class="flex-auto">
                    <div class="tab-content tab-space">
                        <div v-bind:class="{ 'hidden': openTab !== 0, 'block': openTab === 0 }">

                            <div class="flex  mb-2 mx-auto py-4 ">
                                <div class="flex-1">
                                    <h1 class="text-gray-900 font-bold text-xl lg:text-2xl mb-1"
                                        style="font-family: Russo One;">{{  filterTokenData.name  }} Price Chart ({{
                                        filterTokenData.symbol.toUpperCase()  }}/{{  getCurrency.toUpperCase()  }})</h1>
                                </div>
                            </div>

                            <div class="mx-auto text-left w-full">
                                <Graph 
                                :tokenData="filterTokenData"/>
                            </div>

                        </div>
                        <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">

                            <div class="flex  mb-2 mx-auto py-4 ">
                                <div class="flex-1">
                                    <h1 class="text-gray-900 font-bold text-xl lg:text-2xl mb-1"
                                        style="font-family: Russo One;">{{  filterTokenData.name  }} Markets</h1>
                                    <h2 class="text-gray-600 font-thin text-sm ">Last Updated: {{
                                        filterTokenData.last_updated  }}. Currency in {{  getCurrency.toUpperCase()  }}.</h2>
                                </div>
                            </div>

                            <div class="mx-auto text-left w-full">
                                
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
import Navbar from "./components/Navbar.vue";
import BreadCrumb from "./components/BreadCrumb.vue";
import Graph from "./components/Graph.vue";
import MathHelper from "../js/math-helper.js";


export default {
    name: 'DetailView',
    props: [],
    components: { Navbar, BreadCrumb, Graph },
    data() {
        return {
            openTab: 0,
        }
    },
    computed: {

        marketData() {
            return this.$store.getters.getStoredMarketData;
        },

        filterTokenData() {
            return this.marketData.find(data => data.name == this.$route.params.tokenName)
        },

        favoriteArray() {
            return this.$store.getters.getStoredfavoriteArray;
        },

        favoriteMarketData() {
            return this.$store.getters.getStoredFavoriteMarketData;
        },

        getCurrencySymbol() {
            return this.$store.getters.getCurrencySymbol
        },

        getCurrency() {
            return this.$store.getters.getCurrency
        },

        totalMarketCap() {
            let sum = 0
            if (this.marketData.length > 0) {
                for (let i = 0; i < this.marketData.length; i++) {

                    sum = this.marketData[i].market_cap + sum
                    // result = sum / sum.length
                }
                return Number(sum).toLocaleString()
            } return ''
        },

        totalVolume() {
            let sum = 0
            if (this.marketData.length > 0) {
                for (let i = 0; i < this.marketData.length; i++) {

                    sum = this.marketData[i].total_volume + sum
                    // result = sum / sum.length
                }
                return Number(sum).toLocaleString()
            } return ''
        }

    },

    methods: {

        toggleTabs(tabNumber) {
            this.openTab = tabNumber
        },

        addCommasToNumber(rawNumber) {
            if (rawNumber != undefined) {
                return MathHelper.addCommasToNumber(rawNumber)
            }
        },

        convertToPercentage(rawNumber) {
            if (rawNumber != undefined) {
                return MathHelper.convertToPercentage(rawNumber)
            }
        },

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

        toggleTabs: function (tabNumber) {
            this.openTab = tabNumber
        }

    }
}
</script>
