import axios from 'axios'

const URL_BASE='http://localhost:8080/tumi_backend'
const URL_MACHINE_CODE='http://localhost:9090/getUniqueKey'

const login = function (payload) {
  // payload = { usuario: <username>, contrasena: <password> }
  const URL = URL_BASE + '/login'
  return axios.post(URL, payload)
}

const validateSession = function (token) {
  const URL = URL_BASE + '/acceso/validateSession'
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  return axios.get(URL)
}

const logout = function (token) {
  const URL = URL_BASE + '/acceso/logout'
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  return axios.get(URL)
}

const getSucursalList = function (token) {
  const URL = URL_BASE + '/acceso/sucursal/list'
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  return axios.post(URL)
}

const getSubSucursalList = function (token, payload) {
  // payload = { codigoSucursal: <sucursal> }
  const URL = URL_BASE + '/acceso/subsucursal/list'
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  return axios.post(URL, payload)
}

const getPerfil = function (token) {
  const URL = URL_BASE + '/acceso/perfil/list'
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  return axios.post(URL)
}

const init = function (token, payload) {
  // payload = { codigoSucursal: <sucursal> }
  const URL = URL_BASE + '/acceso/init'
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  return axios.post(URL, payload)
}

const getUserMenu = function (token, payload) {
  // payload = { codPerfil: <codPerfil> }
  const URL = URL_BASE + '/usuario/menu/get'
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  return axios.post(URL, payload)
}

const refreshToken = function (token) {
  const URL = URL_BASE + '/refreshToken'
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  return axios.post(URL)                                                                                                                                                                                                                  
}

const validateInit = function (token, payload) {
  const URL = URL_BASE + '/acceso/validarIngreso'
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  return axios.post(URL, payload)
}

const getMachineCode = function () {
  return axios.get(URL_MACHINE_CODE)                                                                                                                                                       
}

export default {
  login, logout, validateSession, getSucursalList, getSubSucursalList, 
  getPerfil, init, getUserMenu, refreshToken, validateInit, getMachineCode
}
                                                                                                                  