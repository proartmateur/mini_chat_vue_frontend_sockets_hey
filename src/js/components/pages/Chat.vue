<template>
  <div>
    <h1>Chat</h1>
    <template v-if="enable_chat">
      <p>chateando...</p>
    </template>
    <p v-else>Debes iniciar sesion para participar!</p>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import store from "../../store";

export default {
  name: "Chat",
  store,
  mounted() {
    if (!this.$store.getters.getUserName) {

    }
  },
  computed: {
     ...mapGetters([
      'getUserName',
    ]),
    enable_chat: function () {
      if (!this.getUserName) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>

</style>
