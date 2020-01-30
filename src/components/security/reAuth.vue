<template>
<div id="reAuth">
  <b-modal ref="reAuthModal" hide-header hide-footer no-close-on-esc no-close-on-backdrop>
    <form @submit.prevent="reLogin">
      <div class="header">
        <div class="text-white">
          <i class="material-icons">perm_identity</i>
          <span>Validacion de Usuario</span>
        </div>
      </div>      
      <div class="body">
        <div>
          <div class="row">
            <div class="col-2 text-center"><img src="../../assets/warning.png" height="50px" width="50px"/></div>
            <div class="col-10 warningMessage">Session expiradada. Ingresar el password para habilitar una nueva session.</div>
          </div>
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
          <b-btn class="btn-app" @click="logout">Cancelar</b-btn>
        </div>
      </div>  
    </form>
  </b-modal>
</div>
</template>

<script>
import services from '@/services'

export default {
  name: 'reAuthCmpt',
  data () {
    return {
      credential: {
        password: null
      },
      errorMessage: null
    }
  },
  methods: {
    reLogin: function () {
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
        usuario: this.$store.getters.USER_getUser.sub, 
        contrasena: this.credential.password,
        codigoUnico: codigoUnico
      }
      services.login(payload)
        .then(response => {
          this.$store.dispatch('USER_stopLoading')
          this.$store.dispatch('AUTH_login', response.headers.authorization.split(' ')[1])
          this.$refs.reAuthModal.hide()         
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
    logout: function () {
      this.$refs.reAuthModal.hide()
      this.$store.dispatch('AUTH_logout')
      this.$router.push('/')
    },
  },
  mounted: function () {
    this.$refs.reAuthModal.show()
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

.mensaje {
  font: bold 95% sans-serif;
  padding-left: 0;
  color: #cd3436;
  display: flex;
  align-items: center;  
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

#reAuth .modal-body {
    padding: 0;
}

</style>
