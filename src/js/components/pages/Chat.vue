<template>
  <div class="page chat-page">
    <Nav
        @findMessage="onFindMessage"
    ></Nav>
    <p v-if="false">{{ getMessages.length }} {{ getMessages[0] }}</p>
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
import {MessageApiRepository} from "../../api/message_api_repository";


const url = "http://localhost:3009/hey/api";

const repo = new MessageApiRepository(url);

export default {
  name: "Chat",
  components: {
    Nav,
    ChatMessagesView,
    ChatUserInputs
  },

  data: function () {
    return {
      messages: [],
      user_display: null
    };
  },
  store,
  async created() {
    console.log("CHAT: Created()");

  },
  async mounted() {
    console.log("CHAT: Mounted()");
    if (!this.$store.getters.getUserName) {
      this.$router.push("/");
    }

    setTimeout(async () => {

      const user_name = this.getUserName;
      console.log("Chat mounted()", user_name);
      this.user_display = user_name;
      this.messages = await repo.list({user_name});
    }, 200);


  },
  computed: {
    ...mapGetters([
      "getUserName",
      "getMessages"
    ]),
    enable_chat: function () {
      if (!this.getUserName) {
        return false;
      }
      return true;
    }
  },
  watch: {
    getMessages: function (newVal) {
      console.log("NUEVO CHAT DESDE FUERA");
      console.log(newVal);
      if (newVal.length > 0) {
        const last_index = newVal.length - 1;
        let last_message = {...newVal[last_index]};
        console.log("Last Socket message:");
        console.log(last_message.type);

        if (!this.isMessageOwn(last_message)) {
          last_message.type = "in";
        }
        console.log(last_message.type);


      }
    }
  },
  methods: {
    onEmitMessage: async function (e) {
      //console.log(e);
      //this.messages.push(e)
      const user_name = this.getUserName;
      if (!e.user) {
        e["user"] = user_name;
      }
      await repo.add(e);
      this.messages = await repo.list({user_name});
    },
    onFindMessage: async function (e) {
      const user_name = this.getUserName;
      const {search_query} = e;
      const results = await repo.find(search_query);
      if (results.length > 0) {
        const bubble = results[results.length - 1];
        this.$refs["chat-view"].goToBubble(bubble);
      } else {
        console.log("DEEP FIND");
        const deep_results = await repo.findDeep(search_query);
        console.log(deep_results);
        const start_bubble = deep_results[deep_results.length - 1];
        if (deep_results.length > 0) {
          console.log("messages: ", this.messages.length);
          this.messages = await repo.listDeep(start_bubble, user_name);
          console.log("messages: ", this.messages.length);
          setTimeout(() => {
            this.$refs["chat-view"].goToBubble(start_bubble);
          }, 600);
        }
      }

      console.group("onFindMessage");
      console.log(e);
      console.log("--------");
      console.log(results);

      console.groupEnd();
    },
    isMessageOwn: function (message) {
      if (message.user_name.toUpperCase() === this.getUserName.toUpperCase()) {
        return true;
      }
      return false;
    }
  },

};
</script>

<style scoped>

</style>
