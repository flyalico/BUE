<template>
<div class="row nomarging">
  <div class="col nopadding">
    <div class="row nomarging header">
        <div class="col-3 nopadding">
          <div class="container logo">
            <a href="#/home"><img @click="collapseMenu()" src="../../assets/logo_header.png" height="65" width="230"/></a>
          </div>
        </div>
        <div class="col-5 nopadding " >
          <div class="container">
            <div class="row nomarging path">
              {{this.$store.getters.USER_getPath}}
            </div>
            <div class="row nomarging">
              <div class="book-15"><a target="_blank" href="http://www.google.com"><img v-b-tooltip.hover title="Estado de Cuenta" src="../../assets/lectura.png" height="40" width="40"/></a></div>
              <div class="book-15"><a target="_blank" href="http://www.google.com"><img v-b-tooltip.hover title="Control de Tiempos" src="../../assets/control_tiempo.png" height="40" width="40"/></a></div>
              <div class="book-15"><a target="_blank" href="http://www.google.com"><img v-b-tooltip.hover title="OneDrive" src="../../assets/onedrive.png" height="40" width="40"/></a></div>
              <div class="book-15"><a target="_blank" href="http://www.google.com"><img v-b-tooltip.hover title="Correo" src="../../assets/correo.png" height="40" width="40"/></a></div>
              <div class="book-20"><a target="_blank" href="http://www.google.com"><img v-b-tooltip.hover title="OfiAsis" src="../../assets/ofiasis.png" height="24" width="86"/></a></div>
              <div class="book"></div>
            </div> 
          </div>
        </div>
        <div class="col-4 nopadding">
          <div class="container">
            <div class="row nomarging">
              <div class="col-2 nopadding">
                <img v-if="this.userApp.generoPersona == '1'" src="../../assets/man.png" height="65" width="65"/>
                <img v-else-if="this.userApp.generoPersona == '2'" src="../../assets/woman.png" height="65" width="65"/>
                <img v-else src="../../assets/emptyGender.png" height="65" width="65"/>
              </div>
              <div class="col-9 nopadding datos">
                <div class="row nomarging"><div class="col nombre">{{userApp.nombrePersona}}</div></div>
                <div class="row nomarging"><div class="col dato">SUCURSAL: {{userApp.sucursal.nombre}}</div></div>
                <div class="row nomarging"><div class="col dato">SUBSUCURSAL: {{userApp.subSucursal.nombre}}</div></div>
                <div class="row nomarging"><div class="col dato">PERFIL: {{userApp.perfil.nombre}}</div></div>
              </div>
              <div class="col-1 buttons">
                <div class="row nomarging">
                  <div class="col nopadding"><a href="#"><img @click="logout()" src="../../assets/logout.png" height="28" width="28"/></a></div>
                </div>
                <div v-if="this.userApp.cambioClavePersona == '1'" class="row nomarging">
                  <div class="col nopadding"><img src="../../assets/changePassword.png" height="28" width="28"/></div>
                </div>
              </div>  
            </div>
          </div>
        </div>
    </div>
    <hr/>
  </div>
</div>
</template>

<script>
import services from '@/services'

export default {
  name: 'headerCmpt',
  data () {
    return {
      userApp: null
    }
  },
  methods: {
    logout: function () {
      services.logout(this.$store.getters.AUTH_getToken)
      this.$store.dispatch('AUTH_logout')
      this.$router.push('/')
    },
    collapseMenu: function () {
      this.$root.$emit('collapse-menu-event');
    }
  },
  created: function () {
    this.userApp = this.$store.getters.USER_getUser    
  }
}

</script>

<style scoped>

.container {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0;
  padding-right: 0;
}

.datos {
  font: bold 60% verdana;
  color: #94c121;
  padding-left: 0;
}

.datos .nombre{
  padding-bottom: 0.2rem;
  padding-left: 0;
  color: #00569c;
}

.dato {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
}

hr {
  margin: 0;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 0;
  border-top: 5px solid rgb(0, 86, 156);
}

.btn-group-sm>.btn, .btn-sm {
  font-size: .720rem;
}

.header {
  background-color: #f3f5ff;
  border: 1px solid #709fd6;
  border-radius: 5px;
}

.logo {
  padding-left: 10px;
}

.book-15{
  flex: 0 0 10%;
  max-width: 10%;
  align-items: flex-end;
}

.book-20{
  flex: 0 0 20%;
  max-width: 20%;
  display: flex;
  align-items: flex-end;
}

.path{
  padding-bottom: 0.5rem;
  color: #76a4d1;
  font: 15px arial, sans-serif;
}

.password{
  padding-right: 1rem;
  padding-bottom: 0.2rem;
}

.buttons{
  padding-right: 10px;
  padding-top: 5px;
  padding-left: 0;
}


</style>

