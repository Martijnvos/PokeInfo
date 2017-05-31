<template>
  <div class="pokemon_info_layout" v-show="showContentState">
    <pokemon-basic-info></pokemon-basic-info>              
    <pokemon-types-abilities></pokemon-types-abilities>
    <pokemon-info-collapsible></pokemon-info-collapsible>
  </div>
</template>

<script>
export default {
  computed: {
    showContentState() {
      return this.$store.state.showContentState
    }
  }
}

</script>