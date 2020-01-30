<template>
<div id="app">
  <div v-if="this.$store.getters.USER_isInitialized">
    <re-auth v-if="!this.$store.getters.AUTH_isAuthenticated"/>
    <loading-app v-if="this.$store.getters.USER_getLoading"/>
    <div class="row nomarging">
      <div class="col nopadding">
        <header-app/>
      </div>
    </div>
    <div class="row nomarging">
      <b-collapse id="menu" class="appMenu" v-model="showMenu" >
        <div class="menu">
          <menu-app/>
        </div>
      </b-collapse>    
      <div v-bind:class="{ appBody80: showMenu, appBody100:!showMenu }">
        <div class="float-left">
          <img v-if="this.showMenu" v-b-toggle.menu  src="./assets/menuHide.png" height="20px" width="20px"/>
          <img v-if="!this.showMenu" v-b-toggle.menu  src="./assets/menuShow.png" height="20px" width="20px"/>
        </div>          
        <router-view/>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="row nomarging">
      <div class="col nopadding"><router-view/></div>
    </div>
  </div>
</div>
</template>

<script>
import header from '@/components/security/header'
import menu from '@/components/security/menu'
import reAuth from '@/components/security/reAuth'
import loading from '@/components/lib/loading'

export default {
  name: 'App',
  components: {
    'header-app': header,
    'menu-app': menu,
    're-auth': reAuth,
    'loading-app': loading
  },
  data () {
    return {
      showMenu: true
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('AUTH_logout')
    }
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 0.5rem;
}

.nopadding {
  padding: 0 !important;
}

.nomarging {
  margin: 0 !important;
}

.appMenu{
  flex: 0 0 18%;
  max-width: 18%;
}

.appBody80{
  flex: 0 0 82%;
  max-width: 82%;
}

.appBody100{
  flex: 0 0 100%;
  max-width: 100%;
}

.appShowHideMenu {
  background-color: #f3f5ff;
  border: 1px solid #709fd6;
  border-radius: 5px;
  height: 100%;
}

</style>
