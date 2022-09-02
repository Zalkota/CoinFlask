<template>
    <div>
        <t-dropdown text="Sort" variant="sortBy">
          <div class="py-1 rounded-md shadow-xs">
            <a
              v-on:click="sortByPrice()"
              class="no-underline block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              role="menuitem"
            >
              By Price
            </a>
            <a
              v-on:click="sortByMarketCap()"
              class="no-underline block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              role="menuitem"
            >
              By Market Cap
            </a>
            <a
              v-on:click="sortByGainer()"
              class="no-underline block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              role="menuitem"
            >
              Biggest Gainers
            </a>
            <a
              v-on:click="sortByLoser()"
              class="no-underline block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              role="menuitem"
            >
              Biggest Losers
            </a>
            <a
              v-on:click="sortByMarketCap()"
              class="no-underline block px-4 py-2 text-sm leading-5 text-red-500 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              role="menuitem"
            >
              Reset
            </a>
          </div>
        </t-dropdown>

        <div class="overflow-x-auto">
             <t-table
               :headers="[' ', '#', 'Coin', ' ', ' ',  'Price', '1h', '24h', '7d', '24h Volume', 'Market Cap', 'Last 7 Days']"
               class="w-full px-6 py-12 border-b border-t border-gray-300 text-left text-sm leading-4 font-medium text-gray-800 tracking-wider"
               :data="tableData"
             >

               <template slot="row" slot-scope="props" >
                 <tr class="hover:bg-gray-100" v-cloak v-on:click="reroute(props.row.name)" v-show="getSpinnerBoolean == false && getNetworkErrorBoolean == false && tableData.length > 0">
                   <td :class="[props.tdClass, 'py-2  text-center ']">
                    <button v-on:click="animateHeart()" >
                        <div :ref="props.row.id" :class="checkFavorite(props.row.id)">
                        </div>
                    </button>
                    <!-- <vue-star data-cy="addFavorite" animate="animated bounceIn" color="rgb(250, 210, 0)" ><img slot="icon" v-on:click="emitFavoriteToggleEvent(props.row.id)" class="h-8 star-button" style="max-width: none;" :src="checkFavorite(props.row.id)" alt="Favorite" /></vue-star> -->
                    <!-- :class="{'text-green-500': props.row.price_change_percentage_1h_in_currency >= 0, 'text-red-500': props.row.price_change_percentage_1h_in_currency < 0 }" -->
                    <button data-cy="addFavorite" v-on:click="emitFavoriteToggleEvent(props.row.id)"><img class="h-8 star-button" style="max-width: none;" :src="returnFavoriteImage(props.row.id)" alt="Favorite" /></button>
                     <!-- <button data-cy="addFavorite" v-if="!checkFavorite(props.row.id)" v-on:click="emitAddFavoriteEvent(props.row.id)"><img class="h-8 star-button" style="max-width: none;" src="@/assets/images/icon-star.svg" alt="Favorite" /></button>
                     <button data-cy="removeFavorite" v-if="checkFavorite(props.row.id)" v-on:click="emitRemoveFavoriteEvent(props.row.id)"><img class=" h-8 star-button" style="max-width: none;" src="@/assets/images/icon-star-active.svg" alt="Favorite" /></button> -->
                   </td>
                   <td :class="[props.tdClass, 'py-2 pr-2 text-left']">
                     {{ props.row.market_cap_rank }}
                   </td>

                   <td :class="[props.tdClass, 'py-2 text-left pr-0 ']">
                     <img class="block h-6" :src="props.row.image" alt="CoinFlask Logo" />
                   </td>
                   <td :class="[props.tdClass, 'py-2 text-left pl-0']">
                       <!-- <router-link class="no-underline text-gray-800 font-bold " :to="{name: 'detailView', params: {tokenName: props.row.name}}">{{ props.row.name }}</router-link> -->
                       {{ props.row.name }}
                   </td>
                   <td :class="[props.tdClass, 'py-2 text-left pl-0 text-xs font-thin text-gray-700 uppercase']">
                       {{ props.row.symbol }}
                   </td>
                   <td :class="[props.tdClass, 'py-2']">
                     {{ getCurrencySymbol }}{{ addCommasToNumber(props.row.current_price) }}
                   </td>
                   <td :class="props.tdClass">
                     <span :class="{'text-green-500': props.row.price_change_percentage_1h_in_currency >= 0, 'text-red-500': props.row.price_change_percentage_1h_in_currency < 0 }">
                          {{ convertToPercentage(props.row.price_change_percentage_1h_in_currency) }}
                     </span>
                   </td>
                   <td :class="props.tdClass">
                     <span :class="{'text-green-500': props.row.price_change_percentage_24h_in_currency >= 0, 'text-red-500': props.row.price_change_percentage_24h_in_currency < 0 }">
                         {{ convertToPercentage(props.row.price_change_percentage_24h_in_currency) }}
                     </span>
                   </td>
                   <td :class="props.tdClass">
                     <span :class="{'text-green-500': props.row.price_change_percentage_7d_in_currency >= 0, 'text-red-500': props.row.price_change_percentage_7d_in_currency < 0 }">
                         {{ convertToPercentage(props.row.price_change_percentage_7d_in_currency) }}
                     </span>
                   </td>
                   <td :class="props.tdClass">
                     {{ getCurrencySymbol }}{{ addCommasToNumber(props.row.total_volume) }}
                   </td>
                   <td :class="props.tdClass">
                     {{ getCurrencySymbol }}{{ addCommasToNumber(props.row.market_cap) }}
                   </td>
                   <td :class="[props.tdClass, 'pr-0 ']">
                     <Sparkline
                     v-bind:data = "props.row.sparkline_in_7d.price"
                     v-bind:change = "props.row.price_change_percentage_7d_in_currency"/>
                   </td>

                 </tr>
               </template>
             </t-table>
