<template>
    <div class="container mx-auto mt-2 lg:mt-10 mb-2 lg:mb-4  px-4 sm:px-6 lg:px-10">
        <ol class="list-reset flex no-underline">
            <li class="no-underline">
                <router-link class="text-green-400 hover:text-green-500 no-underline"  to="/">Coins</router-link>
            </li>
            <li><span class="text-green-400 mx-2 font-bold">></span></li>
            <li class="text-gray-500">{{ tokenName }}</li>
        </ol>
    </div>
        

</template>


<script>


export default {
  name: 'BreadCrumb',
  props: ["tokenName"]
}
</script>
