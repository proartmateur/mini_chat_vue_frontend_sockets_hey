<template>
  <div id="chat-messages-view" class="chat-messages-view">
    <template v-for="message in messages">
      <ChatMessageBubble
          type="out"
          :title="message.user"
          :content="message.content"
          :time="message.time"
      ></ChatMessageBubble>

      <ChatMessageBubble
          type="in"
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
    this.messages.push({
      content: "Hola MSFG ñakdsjf añlsdjf añlsdkf asd fañlsdk falkjsd fañl ña sdlkfa sdñf aklsd fñasldk a añs dflkaj sdfñlkaj sda sdlkfj añsldfkj añsldkfj a añs dlkfj aslkdf añs dñfkjla sdlkf asñldkjf ",
      date: "",
      id: "adsfjh0",
      time: "08:25",
      type: "out",
      user: "Enrique Nieto Martínez 123"
    });
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
