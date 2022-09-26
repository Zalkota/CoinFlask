<template>
  <div class="p-1 rounded-md bg-gray-200 border border-gray-300 text-sm">
    <button v-for="item in inputData" v-on:click="variableSelectionEvent(item.value)" :class="variableSelection == item.value ?  `bg-white text-gray-800 font-bold py-1 px-4 mr-1 rounded-md font-sm border border-gray-200` : `text-gray-600 font-bold py-1 px-4 mr-1 rounded-md`">
    {{ item.display }}
    </button>
  </div>  
</template>
<script>

export default {
  name: 'buttonSelector',
  data() {
    return {
      variableSelection: this.inputData[0].value,
    }
  },
  props: {
    inputData: []
  },
  methods: {
    // Run update when the variable changes 
    variableSelectionEvent(payload) { 
      this.variableSelection = payload
      this.$emit('variableSelectionEvent', payload )
      console.log('payload', payload)
    }
  }

}
</script>
