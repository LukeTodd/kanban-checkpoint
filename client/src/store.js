import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: [],
    comments: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, data) {
      state.activeBoard = data
    },
    addList(state, data) {
      state.lists.push(data)
    },
    setList(state, data) {
      state.lists = data
    },
    addTask(state, data) {
      state.tasks.push(data)
    }
  },
  actions: {
    logout({ commit, dispatch }, payload) {
      auth.delete('logout')
        .then(res => {
          router.push({ name: 'login' })
        })
    },
    //#region -- AUTH STUFF --
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
        .catch(res => {
          router.push({ name: 'login' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    getActiveBoard({ commit, dispatch }, boardData) {

      api.get('boards/' + boardData._id)
        .then(res => {
          commit('setActiveBoard', res.data)
        })
    },
    //#endregion


    //#region -- LISTS --
    getLists({ commit, state }, boardId) {
      if (!boardId) {
        boardId = state.activeBoard._id
      }
      api.get('/boards/' + boardId + '/lists/')
        .then(res => {
          commit('setList', res.data)
        })
    },
    createList({ commit, state }, payload) {
      let boardId = state.activeBoard._id
      api.post('/boards/' + boardId + '/lists/', payload)
        .then(res => {
          commit('addList', res.data)
        })
    },
    deleteList({ dispatch, state }, listId) {
      let boardId = state.activeBoard._id
      api.delete('/boards/' + boardId + '/lists/' + listId)
        .then(res => {
          dispatch('getLists')
        })
    },
    //#endregion


    //#region --TASKS--
    createTask({ commit, state }, payload) {
      debugger
      api.post('/boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks', payload)
        .then(res => {
          commit('addTask', res.data)
        })
    }

    //#endregion


  }
})
