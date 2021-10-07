<template>
  <div id="chat-messages-view" class="chat-messages-view">
    <template v-for="message in messages">

      <!--      <b>{{ message.type }}</b>-->
      <div class="message message--out">
        <div class="message__title">

          <p>{{ message.user || "Me" }}</p>
        </div>
        <div class="message__content">
          <p>{{ message.content }}</p>
        </div>
        <div class="message__time">
          <p>{{ message.time }}</p>
        </div>
      </div>

      <div class="message message--in">
        <div class="message__title">

          <p>{{ message.user || "Me" }}</p>
        </div>
        <div class="message__content">
          <p>{{ message.content }}</p>
        </div>
        <div class="message__time">
          <p>{{ message.time }}</p>
        </div>
      </div>

    </template>
  </div>
</template>

<script>

function scrollToBottom(id) {
  var div = document.getElementById(id);
  div.scrollTop = div.scrollHeight - div.clientHeight;
}

export default {
  name: "ChatMessagesView",
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
