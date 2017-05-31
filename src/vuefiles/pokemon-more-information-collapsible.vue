<template>
  <ul class="collapsible" data-collapsible="accordion">

    <li class="stats_information_collapsible">
      <div class="collapsible-header">
        <i class="material-icons">trending_up</i>Stats
      </div>
      <div class="collapsible-body">
        <table v-if="stats != ''">
          <thead>
            <tr>
              <th>Stat name</th>
              <th>Base stat</th>
              <th>Stat effort</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="stat_information in stats">
              <td>{{stat_information.stat.name | removeDashes | capitalize}}</td>
              <td>{{stat_information.base_stat}}</td>
              <td>{{stat_information.effort}}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>Sorry, there is no stat information available right now :(</p>
      </div>
    </li> <!-- Stats information collapsible item -->

    <li class="moves_information_collapsible">
      <div class="collapsible-header">
        <i class="material-icons">new_releases</i>Moves
      </div>
      <div class="collapsible-body">
        <ul class="collection" v-if="moves != ''">
          <li class="collection-item" v-for="move in moves">{{move.move.name | removeDashes | capitalize}}</li>
        </ul>
        <p v-else>Sorry, move information could not be retrieved :(</p>
      </div>
    </li> <!-- Stats information collapsible item -->

    <li class="encounter_information_collapsible">
      <div class="collapsible-header">
        <i class="material-icons">location_on</i>Encounter information
      </div>
      <div class="collapsible-body">
        <div id="encounter_details_grid_component" v-if="location_info != ''">
          <div v-for="entry in location_info">
            <h5>{{entry.location_area.name | capitalize | removeDashes}}</h5>
            <table>
              <thead> <!-- Headings of table -->
                <tr> 
                  <th data-field="chance">Chance</th>
                  <th data-field="min_level">Min Level</th>
                  <th data-field="max_level">Max Level</th>
                  <th data-field="method">Method</th>
                  <th data-field="game_version">Game Version</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="version_details_entry in entry.version_details">
                  <td>
                    <!-- Table for multiple chance values in encounter_details array  -->
                    <table>
                      <tr v-for="encounter_detail in version_details_entry.encounter_details">
                        <td>{{encounter_detail.chance}}</td> 
                      </tr>
                    </table>
                  </td>
                  <td>
                    <!-- Table for multiple min level values in encounter_details array  -->
                    <table>
                      <tr v-for="encounter_detail in version_details_entry.encounter_details">
                        <td>{{encounter_detail.min_level}}</td>
                      </tr>
                    </table>
                  </td>
                  <td>
                    <!-- Table for multiple max level values in encounter_details array  -->
                    <table>
                      <tr v-for="encounter_detail in version_details_entry.encounter_details">
                        <td>{{encounter_detail.max_level}}</td>
                      </tr>
                    </table>
                  </td>
                  <td>
                    <!-- Table for multiple encounter method values in encounter_details array  -->
                    <table>
                      <tr v-for="encounter_detail in version_details_entry.encounter_details">
                        <td>{{encounter_detail.method.name | capitalize}}</td>
                      </tr>
                    </table>
                  </td>
                  <td>Pokémon {{version_details_entry.version.name | capitalize}}</td>
                </tr>
              </tbody>
            </table>
            <hr class="table_break_line"> <!-- Breaking line between every table -->
          </div>
        </div> <!-- Encounter location tables div -->
        <p v-else-if="location_info == ''">You cannot catch this pokémon in the wild</p>
        <p v-else>Sorry, there is no encounter information available :(</p>
      </div> <!-- Collapsible body -->
    </li> <!-- Encounter information collapsible item -->

    <li class="game_indices_information_collapsible">
      <div class="collapsible-header">
        <i class="material-icons">format_list_numbered</i>Game indices
      </div>
      <div class="collapsible-body">
        <table v-if="game_indices != ''">
          <thead>
            <tr>
              <th>Game index</th>
              <th>Game name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="game_index_info in game_indices">
              <td>{{game_index_info.game_index}}</td>
              <td>{{game_index_info.version.name | removeDashes | capitalize}}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>Sorry, no indices could be found right now :(</p>
      </div>
    </li> <!-- Game indices information collapsible item -->

  </ul> <!-- Collapsible list -->
</template>

<script>
  export default {
    watch: {
      name() {
        this.stats = ''
        this.moves = ''
        this.game_indices = ''
        this.location_info = ''
      }
    },
    computed: {
      location_info() {
        return this.$store.state.locationInfo
      },
      stats() {
        return this.$store.state.overallInfo.stats
      },
      moves() {
        return this.$store.state.overallInfo.moves
      },
      game_indices() {
        return this.$store.state.overallInfo.game_indices
      }
    }
  }
</script>

<style>
  
</style>