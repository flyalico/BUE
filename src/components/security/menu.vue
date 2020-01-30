<template>
<div id="menu" class="row nomarging" style="height: 100%;" v-if="this.menuReady">
  <div class="col base float-left">
    <b-list-group flush>
      <!-- Nivel 1 -->
      <b-list-group-item class="firstItemMenu" v-for="(transaccion, iLevel1) in menu" :key="transaccion.codigoTransaccion">
          <b-list-group-item v-if="transaccion.listaTransaccion">
            <label class="pathPage" @click="addCollapseEvent()" v-b-toggle="'collapse-' + transaccion.codigoTransaccion">{{ transaccion.nombre }}</label>
            <b-collapse :id="'collapse-' + transaccion.codigoTransaccion" ref="collapse">
              <b-list-group>
                <!-- Nivel 2 -->
                <b-list-group-item v-for="(transaccion, iLevel2) in transaccion.listaTransaccion" :key="transaccion.codigoTransaccion">
                    <b-list-group-item v-if="transaccion.listaTransaccion">
                      <label class="pathPage" v-b-toggle="'collapse-' + transaccion.codigoTransaccion">{{ transaccion.nombre }}</label>
                      <b-collapse :id="'collapse-' + transaccion.codigoTransaccion" ref="collapse">
                        <b-list-group>
                          <!-- Nivel 3 -->
                          <b-list-group-item v-for="(transaccion, iLevel3) in transaccion.listaTransaccion" :key="transaccion.codigoTransaccion">
                            <b-list-group-item v-if="transaccion.listaTransaccion">
                              <label class="pathPage" v-b-toggle="'collapse-' + transaccion.codigoTransaccion">{{ transaccion.nombre }}</label>
                              <b-collapse :id="'collapse-' + transaccion.codigoTransaccion" ref="collapse">
                                <b-list-group>
                                  <!-- Nivel 4 -->
                                  <b-list-group-item v-for="(transaccion, iLevel4) in transaccion.listaTransaccion" :key="transaccion.codigoTransaccion">
                                    <b-list-group-item v-if="transaccion.listaTransaccion">
                                      <label class="pathPage" v-b-toggle="'collapse-' + transaccion.codigoTransaccion">{{ transaccion.nombre }}</label>
                                      <b-collapse :id="'collapse-' + transaccion.codigoTransaccion" ref="collapse">
                                        <b-list-group>
                                          <!-- Nivel 5 -->
                                          <b-list-group-item v-for="(transaccion, iLevel5) in transaccion.listaTransaccion" :key="transaccion.codigoTransaccion">
                                            <router-link class="linkPage" @click.native="path({iLevel1:iLevel1, iLevel2:iLevel2, iLevel3:iLevel3, iLevel4:iLevel4, iLevel5:iLevel5})" v-bind:to="transaccion.pagina">{{ transaccion.nombre }}</router-link>
                                          </b-list-group-item>
                                        </b-list-group>
                                      </b-collapse>
                                    </b-list-group-item>
                                    <b-list-group-item v-else><router-link class="linkPage" @click.native="path({iLevel1:iLevel1, iLevel2:iLevel2, iLevel3:iLevel3, iLevel4:iLevel4})" v-bind:to="transaccion.pagina">{{ transaccion.nombre }}</router-link></b-list-group-item>
                                  </b-list-group-item>
                                </b-list-group>
                              </b-collapse>
                            </b-list-group-item>
                            <b-list-group-item v-else><router-link class="linkPage" @click.native="path({iLevel1:iLevel1, iLevel2:iLevel2, iLevel3:iLevel3})" v-bind:to="transaccion.pagina">{{ transaccion.nombre }}</router-link></b-list-group-item>
                          </b-list-group-item>
                        </b-list-group>
                      </b-collapse>
                    </b-list-group-item>
                    <b-list-group-item v-else><router-link class="linkPage" @click.native="path({iLevel1:iLevel1, iLevel2:iLevel2})" v-bind:to="transaccion.pagina">{{ transaccion.nombre }}</router-link></b-list-group-item>
                </b-list-group-item>
              </b-list-group>
            </b-collapse>
          </b-list-group-item>
          <b-list-group-item v-else><router-link class="linkPage" @click.native="path({iLevel1: iLevel1})" v-bind:to="transaccion.pagina">{{ transaccion.nombre }}</router-link></b-list-group-item>
      </b-list-group-item>
    </b-list-group>
  </div>
