import services from '@/services'
import IdleJs from 'idle-js'
import router from '@/router'

// jwt Payload { codigoPersona:<codigoPersona>, nombrePersona:<nombrePersona>, generoPersona:<generoPersona>, sessionTime:<sessionTime>, cambioClavePersona:<cambioClavePersona>, exp:<expiration> }
const state = {
  isAuthenticated: false,
  token: null,
  checkToken: null,
  sessionIddle: null
}

const mutations = {
  updateToken: (state, token) => {
    // localStorage.setItem('user-token', token);
    state.token = token
    state.isAuthenticated = true
  },
  removeToken: (state) => {
    // localStorage.removeItem('user-token');
    clearTimeout(state.checkToken);
    state.token = null
    state.isAuthenticated = false
    state.checkToken = null
    state.sessionIddle.settings.idle = 86400000
    state.sessionIddle.settings.keepTracking = false
  },
  setCheckToken: (state, checkToken) => {
    state.checkToken = checkToken
  },
  newSessionIdle: (state, sessionIddle) => {
    state.sessionIddle = sessionIddle
    state.sessionIddle.start()
  },
  configSessionIdle: (state, config) => {
    state.sessionIddle.settings.idle = config.idle
    state.sessionIddle.settings.keepTracking = config.keepTracking
  }
}

const getters = {
  AUTH_isAuthenticated: (state) => {
    return state.isAuthenticated
  },
  AUTH_getToken: (state) => {
    return state.token
  },
  AUTH_getTokenPayload: (state, getters) => {
    return getters.AUTH_getToken ? JSON.parse(atob(getters.AUTH_getToken.split('.')[1])) : null
  },
  AUTH_getTokenTimeLife: (state, getters) => {
    return getters.AUTH_getTokenPayload ? (getters.AUTH_getTokenPayload.exp - getters.AUTH_getTokenPayload.iat) * 1000 : null
  }
}

const actions = {
  AUTH_login: (state, token) => {
    state.dispatch('AUTH_refreshToken', token) 
    if(state.state.sessionIddle == null) {
      state.commit('newSessionIdle', new IdleJs({
        onIdle: function(){
          services.logout(state.getters.AUTH_getToken)
          state.commit('removeToken')
        },
        idle: state.getters.AUTH_getTokenTimeLife,
        keepTracking: true
      }))
    } else {
      state.commit('configSessionIdle', 
        { idle: state.getters.AUTH_getTokenTimeLife, keepTracking: true }
      )
    }
  },
  AUTH_logout: (state) => {
    state.commit('removeToken')
    state.dispatch('USER_remove')
  },
  AUTH_refreshToken: (state, token) => {
    state.commit('updateToken', token)
    state.commit('setCheckToken', setTimeout(function() {
      services.refreshToken(state.getters.AUTH_getToken)
        .then(response => {
          state.dispatch('AUTH_refreshToken', response.headers.authorization.split(' ')[1])
        })
        .catch(error => {
          console.log(error)
          state.dispatch('AUTH_logout')
          router.push('/')
        })
    }, state.getters.AUTH_getTokenTimeLife - 10000))
  }
}

export default {
  state, getters, mutations, actions
}
