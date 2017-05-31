<template>
	<div>
		<h1 class="center-align">PokéInfo</h1>
		<p class="center-align">Please fill in the name of the Pokémon to get its detailed stats</p>
		<div class="container">
		  <input type="text" class="form-control" placeholder="Pokémon name" v-model="name">
		  <div v-show="progressbarVisibilityState" id="progressbar" class="progress">
		      <div class="indeterminate"></div>
		  </div>
		  <span>{{searching}}</span>

      <div v-show="!showContentState" class="circle responsive-image">
        <p>Most popular searches</p>
        <div class="row center-align">
          <div v-for="singlePokemon in pokemon" class="col s4 m4 l4">
            <a @click="redirectToPopularPokemon(singlePokemon)">
              <img :src="singlePokemon.spriteLocation" class="popular_pokemon_img">
            </a>
          </div>
        </div>
      </div>
    
		  <pokemon-info-layout></pokemon-info-layout> <!-- Pokémon info layout -->           
		</div> <!-- Container pokémon info + input field -->
	</div>
</template>

<script>
import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'

Vue.use(VueFire)

var Firebaseconfig = {
    apiKey: "AIzaSyDvaTJuINJd_f3r3nCsWY6xVsTwHV3UjtI",
    authDomain: "pokeinfo-167ed.firebaseapp.com",
    databaseURL: "https://pokeinfo-167ed.firebaseio.com",
    storageBucket: "pokeinfo-167ed.appspot.com"
};
Firebase.initializeApp(Firebaseconfig);

var database = Firebase.database();
var pokemonInfo = database.ref('pokemon')

export default {
  firebase: {
    pokemon: pokemonInfo.orderByChild('searchAmount').limitToLast(3)
  },
  data () {
    return {
      searching: '',
      name: '',
      spriteLink: ''
    }
  },
  watch: {
    name: _.debounce(function() {
      if (this.name != '') {
        this.lookupPokemonInformation()
      } else {
        this.searching = ''
        this.hide()
      }
    }, 1000),
    showContentState: function() {
      if($("#card_piece").css('margin-top') != "35px") {
        $("#card_piece").css('margin-top', '35px')
      } else {
        $("#card_piece").css('margin-top', '30vh')
      }
    }
  },
  computed: {
  	progressbarVisibilityState() {
  		return this.$store.state.progressbarVisibilityState
  	},
    showContentState() {
      return this.$store.state.showContentState
    }
  },
  methods: {
    lookupPokemonInformation: function() {
      var app = this
      app.$store.state.name = app.name
      app.hide();
      app.searching = "Looking through pokedex..."

      this.$store.state.progressbarVisibilityState = true

      axios.get('https://pokeapi.co/api/v2/pokemon/' + app.name.toLowerCase())
            .then(function (response) {
              //Call for visibility to change to visible
              app.show()
              app.$store.state.overallInfo = response.data
              app.$store.state.locationInfoLink = response.data.location_area_encounters

              //Sla sprite locatie lokaal op voor gebruik bij popular pokemon
              app.spriteLink = response.data.sprites.front_default

              app.searching = ''
              app.$store.state.progressbarVisibilityState = false
            }).then(function (response) {
              axios.get('https://pokeapi.co' + app.$store.state.locationInfoLink)
                .then(function (response) {
                  app.$store.state.locationInfo = response.data
                  app.addPopularPokemon()
                })
                .catch(function (error) {
                  app.$store.state.progressbarVisibilityState = false
                })
            })
            .catch(function (error) {
              alert(error)
              app.searching = "Invalid name"
              app.$store.state.progressbarVisibilityState = false
              app.hide()
            })
    },
    show: function() {
      this.$store.state.showContentState = true;
    },
    hide: function() {
      this.$store.state.showContentState = false;
    },
    redirectToPopularPokemon: function(name) {
      this.name = _.capitalize(name['.key'])
    },
    addPopularPokemon: function() {
      var app = this

      if(app.name) {
        //Check if value already exists
        pokemonInfo.once("value", function(snapshot) {
            if (snapshot.hasChild(app.name.toLowerCase())){
              var searchAmount = snapshot.child(app.name.toLowerCase() + '/searchAmount').val()
              pokemonInfo.child(app.name.toLowerCase()).update({
                //Negative to make sure list descending,
                //Firebase automatically assumes you want ascending values with orderByChild
                searchAmount: searchAmount - 1
              })
            } else {
              pokemonInfo.child(app.name.toLowerCase()).set({
                searchAmount: -1,
                spriteLocation: app.spriteLink
              })
            }
        });
      }
      
    }
  }
}
</script>

<style>
  @font-face {
    font-family: "Pokemon Hollow";
    src: url("/fonts/Pokemon Hollow.ttf");
  }

  @font-face {
    font-family: "Pokemon Solid";
    src: url("/fonts/Pokemon Solid.ttf");
  }

  html {
    background: #f44336;
  }

  h1 {
    font-family: "Pokemon Solid";
    color: #ffcb05;
    text-shadow: -2.5px 0 #3c5aa6, 0 2.5px #3c5aa6, 2.5px 0 #3c5aa6, 0 -2.5px #3c5aa6;
  }

  #card_piece {
    margin-top: 15vh;
    transition: margin-top 0.75s;
  }

  @media (min-width:961px)  { 
    /*tablet, landscape iPad, lo-res laptops ands desktops  */
    #card_piece {
      margin-top: 20vh;
    }
  }

  .popular_pokemon_img:hover {
    cursor: pointer;
  }

  #app .form-control {
    margin-bottom: 20px;
  }

  input[type=text]:focus:not([readonly]) {
    border-bottom: 1px solid #f44336;
    box-shadow: 0 1px 0 0 #f44336;
  }

  /*Progressbar light background color*/
  .progress {
    background-color: #f9a19a;
  }

  /*Progressbar dark background color*/
  .progress .indeterminate {
    background-color: #f44336;
  }
</style>