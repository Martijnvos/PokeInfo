<template>
  <div class="row">
    <div class="col l6">
      <ul class="collection with-header">
        <li class="collection-header"><b>Types</b></li>
        <li class="collection-item" v-for="type in types">{{type.type.name | removeDashes | capitalize}}</li>
      </ul>
    </div>
    <div class="col l6">
      <ul class="collection with-header">
        <li class="collection-header"><b>Abilities</b></li>
        <li class="collection-item" v-for="ability in abilities">{{ability.ability.name |removeDashes | capitalize}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    watch: {
      name() {
        this.types = ''
        this.abilities = ''
      }
    },
    computed: {
      types() {
        return this.$store.state.overallInfo.types
      },
      abilities() {
        return this.$store.state.overallInfo.abilities
      }
    }
  }
</script>

<style>
  
</style>