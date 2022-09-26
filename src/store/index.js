import Vue from 'vue'
import Vuex from 'vuex'
import CoinGecko from 'coingecko-api'
const coinGeckoClient = new CoinGecko();
import createPersistedState from 'vuex-persistedstate';
import marketChart from './modules/marketChart.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        marketChart
    },
    state: {
        marketData: [],
        favoriteMarketData: [],
        favoriteArray: [],
        currency: 'USD',
        currencySymbol: '$',
        showSpinner: true,
        networkError: false,
        marketParameters: {
            price_change_percentage: '1h,24h,7d',
            vs_currency: 'USD',
            order: CoinGecko.ORDER.MARKET_CAP_DESC,
            sparkline: true,
        },
        searchQuery: [],
        searchResults: [],

    },
    plugins: [createPersistedState()],
    getters: {
        getStoredMarketData: state => state.marketData,

        getStoredFavoriteMarketData: state => state.favoriteMarketData,

        getStoredfavoriteArray: state => state.favoriteArray,

        getMarketParameters: state => state.marketParameters,

        getCurrency: state => state.currency,

        getCurrencySymbol: state => state.currencySymbol,

        getSpinnerBoolean: state => state.showSpinner,

        getNetworkErrorBoolean: state => state.networkError,

        getSearchQuery: state => state.searchQuery,

        getSearchResults: state => state.searchResults,
    },
    mutations: {
        setMarketData(state, payload) {
            state.marketData = payload;
        },

        setFavoriteMarketData(state, payload) {
            state.favoriteMarketData = payload;
        },

        setFavoriteArray(state, payload) {
            state.favoriteArray = payload;
        },

        setMarketParameters(state, payload) {
            state.marketParameters = payload;
        },

        setCurrencySymbol(state, payload) {
            state.currency = payload.currency;
            state.currencySymbol = payload.symbol;
        },

        setShowSpinner(state, payload) {
            state.showSpinner = payload;
        },

        setNetworkError(state, payload) {
            state.networkError = payload;
        },

        setSearchQuery(state, payload) {
            state.searchQuery = payload;
        },

        setSearchResults(state, payload) {

            state.searchResults.push(payload);
            console.log("setSearchResults", state.searchResults)
        },
    },
    // async calls must be placed in actions
    actions: {



        async setSearchResults({state, commit}){
            state.searchResults = []
            if (state.searchQuery && state.searchQuery.length > 0){

                let searchId = state.marketData.filter(x => state.searchQuery.includes(x.id.toLowerCase()) || state.searchQuery.includes(x.symbol.toLowerCase()))

                if (searchId[0] != undefined){
                    commit('setSearchResults', searchId[0])
                }
                console.log("push results", state.searchResults[0])
            } else {
                commit('setSearchResults', [])
                console.log("state.searchResults", state.searchResults)
            }
        },

        async setMarketData({state, commit}) {
            commit('setShowSpinner', true)
            let result = await coinGeckoClient.coins.markets(state.marketParameters)
            let responseStatus = result.code
            console.log("marketData: ", state.marketData)

            if (responseStatus == 200) {
                let marketData = result.data
                commit('setMarketData', marketData)
                commit('setShowSpinner', false)
            } else if (state.marketData.length > 0) {
                commit('setShowSpinner', false)
            } else {
                let responseErrorMessage = result.data.error
                commit('setNetworkError', true)
                commit('setShowSpinner', false)
                throw new Error(responseErrorMessage);
            }

        },

        async refreshMarketData({state, commit}) {
            let result = await coinGeckoClient.coins.markets(state.marketParameters)
            let responseStatus = result.code
            if (responseStatus == 200) {
                let marketData = result.data
                commit('setMarketData', marketData)
            } else {
                let responseErrorMessage = result.data.error
                throw new Error(responseErrorMessage);
            }
        },

        async sortByPrice({state, commit}) {
            let sortedArray = state.marketData.sort((a, b) => (b.current_price - a.current_price))
            commit('setMarketData', sortedArray)
            let sortedFavoriteArray = state.favoriteMarketData.sort((a, b) => (b.current_price - a.current_price))
            commit('setFavoriteMarketData', sortedFavoriteArray)
        },

        async sortByMarketCap({state, commit}) {
            let sortedArray = state.marketData.sort((a, b) => (a.market_cap_rank - b.market_cap_rank))
            commit('setMarketData', sortedArray)
            let sortedFavoriteArray = state.favoriteMarketData.sort((a, b) => (a.market_cap_rank - b.market_cap_rank))
            commit('setFavoriteMarketData', sortedFavoriteArray)

        },

        async sortByGainer({state, commit}) {
            let sortedArray = state.marketData.sort((a, b) => (b.price_change_percentage_24h - a.price_change_percentage_24h))
            commit('setMarketData', sortedArray)
            let sortedFavoriteArray = state.favoriteMarketData.sort((a, b) => (b.price_change_percentage_24h - a.price_change_percentage_24h))
            commit('setFavoriteMarketData', sortedFavoriteArray)
        },

        async sortByLoser({state, commit}) {
            let sortedArray = state.marketData.sort((a, b) => (a.price_change_percentage_24h - b.price_change_percentage_24h))
            commit('setMarketData', sortedArray)
            let sortedFavoriteArray = state.favoriteMarketData.sort((a, b) => (a.price_change_percentage_24h - b.price_change_percentage_24h))
            commit('setFavoriteMarketData', sortedFavoriteArray)
        },

    }
    
})
