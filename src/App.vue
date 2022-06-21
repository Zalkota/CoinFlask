<template>
  <div id="app" class="antialiased text-gray-900 text-lg font-medium  min-h-screen" style="">
    <router-view class="" style=""/>

  </div>
</template>
<script>
    export default {
        mounted() {
            this.$store.dispatch("setMarketData");
            console.log("setMarketData")

            window.setInterval(() => {
                this.$store.dispatch("refreshMarketData");
                console.log("refreshMarketData")
            }, 3000)

        }
    }
</script>
