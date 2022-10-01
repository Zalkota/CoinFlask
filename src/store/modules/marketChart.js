import Vue from 'vue'
import Vuex from 'vuex'
import CoinGecko from 'coingecko-api'
const coinGeckoClient = new CoinGecko();


Vue.use(Vuex)

export default {
    state: {
        filteredMarketChartData: [],
        timeFrame: 'max',
        marketChartParameters: {
                vs_currency: 'usd',
                days: 'max'
                },
    },
    getters: {
        getFilteredMarketChartData: state => state.filteredMarketChartData,

        getTimeFrame: state => state.timeFrame,
    },
    mutations: {

        updateMarketChartParams(state) {
                state.marketChartParameters = {
                        vs_currency: state.currency,
                        days: state.timeFrame
                }
        },

        setTimeFrame(state, payload) {
                state.timeFrame = payload;
        },
        
        setMarketChartData(state, payload) {
            state.marketChartData = payload;
        },

        filterMarketChartData(state, payload) {
                let array = []
                Object.values(payload["prices"]).forEach((x, i) => {
                        array[i] = {
                        "date": new Date(x[0]),
                        "price_usd": x[1],
                        "24h_vol": Number(payload["total_volumes"][i][1]),
                        "market_cap": Number(payload["market_caps"][i][1])
                    }
                })
                state.filteredMarketChartData = array;
                console.log('filterMarketData', array)
        },
    },
    actions: {

        async fetchMarketChart({state, commit}, payload) {
                console.log("vuex fetchMarketChart", payload, state.marketChartParameters)
                let tokenName = payload.toLowerCase()
                let result = await coinGeckoClient.coins.fetchMarketChart(tokenName, state.marketChartParameters)
                let responseStatus = result.code
    
                if (responseStatus == 200) {
                    commit('filterMarketChartData', result.data)
                    // commit('setShowSpinner', false)
                } else if (historicalData.length > 0) {
                    // commit('setShowSpinner', false)
                } else {
                    let responseErrorMessage = result.data.error
                    // commit('setNetworkError', true)
                    // commit('setShowSpinner', false)
                    throw new Error(responseErrorMessage);
                }
            },
    },
    modules: {
    }
}
