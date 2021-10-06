<template>
  <nav class="navbar navbar navbar-dark bg-hey-gradient">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img :src="logo" alt="" width="30" height="24">
      </a>
    </div>
  </nav>

</template>

<script>

import hey_isologo from "../../../assets/images/icons/hey_isologo.svg";

export default {
  name: "Nav",
  data: function (){
    return {
      logo: hey_isologo
    }
  }
};
</script>

<style scoped>

</style>