</div>
</template>

<script>
import services from '@/services'

export default {
  name: 'menuCmpt',
  data () {
    return {
      menu: null,
      menuReady: false,
      basePath: ' / ',
      collapseEvent: false
    }
  },
  methods: {
    path: function (path) {
      if(path.iLevel5 != null) {
        this.basePath = ' / ' + this.menu[path.iLevel1].nombre + ' / ' 
        + this.menu[path.iLevel1].listaTransaccion[path.iLevel2].nombre + ' / ' 
        + this.menu[path.iLevel1].listaTransaccion[path.iLevel2].listaTransaccion[path.iLevel3].nombre + ' / '
        + this.menu[path.iLevel1].listaTransaccion[path.iLevel2].listaTransaccion[path.iLevel3].listaTransaccion[path.iLevel4].nombre + ' / '
        + this.menu[path.iLevel1].listaTransaccion[path.iLevel2].listaTransaccion[path.iLevel3].listaTransaccion[path.iLevel4].listaTransaccion[path.iLevel5].nombre
      } else {
        if(path.iLevel4 != null) {
          this.basePath = ' / ' + this.menu[path.iLevel1].nombre + ' / ' 
          + this.menu[path.iLevel1].listaTransaccion[path.iLevel2].nombre + ' / ' 
          + this.menu[path.iLevel1].listaTransaccion[path.iLevel2].listaTransaccion[path.iLevel3].nombre + ' / '
          + this.menu[path.iLevel1].listaTransaccion[path.iLevel2].listaTransaccion[path.iLevel3].listaTransaccion[path.iLevel4].nombre
        } else {
          if(path.iLevel3 != null) {
            this.basePath = ' / ' + this.menu[path.iLevel1].nombre + ' / ' 
            + this.menu[path.iLevel1].listaTransaccion[path.iLevel2].nombre + ' / ' 
            + this.menu[path.iLevel1].listaTransaccion[path.iLevel2].listaTransaccion[path.iLevel3].nombre
          } else {
            if(path.iLevel2 != null) {
              this.basePath = ' / ' + this.menu[path.iLevel1].nombre + ' / ' 
              + this.menu[path.iLevel1].listaTransaccion[path.iLevel2].nombre
            } else {
              this.basePath = ' / ' + this.menu[path.iLevel1].nombre
            }
          }
        }
      }
      this.$store.dispatch('USER_setPath', this.basePath)
    },
    addCollapseEvent: function (path) {
      if(!this.collapseEvent) {
        var collapseRefs = this.$refs.collapse
        this.$root.$on('collapse-menu-event', function () {
          collapseRefs.forEach(collapse => {
            if(collapse.show) { collapse.toggle() }
          })
        });
        this.collapseEvent = true
      }
    }
  },
  created: function () {
    const payload = {
      codigoPerfil: this.$store.getters.USER_getUser.perfil.id 
    }
    services.getUserMenu(this.$store.getters.AUTH_getToken, payload)
      .then(response => {
        if(response.data.success) {
          this.menu = response.data.data
          this.menuReady = true
        } else {
          console.log(response.data.message)
        }
      })
      .catch(error => {
        console.log(error)
        if(error.response && error.response.status == 401) {
          if(error.response.data.code && error.response.data.code == "AUTH01") {
            this.$store.dispatch('AUTH_logout')
            this.$router.push('/')
          }
        }
      })          
  }
}
</script>

<style scoped>

#menu {
  background-color: #f3f5ff;
  border: 1px solid #709fd6;
  border-radius: 5px;
}

.base {
  padding-top: 1rem;
  padding-left: 5px;
  resize: both;
  overflow: auto;
}

label {
  margin-bottom: 0;
}

.list-group-item {
  padding: 0;
  padding-left: 0.5rem;
  background: #f3f5ff;
}

.firstItemMenu {
  padding: 0;
}

.linkPage {
  font: bold 12px Arial;
  color: #2e75b6;
}

.linkPage:hover {
  font-style: italic;
  color: #ed7d31;
}

.pathPage {
  font: normal 12px Arial;
  color: #2e75b6;  
}

.router-link-active {
  color: #ed7d31; 
}

</style>
