<template>
  <div class="row pokemon_basic_info" v-show="showContentState">
    <div class="col l3">
      <div v-if="showContentState">
        <img :src="sprite"></img>
      </div>
    </div>
    
    <div class="col l9">
      <table>
        <thead>
          <tr>
            <th data-field="id">ID</th>
            <th data-field="base_experience">Base XP</th>
            <th data-field="height">Height</th>
            <th data-field="weight">Weight</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{{id}}</td>
            <td>{{base_experience}}</td>
            <td>{{height}}</td>
            <td>{{weight}}</td>
          </tr>
        </tbody>
      </table>
    </div> <!-- ID, Base XP, Height, Weight table -->
  </div>
</template>

<script>
    export default {
      computed: {
        showContentState() {
          return this.$store.state.showContentState
        },
        sprite() {
          return this.$store.state.overallInfo.sprites.front_default
        },
        id() {
          return this.$store.state.overallInfo.id
        },
        base_experience() {
          return this.$store.state.overallInfo.base_experience
        },
        height() {
          return this.$store.state.overallInfo.height
        },
        weight() {
          return this.$store.state.overallInfo.weight
        }
      }
    }
</script>

<style>
  
</style>