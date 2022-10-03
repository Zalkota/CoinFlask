import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default {
    state: {

        searchQuery: [],
        searchResults: [],

    },
    getters: {
        
        getSearchQuery: state => state.searchQuery,

        getSearchResults: state => state.searchResults,

    },
    mutations: {

        setSearchQuery(state, payload) {
            state.searchQuery = payload;
        },

        setSearchResults(state, payload) {

            state.searchResults.push(payload);
            console.log("setSearchResults", state.searchResults)
        },

    },
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


    },
    modules: {

    }
}
