<template>
  <div class="page chat-page">
    <Nav></Nav>
    <ChatMessagesView></ChatMessagesView>
    <ChatUserInputs>
    </ChatUserInputs>
<!--    <template v-if="enable_chat">-->
<!--      <p>chateando...</p>-->
<!--    </template>-->
<!--    <p v-else>Debes iniciar sesion para participar!</p>-->
  </div>

</template>

<script>
import {mapGetters} from "vuex";
import store from "../../store";
import Nav from "../layout/Nav.vue";
import ChatMessagesView from "../ChatMessagesView.vue";
import ChatUserInputs from "../ChatUserInputs.vue";

export default {
  name: "Chat",
  components: {
    Nav,
    ChatMessagesView,
    ChatUserInputs
  },
  store,
  mounted() {
    if (!this.$store.getters.getUserName) {

    }
  },
  computed: {
    ...mapGetters([
      "getUserName",
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
