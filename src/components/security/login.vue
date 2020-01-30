<template>
  <div id="login" v-if="isValidLogin">
    <loading-app v-if="this.$store.getters.USER_getLoading"/>
    
    <!-- Modal Login Component -->
    <b-modal ref="loginModal" hide-header hide-footer no-close-on-esc no-close-on-backdrop>
      <form @submit.prevent="login">
        <div class="header">
          <div class="text-white">
            <i class="material-icons">perm_identity</i>
            <span>Ingreso de Usuario</span>
          </div>
        </div>      
        <div class="body">
          <div align="center">
            <img src="../../assets/logo_header.png" height="80%" width="80%"/>
          </div>
          <br/>
          <div>
            <label>Usuario</label>
            <b-input-group>
              <b-input-group-prepend is-text>
                <i class="material-icons">person</i>
              </b-input-group-prepend>
              <b-form-input required v-model="credential.username" type="text" />
            </b-input-group>
            <label>Password</label>
            <b-input-group>
              <b-input-group-prepend is-text>
                <i class="material-icons">vpn_key</i>
              </b-input-group-prepend>            
              <b-form-input required v-model="credential.password" type="password" />
            </b-input-group>
          </div>
          <div class="row nomarging errorDiv" v-if="this.errorMessage">
            <div class="col-2 text-center nopadding"><img src="../../assets/error.png" height="40px" width="40px"/></div>
            <div class="col-10 nopadding errorMessage">{{errorMessage}}</div>
          </div>
        </div>
        <hr/>
        <div class="footer">
          <div align="right">
            <b-button type="submit" class="btn btn-app">Acceder</b-button>
            <b-btn class="btn-app" @click="cancelLogin">Cancelar</b-btn>
          </div>
        </div>  
      </form>
    </b-modal>

  <!-- Modal User Component -->
    <b-modal ref="userModal" hide-header hide-footer no-close-on-esc no-close-on-backdrop>
      <form @submit.prevent="init">
        <div class="header">
          <div class="text-white">
            <i class="material-icons">perm_identity</i>
            <span>Ingreso de Usuario</span>
          </div>
        </div>   
        <div class="body">
          <div>
            <label>Sucursal</label>
            <b-form-select required v-model="sucursal" :options="sucursalList" @change="setSubSucursalList" class="mb-3" />            
            <label>Subsucursal</label>
            <b-form-select required v-model="subSucursal" :options="subSucursalList" class="mb-3" />
            <label>Perfil</label>
            <b-form-select required v-model="perfil" :options="perfilList"  />
          </div>
          <div class="row nomarging errorDiv" v-if="this.errorMessage">
            <div class="col-2 text-center nopadding"><img src="../../assets/error.png" height="40px" width="40px"/></div>
            <div class="col-10 nopadding errorMessage">{{errorMessage}}</div>
          </div>          
        </div>
        <hr/>
        <div class="footer">
          <div align="right">
            <b-button type="submit" class="btn btn-app">Acceder</b-button>
            <b-btn class="btn-app" @click="logout">Cancelar</b-btn>
          </div>
        </div>
      </form>
    </b-modal>

  <!-- Modal Validate Session -->
    <b-modal ref="sessionModal" hide-header hide-footer no-close-on-esc no-close-on-backdrop>
      <form @submit.prevent="goInit">
        <div class="header">
          <div class="text-white">
            <i class="material-icons">perm_identity</i>
            <span>Ingreso de Usuario</span>
          </div>
        </div>   
        <div class="body">
          <div>
            <div class="row">
              <div class="col-2 text-center"><img src="../../assets/warning.png" height="50px" width="50px"/></div>
              <div class="col-10 warningMessage">El usuario tiene una sessión activa en el sistema. Desea cerrar la session y acceder ?</div>
            </div>
          </div>
          <div class="row nomarging errorDiv" v-if="this.errorMessage">
            <div class="col-2 text-center nopadding"><img src="../../assets/error.png" height="40px" width="40px"/></div>
            <div class="col-10 nopadding errorMessage">{{errorMessage}}</div>
          </div>          
        </div>
        <hr/>
        <div class="footer">
          <div align="right">
            <b-button type="submit" class="btn btn-app">Acceder</b-button>
            <b-btn class="btn-app" @click="logout">Cancelar</b-btn>
          </div>
        </div>
      </form>
    </b-modal> 

  <!-- Modal Warning Login -->
    <b-modal ref="warningModal" hide-header hide-footer no-close-on-esc no-close-on-backdrop>
        <div class="header">
          <div class="text-white">
            <i class="material-icons">perm_identity</i>
            <span>Ingreso de Usuario</span>
          </div>
        </div>   
        <div class="body">
          <div>
            <div class="row">
              <div class="col-2 text-center"><img src="../../assets/warning.png" height="50px" width="50px"/></div>
              <div class="col-10 warningMessage">{{warningMessage}}</div>
            </div>
          </div>         
        </div>
        <hr/>
        <div class="footer">
          <div align="right">
            <b-btn class="btn-app" @click="validateSession()">Aceptar</b-btn>
          </div>
        </div>
    </b-modal>       
    
  </div>
