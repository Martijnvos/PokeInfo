import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		overallInfo: '',
		locationInfo: '',
		locationInfoLink: '',
		showContentState: false,
		progressbarVisibilityState: false
	}
})