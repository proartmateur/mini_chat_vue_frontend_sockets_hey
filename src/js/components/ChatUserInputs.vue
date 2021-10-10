<template>
  <div class="chat-user-inputs">
    <input
        @keyup.enter="sendMessage"
        v-model="current_message"
        type="text"
        class="form-control"
        placeholder="Escribe un mensaje...">
  </div>
</template>

<script>
import {v4 as uuidv4} from "uuid";
import * as dayjs from "dayjs";
import {mapGetters} from "vuex";

import {MessageFakeRepository} from "../api/message_fake_repository";

const repo = new MessageFakeRepository();
export default {
  name: "ChatUserInputs",
  data: function () {
    return {
      current_message: null,
    };
  },
  computed: {
    ...mapGetters([
      "getUserName",
    ]),
  },
  methods: {
    sendMessage: function () {
      if (this.current_message) {
        const new_message = {
          id: uuidv4(),
          content: this.current_message,
          time: dayjs().format("HH:mm"),
          date: dayjs().format("YYYY-MM-DD"),
          user_name: this.getUserName,
          type: "out"
        };
        this.$emit("sendMessage", new_message);
        this.emitSocketMessage(new_message);
        this.current_message = null;
      }

    },
    emitSocketMessage: function (message) {

      this.$socket.client.emit("chat_message", {data: message});
    }
  }
};
</script>

<style scoped>

</style>
