import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

const state = {
  terminalGroups: [],
  terminalGroup: {
    name: '',
    parentid: 0
  }
}

const mutations = {
  // SET_TERMINAL_GROUP(state, terminalGroups) {
  //   state.terminalGroups = terminalGroups
  // },
  // CREATE_NEW_TERMINAL_GROUP(state, newTerminal) {
  //   state.terminalTree.push(newTerminal)
  // },
  // tmnTreeFDUpdate(state, newV) {
  //   state.terminalTreeFormData.name = newV
  // }
}

const actions = {
  // increment({ commit }) {
  //   commit('increment')
  // },
  // async getTerminalGroups({ commit, state }) {
  //   let terminalGroups = await axios.get('/web/groups')
  //   commit('SET_TERMINAL_GROUP', terminalGroups.data)
  // },
  // async terminalTreeDialog({ commit, state }) {
  //   let newTerminal = await axios.post('/web/terminal/group', state.terminalTreeFormData)
  //   commit('appendNewTerminal', newTerminal.data)
  // }
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
})

export default store