</div>

         <Spinner
         v-show="getSpinnerBoolean == true"
         />

         <NetworkError
         v-show="getNetworkErrorBoolean == true"
         />

    </div>
</template>


<script>

import Spinner from "./Spinner.vue";
import NetworkError from "./NetworkError.vue";
import Sparkline from "./Sparkline.vue";
import MathHelper from "../../js/math-helper.js";
import VueStar from 'vue-star';

export default {
  name: 'DataTable',
  props: ["tableData", "favoriteMarketData"],
  components: {Spinner, NetworkError, Sparkline, VueStar},
  data() {
    return {
      animate: false,
      heartClass: "heart"
    }
  },

  computed: {
      getSpinnerBoolean() {
          return this.$store.getters.getSpinnerBoolean
      },

      getNetworkErrorBoolean() {
          return this.$store.getters.getNetworkErrorBoolean
      },

      getCurrencySymbol() {
          return this.$store.getters.getCurrencySymbol
      },




  },

  mixins: [],

  methods: {

      reroute(tokenName) {
        console.log(tokenName)
        this.$router.push({ name: 'detailView', params: {tokenName: tokenName}})
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

      sortByPrice() {
          this.$store.dispatch("sortByPrice");
      },

      sortByMarketCap() {
          this.$store.dispatch("sortByMarketCap");
      },

      sortByGainer() {
          this.$store.dispatch("sortByGainer");
      },

      sortByLoser() {
          this.$store.dispatch("sortByLoser");
      },


      emitFavoriteToggleEvent(id) {
          this.$emit('FavoriteEvent', { id: id })
          console.log("emitFavoriteToggleEvent", id)
      },

      returnFavoriteImage(id) {
          let position = this.favoriteMarketData.map((element) => element.id).indexOf(id)
          if (position > -1) {
              let images = require.context('@/assets/images/', false, /\.svg$/)
              return images('./icon-star-active.svg')
          }
          let images = require.context('@/assets/images/', false, /\.svg$/)
          return images('./icon-star.svg')
      },

      checkFavorite(id) {
          let position = this.favoriteMarketData.map((element) => element.id).indexOf(id)
          if (position > -1) {

              this.$refs[id].addEventListener("animationend",function(){
                console.log(id);
                })

              return true

          }
          return false
      },

      animateHeart() {
          console.log("CLICK")
          this.animate = !this.animate
      },


  }
}
</script>
