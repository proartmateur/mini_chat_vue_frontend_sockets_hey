<template>
  <div class="page chat-page">
    <Nav></Nav>
    <ChatMessagesView
    :messages="messages"
    ></ChatMessagesView>
    <ChatUserInputs
        @sendMessage="onEmitMessage"
    >
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
  data: function (){
    return {
      messages: []
    }
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
  },
  methods: {
    onEmitMessage: function (e) {
      console.log(e);
      this.messages.push(e)
    }
  }
};
</script>

<style scoped>

</style>
