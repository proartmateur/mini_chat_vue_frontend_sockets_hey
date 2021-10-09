<template>
  <div class="page chat-page">
    <Nav
        @findMessage="onFindMessage"
    ></Nav>
    <ChatMessagesView
        ref="chat-view"
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
import {MessageFakeRepository} from "../../api/message_fake_repository";


const repo = new MessageFakeRepository();

export default {
  name: "Chat",
  components: {
    Nav,
    ChatMessagesView,
    ChatUserInputs
  },
  data: function () {
    return {
      messages: []
    };
  },
  store,
  async created() {
    console.log("CHAT: Created()");
    this.messages = await repo.list();
  },
  async mounted() {
    console.log("CHAT: Mounted()");
    if (!this.$store.getters.getUserName) {

    }
    //this.messages = await repo.list()
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
    onEmitMessage: async function (e) {
      //console.log(e);
      //this.messages.push(e)
      await repo.add(e);
      this.messages = await repo.list();
    },
    onFindMessage: async function (e) {
      const {search_query} = e;
      const results = await repo.find(search_query);
      if (results.length > 0) {
        const bubble = results[results.length - 1]
        this.$refs["chat-view"].goToBubble(bubble)
      }

      console.group("onFindMessage");
      console.log(e);
      console.log("--------");
      console.log(results);
      console.groupEnd();
    }
  }
};
</script>

<style scoped>

</style>
