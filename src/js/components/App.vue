<template>
  <div class="hey-chat-app">
    <!--<router-link to="/tramite/solicitud_constancia_representatividad">Revisión Salarial</router-link>
    <router-view></router-view>-->
    <router-view></router-view>
  </div>

</template>

<script>

import Nav from "./layout/Nav.vue";


export default {

  name: "App",
  components: {
    Nav
  },
  data: function () {
    return {};
  },
  methods: {}
};
</script>

<style scoped>

</style>