</template>

<script>
import loading from '@/components/lib/loading'
import services from '@/services'

export default {
  name: 'loginCmpt',
  components: {
    'loading-app': loading
  },  
  data () {
    return {
      credential: {
        username: null,
        password: null
      },
      sucursalList: [],
      subSucursalList: [],
      perfilList: [],
      sucursal: null,
      subSucursal: null,
      perfil: null,
      errorMessage: null,
      warningMessage: null,
      isLoged: false
    }
  },
  methods: {
    login: function () {
      this.errorMessage = null
      this.$store.dispatch('USER_startLoading')
      services.getMachineCode()
        .then(response => {
          this.$store.dispatch('USER_stopLoading')
          this.loginInternal(response.data.data)
        })
        .catch(error => {
          this.$store.dispatch('USER_stopLoading')
          this.loginInternal('')
        })
    },
    loginInternal: function(codigoUnico) {
      const payload = {
        usuario: this.credential.username, 
        contrasena: this.credential.password,
        codigoUnico: codigoUnico
      }
      this.$store.dispatch('USER_startLoading')
      services.login(payload)
        .then(response => {
          this.$store.dispatch('USER_stopLoading')
          this.$store.dispatch('AUTH_login', response.headers.authorization.split(' ')[1])
          this.isLoged = true
          if(response.data.data == 'OK') {
            this.validateSession()
          } else {
            this.warningMessage = response.data.data
            this.$refs.loginModal.hide() 
            this.$refs.warningModal.show()
          }
        })
        .catch(error => {
          this.$store.dispatch('USER_stopLoading')
          if(error.response && error.response.status == 401) {
            this.errorMessage = error.response.data.message
          } else {
            this.errorMessage = "Se presento un problema en la respuesta o conexion con el servidor."
          }
        })
    },
    validateSession: function() {
      this.$store.dispatch('USER_startLoading')
      services.validateSession(this.$store.getters.AUTH_getToken)
        .then(response => {
          this.$store.dispatch('USER_stopLoading')
          if(response.data.success) {
            if(response.data.data == 2) {
              this.setSucursalList()
              this.setPerfilList()
              this.$refs.userModal.show()
            } else {
              this.$refs.sessionModal.show()
            }
          } else {
            this.errorMessage = response.data.message
          }
        })
        .catch(error => {
          this.$store.dispatch('USER_stopLoading')
          this.errorMessage = "Se presento un problema en la respuesta o conexion con el servidor."
          console.log(error)
        })
    },
    goInit: function() {
      services.logout(this.$store.getters.AUTH_getToken)
      this.setSucursalList()
      this.setPerfilList()      
      this.$refs.sessionModal.hide()
      this.$refs.userModal.show()                
    },
    init: function () {
      this.$store.dispatch('USER_startLoading')
      const payload = {
        codigoSucursal: this.sucursal.id,
        codigoTipoSucursal: this.sucursal.tipo,
        codigoSubSucursal: this.subSucursal.id
      }
      services.validateInit(this.$store.getters.AUTH_getToken, payload)
        .then(response => {
          this.$store.dispatch('USER_stopLoading')
          if(response.data.success) {
            this.$store.dispatch('USER_startLoading')
            const payload = {
              codigoSucursal: this.sucursal.id
            }            
            services.init(this.$store.getters.AUTH_getToken, payload)
              .then(response => {
                this.$store.dispatch('USER_stopLoading')
                if(response.data.success) {
                  const payload = {
                    sub: this.$store.getters.AUTH_getTokenPayload.sub,
                    codigoPersona: this.$store.getters.AUTH_getTokenPayload.codigoPersona, 
                    nombrePersona: this.$store.getters.AUTH_getTokenPayload.nombrePersona,
                    generoPersona: this.$store.getters.AUTH_getTokenPayload.generoPersona,
                    cambioClavePersona: this.$store.getters.AUTH_getTokenPayload.cambioClavePersona,
                    sucursal: this.sucursal, 
                    subSucursal: this.subSucursal, 
                    perfil: this.perfil
                  }
                  this.$store.dispatch('USER_init', payload)
                  this.$refs.userModal.hide()
                  this.$router.push('/home')
                } else {
                  this.errorMessage = response.data.message
                }
              })
              .catch(error => {
                this.$store.dispatch('USER_stopLoading')
                this.errorMessage = "Se presento un problema en la respuesta o conexion con el servidor."
                console.log(error)
              })
          } else {
            this.errorMessage = response.data.message
          }
        })
        .catch(error => {
          this.$store.dispatch('USER_stopLoading')
          this.errorMessage = "Se presento un problema en la respuesta o conexion con el servidor."
          console.log(error)
        })
    },
    logout: function () {
      this.$refs.userModal.hide()
      this.$store.dispatch('AUTH_logout')
      this.$router.go()   
    },
    cancelLogin: function () {
      this.$refs.loginModal.hide()
      this.$router.go()
    },
    setSucursalList: function () {
      this.$store.dispatch('USER_startLoading')
      services.getSucursalList(this.$store.getters.AUTH_getToken)
        .then(response => {
          this.$store.dispatch('USER_stopLoading')
          if(response.data.success) {
            response.data.data.forEach(sucursal => {
              this.sucursalList.push({value: sucursal, text: sucursal.nombre})
            });
            this.sucursal = this.sucursalList[0].value
            this.setSubSucursalList()
          } else {
            this.errorMessage = response.data.message
          }
        })
        .catch(error => {
          this.$store.dispatch('USER_stopLoading')
          this.errorMessage = "Se presento un problema en la respuesta o conexion con el servidor."
          console.log(error)
        })      
    },
    setSubSucursalList: function () {
      setTimeout(() => {
        this.$store.dispatch('USER_startLoading')
        const payload = {
          codigoSucursal: this.sucursal.id
        }
        services.getSubSucursalList(this.$store.getters.AUTH_getToken, payload)
          .then(response => {
            this.$store.dispatch('USER_stopLoading')
            this.subSucursalList = []
            if(response.data.success) {
              response.data.data.forEach(subSucursal => {
                this.subSucursalList.push({value: subSucursal, text: subSucursal.nombre})
              });
              this.subSucursal = this.subSucursalList[0].value
            } else {
              this.errorMessage = response.data.message
            }
          })
          .catch(error => {
            this.$store.dispatch('USER_stopLoading')
            this.errorMessage = "Se presento un problema en la respuesta o conexion con el servidor."
            console.log(error)
          })
      }, 50);  
    },    
    setPerfilList: function () {
        services.getPerfil(this.$store.getters.AUTH_getToken)
          .then(response => {
            if(response.data.success) {
              response.data.data.forEach(perfil => {
                this.perfilList.push({value: perfil, text: perfil.nombre})
              });
              this.perfil = this.perfilList[0].value
            } else {
              this.errorMessage = response.data.message
            }
          })
          .catch(error => {
            this.errorMessage = "Se presento un problema en la respuesta o conexion con el servidor."
            console.log(error)
          })      
      }
  },
  mounted: function () {
    this.$refs.loginModal.show()
  },
  computed: {
    isValidLogin() {
      if(this.isLoged){
        if(!this.$store.getters.AUTH_isAuthenticated) {
          this.$router.go()
        } 
      } 
      return true;
    }
  }
}
</script>

<style scoped>

hr {
  margin: 0;
}

.header {
  position:relative;
  background-color:#4273AD;
  height: 1.8rem;
}

.header span {
  font: bold 90% sans-serif;  
  position:absolute;
  padding: 0.4rem;
  padding-left: 0.2rem;
}

.body {
  padding: 1rem;
}

.body label {
  font: bold 95% sans-serif;
  color: #404040e6;
  margin-top: 0.5rem;
  margin-bottom: 0;  
}

.footer {
  background-color: #f5f3ff;
  padding: 1rem;
}

.btn-app {
  background-color: #2e75b6;
  border: 1px solid #41719c;
  font-family: verdana;
  color: #ffffff;
}

.btn-app:hover {
    background-color: #ed7d31;
    border-color: #507e32;
}

.errorDiv {
  padding-top: 1rem;
  display: flex;
  align-items: center;  
}

.errorMessage {
  font: bold 95% sans-serif;
  color: #cd3436;
}

.warningMessage {
  font: bold 95% sans-serif;
  color: #eb7835;
}

</style>

<style>

#login .modal-body {
    padding: 0;
}

</style>
