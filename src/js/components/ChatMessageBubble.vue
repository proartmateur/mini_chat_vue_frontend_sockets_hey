<template>
  <div :class="bubble_class">
    <div class="message__title">

      <p>{{ title || "Me" }}</p>
    </div>
    <div class="message__content">
      <p>{{ content }}</p>
    </div>
    <div class="message__time">
      <p>{{ time }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatMessageBubble",
  data: function () {
    return {};
  },
  computed: {
    bubble_class: function () {
      switch (this.type) {
        case "in":
          return "message message--in";
          break;

        case "out":
          return "message message--out";
          break;
      }
    }
  },
  props: {
    type: {
      required: true,
      type: String
    },
    title: String,
    content: String,
    time: String
  }
};
</script>

<style scoped>

</style>
