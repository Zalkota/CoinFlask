import Vue from 'vue'
import Vuex from 'vuex'
import CoinGecko from 'coingecko-api'
const coinGeckoClient = new CoinGecko();
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        marketData: [],
        favoriteMarketData: [],
        favoriteArray: [],
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

        getCurrencySymbol: state => state.currencySymbol,

        getSpinnerBoolean: state => state.showSpinner,

        getNetworkErrorBoolean: state => state.networkError,

        getSearchQuery: state => state.searchQuery,

        getSearchResults: state => state.searchResults
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
            state.currencySymbol = payload;
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



        async setSearchResults({state, commit, dispatch}){
            state.searchResults = []
            if (state.searchQuery && state.searchQuery.length > 0){
                var searchId = state.marketData.filter(x => state.searchQuery.includes(x.id.toLowerCase()))

                if (searchId[0] != undefined){
                    commit('setSearchResults', searchId[0])
                }
                console.log("push results", state.searchResults[0])
            } else {
                commit('setSearchResults', [])
                console.log("state.searchResults", state.searchResults)
            }
        },


        async setMarketData({state, commit, dispatch}) {

            try {
                commit('setShowSpinner', true)
                var result = await coinGeckoClient.coins.markets(state.marketParameters)
                console.log("marketData: ", state.marketData)
                // var result = []

            } catch (err) {

                // show stored market data
                if (state.marketData.length > 0) {
                    commit('setShowSpinner', false)
                } else {
                    // show error message
                    console.error(err);
                    commit('setNetworkError', true)
                    commit('setShowSpinner', false)
                }

            } finally {
                // hide spinner
                if (state.marketData.length > 0 || result.data.length > 0) {
                    commit('setMarketData', result.data)
                }
                commit('setShowSpinner', false)
                console.log("state.searchResults", state.searchResults)

            }

        },

        async refreshMarketData({state, commit, dispatch}) {
            try {
                var result = await coinGeckoClient.coins.markets(state.marketParameters)
            } catch (err) {
                if (state.marketData.length > 0) {
                } else {
                    // show error message
                    console.error(err);
                    commit('setNetworkError', true)
                }
            } finally {
                if (state.marketData.length > 0 || result.data.length > 0) {
                    commit('setMarketData', result.data)
                }
            }
        },

        async sortByPrice({state, commit, dispatch}) {
            let sortedArray = state.marketData.sort((a, b) => (b.current_price - a.current_price))
            commit('setMarketData', sortedArray)
            let sortedFavoriteArray = state.favoriteMarketData.sort((a, b) => (b.current_price - a.current_price))
            commit('setFavoriteMarketData', sortedFavoriteArray)
        },

        async sortByMarketCap({state, commit, dispatch}) {
            let sortedArray = state.marketData.sort((a, b) => (a.market_cap_rank - b.market_cap_rank))
            commit('setMarketData', sortedArray)
            let sortedFavoriteArray = state.favoriteMarketData.sort((a, b) => (a.market_cap_rank - b.market_cap_rank))
            commit('setFavoriteMarketData', sortedFavoriteArray)

        },

        async sortByGainer({state, commit, dispatch}) {
            let sortedArray = state.marketData.sort((a, b) => (b.price_change_percentage_24h - a.price_change_percentage_24h))
            commit('setMarketData', sortedArray)
            let sortedFavoriteArray = state.favoriteMarketData.sort((a, b) => (b.price_change_percentage_24h - a.price_change_percentage_24h))
            commit('setFavoriteMarketData', sortedFavoriteArray)
        },

        async sortByLoser({state, commit, dispatch}) {
            let sortedArray = state.marketData.sort((a, b) => (a.price_change_percentage_24h - b.price_change_percentage_24h))
            commit('setMarketData', sortedArray)
            let sortedFavoriteArray = state.favoriteMarketData.sort((a, b) => (a.price_change_percentage_24h - b.price_change_percentage_24h))
            commit('setFavoriteMarketData', sortedFavoriteArray)
        },

    },
    modules: {
    }
})
