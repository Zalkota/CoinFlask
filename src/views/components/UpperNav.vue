<template>
    <div class="container mx-auto">
        <div class="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex flex-row justify-start flex-nowrap whitespace-nowrap w-full ">

            <div class="flex flex-auto overflow-x-auto mt-2 md:mt-3">
                <div class="flex-1 text-xs  text-gray-600 px-2 ">
                    Coins: <span class="text-blue-500">100</span>
                </div>

                <div class="flex-1 text-xs  mx-auto text-gray-600 px-2 ">
                    Exchanges: <span class="text-blue-500">638</span>
                </div>

                <div class="flex-1 text-xs  mx-auto text-gray-600 px-2 ">
                    Market Cap: <span class="text-blue-500">${{ totalMarketCap }}</span>
                </div>

                <div class="flex-1 text-xs mx-auto text-gray-600 px-2">
                    Total Vol: <span class="text-blue-500">${{ totalVolume }}</span>
                </div>

            </div>


            <div class="flex-1 text-xs text-right text-gray-600 pl-2 md:mt-0 mt-1">
                <t-dropdown v-bind:text="currency" >
                  <div class="py-1 rounded-md shadow-xs">
                    <a
                      v-on:click="setCurrency('usd', '$')"
                      class="no-underline block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      role="menuitem"
                      data-cy="setCurrencyUSD"
                    >
                      USD
                    </a>
                    <a
                      v-on:click="setCurrency('eur', '€')"
                      class="no-underline block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      role="menuitem"
                      data-cy="setCurrencyEuro"
                    >
                      EUR
                    </a>
                    <a
                      v-on:click="setCurrency('jpy', '¥')"
                      class="no-underline block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      role="menuitem"
                      data-cy="setCurrencyYen"
                    >
                      JPY
                    </a>
                  </div>
                </t-dropdown>
            </div>
        </div>
    </div>

</template>


<script>
import CoinGecko from 'coingecko-api'
const coinGeckoClient = new CoinGecko();

export default {
  name: 'UpperNav',
  props: ["marketData", "totalMarketCap", "totalVolume"],
  computed: {
      currency() {
          var params = this.$store.getters.getMarketParameters;
          return params.vs_currency
      },
  },
  methods: {
      setCurrency(payload, symbol){

          console.log("this.currency", this.currency, payload)

          let marketParameters = {
              price_change_percentage: '1h,24h,7d',
              vs_currency: payload,
              order: CoinGecko.ORDER.MARKET_CAP_DESC,
              sparkline: true,
          }
          console.log("marketParameters", marketParameters)
          this.$store.commit('setCurrencySymbol', symbol)
          this.$store.commit('setMarketParameters', marketParameters)
          this.$store.dispatch("setMarketData");
      }
  }
}
</script>
