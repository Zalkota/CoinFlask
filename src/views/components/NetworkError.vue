<template>

    <div class="text-center container shadow-md bg-gray-900 rounded-xl mx-auto lg:mt-24 lg:mb-40 border-4 border-red-400"  style="max-width: 500px;">
      <div class="font-bold text-lg md:text-xl lg:text-2xl font-heading text-red-400 p-6 py-8 sm:px-6 lg:px-10">
          <img class="block h-16 w-auto mx-auto mb-4" src="@/assets/images/networkError.svg" alt="Error icon" />
         <h3 class="uppercase">Network Error Detected</h3>
      </div>
    </div>

</template>
<script>


export default {
  name: 'NetworkError',
}
</script>
