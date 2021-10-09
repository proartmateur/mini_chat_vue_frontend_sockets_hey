<template>
  <div id="chat-messages-view" class="chat-messages-view">
    <template v-for="message in messages">
      <ChatMessageBubble
          :type="message.type"
          :title="message.user"
          :content="message.content"
          :time="message.time"
      ></ChatMessageBubble>


    </template>
  </div>
</template>

<script>

import ChatMessageBubble from "./ChatMessageBubble.vue";

function scrollToBottom(id) {
  var div = document.getElementById(id);
  div.scrollTop = div.scrollHeight - div.clientHeight;
}

export default {
  name: "ChatMessagesView",
  components: {
    ChatMessageBubble
  },
  props: {
    messages: Array
  },
  mounted() {
  },
  watch: {
    messages: {
      handler: function (newVal) {

        setTimeout(() => {
          scrollToBottom("chat-messages-view");
        }, 200);
      },
      deep: true
    }
  }
};
</script>

<style scoped>

</style>
