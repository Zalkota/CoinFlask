<template>
    <nav role="navigation">
        <UpperNav
        :marketData = "marketData"
        :totalMarketCap = "totalMarketCap"
        :totalVolume = "totalVolume"
        />
        <div class="w-100 border-b border-t border-gray-300">
            <div class="container mx-auto">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="relative flex items-center justify-between h-20">
                        <div class="lg:flex-1  flex items-center justify-center sm:items-stretch sm:justify-start">
                          <div class="flex-shrink-0 flex items-center">
                               <router-link class="no-underline"  to="/">
                                    <img class="block h-12 w-auto hide" src="@/assets/images/navbar_logo_2.svg" alt="CoinFlask Logo" />
                                    <img class="block h-12 w-auto unhide" src="@/assets/images/navbar_logo_sm.svg" alt="CoinFlask Logo" />
                               </router-link>
                          </div>
                        </div>
                        <div class="flex-1 flex text-right justify-end">
                             <div class="flex rounded-xl">
                                   <SearchBar ref="searchBar"/>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>


<script>
import UpperNav from './UpperNav.vue';
import SearchBar from './SearchBar.vue';
export default {
  name: 'Navbar',
  props: ["marketData", "totalMarketCap", "totalVolume"],
  components: {UpperNav, SearchBar},
}
</script>
