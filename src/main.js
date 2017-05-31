import Vue from 'vue'
import { store } from './store.js'

import CardContent from './vuefiles/cardcontent.vue'
import PokemonInfoLayout from './vuefiles/pokemon-info-layout.vue'
import PokemonBasicInfo from './vuefiles/pokemon-basic-info.vue'
import PokomonInfoCollapsible from './vuefiles/pokemon-more-information-collapsible.vue'
import PokemonTypesAbilities from './vuefiles/pokemon-types-abilities.vue'

Vue.component('pokemon-info-layout', PokemonInfoLayout)
Vue.component('pokemon-basic-info', PokemonBasicInfo)
Vue.component('pokemon-info-collapsible', PokomonInfoCollapsible)
Vue.component('pokemon-types-abilities', PokemonTypesAbilities)

Vue.filter('capitalize', function(value) {
	if (!value) return ''
    value = _.upperFirst(value.toString())
    return value
})

Vue.filter('removeDashes', function(value) {
	if (!value) return ''
    value = value.toString()
    return value.replace(/-/g, ' ')
})

new Vue({
  el: '#card-content',
  store: store,
  render: h => h(CardContent)
})