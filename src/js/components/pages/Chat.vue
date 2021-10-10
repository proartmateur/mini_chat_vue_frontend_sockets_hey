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
  </div>

</template>

<script>

import {mapGetters} from "vuex";
import store from "../../store";
import Nav from "../layout/Nav.vue";
import ChatMessagesView from "../ChatMessagesView.vue";
import ChatUserInputs from "../ChatUserInputs.vue";
import {MessageApiRepository} from "../../api/message_api_repository";
import app_config from "../../utils/config";


const url = app_config.socket_api_url + app_config.rest_api_path;

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
    if (!this.$store.getters.getUserName) {
      this.$router.push("/");
    }

    setTimeout(async () => {
      const user_name = this.getUserName;
      this.user_display = user_name;
      this.messages = await repo.list({user_name});
    }, 200);


  },
  computed: {
    ...mapGetters([
      "getUserName",
      "getMessages"
    ])
  },
  watch: {
    getMessages: async function (newVal) {
      if (newVal.length > 0) {
        const last_index = newVal.length - 1;
        let last_message = {...newVal[last_index]};
        if (!this.isMessageOwn(last_message)) {
          last_message.type = "in";
          await repo.addFormSocket(last_message);
          this.messages = await repo.list({user_name: this.getUserName});
        }
      }
    }
  },
  methods: {
    onEmitMessage: async function (e) {
      const user_name = this.getUserName;
      if (!e.user) {
        e["user"] = user_name;
      }
      await repo.add(e);
      this.messages = await repo.list({user_name});
    },
    onFindMessage: async function (e) {
      const {search_query} = e;
      const results = await repo.find(search_query);
      if (results.length > 0) {
        const bubble = results[results.length - 1];
        this.$refs["chat-view"].goToBubble(bubble);
      } else {
        this.findInThePast(search_query);
      }
    },
    isMessageOwn: function (message) {
      if (message.user_name.toUpperCase() === this.getUserName.toUpperCase()) {
        return true;
      }
      return false;
    },
    findInThePast: async function (search_query) {
      const deep_results = await repo.findDeep(search_query);
      const start_bubble = deep_results[deep_results.length - 1];
      if (deep_results.length > 0) {
        this.messages = await repo.listDeep(start_bubble, this.getUserName);
        setTimeout(() => {
          this.$refs["chat-view"].goToBubble(start_bubble);
        }, 600);
      }
    }
  },

};
</script>

<style scoped>

</style>
