
// user { codigoEmpresa: <codigoEmpresa>, codigoPersona: <codigoPersona>, nombrePersona: <nombrePersona>, generoPersona:<generoPersona>,  sucursal:{id: <id>, nombre: <nombre>}, subsucursal:{id: <id>, nombre: <nombre>}, perfil:{id: <id>, nombre: <nombre>} }
const state = {
  isInitialized: false,
  user: null,
  loading: false,
  path: "/"
}

const mutations = {
  init: (state, user) => {
    state.user = user
    state.isInitialized = true
  },
  remove: (state) => {
    state.user = null
    state.loading = false
    state.isInitialized = false
  }, 
  startLoading: (state) => {
    state.loading = true
  },
  stopLoading: (state) => {
    state.loading = false
  },
  setPath: (state, path) => {
    state.path = path
  }
}

const getters = {
  USER_isInitialized: (state) => {
    return state.isInitialized
  },
  USER_getUser: (state) => {
    return state.user
  },
  USER_getLoading: (state) => {
    return state.loading
  },
  USER_getPath: (state) => {
    return state.path
  }  
}

const actions = {
  USER_init: (state, user) => {
    state.commit('init', user)
  },
  USER_remove: (state) => {
    state.commit('remove')
  },
  USER_startLoading: (state) => {
    state.commit('startLoading')
  },
  USER_stopLoading: (state) => {
    state.commit('stopLoading')
  },
  USER_setPath: (state, path) => {
    state.commit('setPath', path)
  }
}

export default {
  state, getters, mutations, actions
}