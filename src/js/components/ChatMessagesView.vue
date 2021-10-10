<template>
  <div id="chat-messages-view" class="chat-messages-view">
    <template v-for="message in messages">
      <ChatMessageBubble
          :id="'bubble_'+message.id.replaceAll('-','')"
          :type="message.type"
          :title="message.user_name"
          :content="message.content"
          :time="message.time"
      ></ChatMessageBubble>


    </template>
  </div>
</template>

<script>

import {gsap} from "gsap";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

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
          const {id} = this.messages[this.messages.length - 1];
          const bubble_id = `#bubble_${id.replaceAll("-", "")}`;
          gsap.to("#chat-messages-view", {
            duration: 0.5,
            ease: "power4.inOut",
            scrollTo: {y: "max"}
          });
          console.log(bubble_id);

        }, 200);

      },
      deep: true
    }
  },
  methods: {
    goToBubble: function (message_bubble) {
      const message_bubble_id = message_bubble.id;
      const bubble_type = message_bubble.type;
      const bubble_id = `#bubble_${message_bubble_id.replaceAll("-", "")}`;
      const to_bubble = document.querySelector(bubble_id);
      let x_delta = 25;

      if (bubble_type === "out") {
        x_delta = x_delta * -1;
      }

      gsap.to("#chat-messages-view", {
        duration: 0.5,
        ease: "power4.inOut",
        scrollTo: to_bubble
      });

      setTimeout(() => {
        // gsap.to(to_bubble, {
        //   duration: 0.3,
        //   delay: 0.1,
        //   x: x_delta
        // });

        gsap.from(to_bubble, {
          duration: 1,
          ease: "elastic.inOut(1,0.3)",
          delay: 0.3,
          x: x_delta
        });

      }, 100);
      console.log(bubble_id);
    }
  }
};
</script>

<style scoped>

</style>
