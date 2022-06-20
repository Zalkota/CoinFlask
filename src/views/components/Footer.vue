<template>


    <footer class="text-center lg:text-left bg-gray-900 text-gray-500 no-underline border-t-4 border-green-400">
        <div class="container mx-auto ">
            <div class="mx-6 py-10 text-center md:text-left">
              <div class="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h6 class="text-green-400 uppercase font-semibold mb-4 flex justify-center md:justify-start tracking-wider" style="font-family: Russo One;">
                      Explore
                  </h6>
                  <p class="mb-4">
                    <a href="https://www.coingecko.com/en/coins/bitcoin" target="_blank" class="text-gray-300 text-sm font-medium no-underline">Bitcoin Price</a>
                  </p>
                  <p class="mb-4">
                    <a href="https://www.coingecko.com/en/coins/ethereum" target="_blank" class="text-gray-300 text-sm font-medium no-underline">Ethereum Price</a>
                  </p>
                  <p class="mb-4">
                    <a href="https://www.coingecko.com/en/categories/decentralized-finance-defi" target="_blank" class="text-gray-300 text-sm font-medium no-underline">DeFi Coins</a>
                  </p>
                  <p class="mb-4">
                    <a href="https://www.coingecko.com/en/categories/metaverse" target="_blank" class="text-gray-300 text-sm font-medium no-underline">Metaverse Coins</a>
                  </p>
                </div>
                <div>
                  <h6 class="uppercase font-semibold mb-4 flex justify-center md:justify-start text-green-400 tracking-wider" style="font-family: Russo One;" >
                    Resources
                  </h6>

                  <p class="mb-4">
                    <a href="https://www.coingecko.com/en/derivatives" target="_blank" class="text-gray-300 text-sm font-medium no-underline">Perpetuals</a>
                  </p>
                  <p class="mb-4">
                    <a href="https://www.coingecko.com/en/news" target="_blank" class="text-gray-300 text-sm font-medium no-underline">Crypto News</a>
                  </p>
                  <p class="">
                    <a href="https://www.coingecko.com/en/public-companies-bitcoin" target="_blank" class="text-gray-300 text-sm font-medium no-underline">Bitcoin Treasury</a>
                  </p>

                </div>
                <div>
                  <h6 class="uppercase font-semibold mb-4 flex justify-center md:justify-start text-green-400 tracking-wider" style="font-family: Russo One;">
                    Community
                  </h6>
                  <p class="mb-4">
                    <a href="https://twitter.com/coingecko" target="_blank" class="text-gray-300 text-sm font-medium no-underline">Twitter</a>
                  </p>
                  <p class="mb-4">
                    <a href="https://t.me/coingecko" target="_blank" class="text-gray-300 text-sm font-medium no-underline">Telegram Chat</a>
                  </p>
                  <p class="mb-4">
                    <a href="https://t.me/coingeckonews" target="_blank" class="text-gray-300 text-sm font-medium no-underline">Telegram News</a>
                  </p>
                  <!-- <p>
                    <a href="#!" class="text-gray-300 text-sm font-medium no-underline">Help</a>
                  </p> -->
                </div>
                <div>
                  <h6 class="
                      uppercase
                      font-semibold
                      text-green-400
                      tracking-wider
                      mb-4
                      flex
                      items-center
                      justify-center
                      md:justify-start
                    " style="font-family: Russo One;">
                    CoinFlask, Inc.
                  </h6>
                  <p class="text-gray-500 font-medium no-underline text-sm">
                    CoinFlask provides a highly accurate and streamlined visualization of the CryptoCurrency Markets.
                    Sign up for our morning-flask daily report, where we track community growth, market capitilization, open-source code development and upcoming events.
                    We strive to keep you at the forefront of Crypto.
                  </p>
                </div>
              </div>
            </div>


            <div class="flex justify-center items-center lg:justify-between p-6 border-t border-gray-700">
              <div class="mr-12 hidden lg:block text-md text-gray-500 font-medium no-underline text-sm">
                <span>© 2022 CoinFlask, All rights reserved. Developed by <span class="text-green-400">Jukabo</span> </span>
              </div>

              <SocialRow/>

            </div>
        </div>
      </footer>

</template>
<script>
import SocialRow from './SocialRow.vue';
export default {
  name: 'Footer',
  props: [],
  components: {SocialRow},
}
</script>
