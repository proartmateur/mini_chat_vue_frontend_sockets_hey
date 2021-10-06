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
export default {
  name: "ChatUserInputs",
  data:function (){
    return {
      current_message: null,
    }
  },
  methods:{
    sendMessage: function (){
      if(this.current_message){
        this.$emit("sendMessage", this.current_message)
        this.current_message = null;
      }

    }
  }
};
</script>

<style scoped>

</style>
