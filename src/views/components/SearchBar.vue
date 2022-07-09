<template>
    <div >
        <form @submit.prevent="onSubmit" class="text-sm">
            <input data-cy="searchBar" v-model="query" type="text" class="px-5 py-3 w-96 outline-none bg-gray-100 rounded-3xl border border-gray-300" placeholder="Search by name or symbol">
        </form>
    </div>
</template>


<script>
    export default {
    name: 'SearchBar',
    data() {
        return {
            query: null
        }
    },
    methods: {
         onSubmit(){
            this.query = escape(this.query)

            if (this.$route.params.query != this.query) {
                //Send user to search.vue
                this.onSearchCallback(this.query)
            }

            //trigger fetchSearchResults
            this.$store.commit('setSearchQuery', this.query)

         },
         setInitialQuery(newQuery){
             this.query = newQuery
         },

         onSearchCallback(query){
                 this.$router.push({ path: '/search/'.concat( query)  } )
             },
         }
    }
</script>
