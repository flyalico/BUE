<template>
<div id="home" class="row nomarging">
  <div class="col nopadding image">
    <img src="../../assets/logo_aqua.png" height="400" width="480"/>
  </div>
</div>
</template>

<script>
export default {
  name: 'homeCmpt',
  created: function () {
    this.$store.dispatch('USER_setPath', "/")
  }  
}
</script>

<style scoped>

.image {
  text-align: center;
  padding-top: 1.5rem;
  padding-bottom: 3.8rem;
}

</style>
