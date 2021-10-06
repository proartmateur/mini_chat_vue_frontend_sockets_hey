<template>
  <div class="login-page">
    <figure class="login-page__logo">
      <img :src="logo" class="img-fluid" alt="Responsive image">
    </figure>
    <h1 class="login-page__title">Chat</h1>
    <form action="" class="login-page__form">
      <div>
        <label for="user_name" class="form-label">Nombre de usuario:</label>
        <input type="text" class="form-control" id="user_name" placeholder="Escribe tu nombre">
      </div>
      <button class="btn btn-primary" type="button">Entrar</button>
    </form>


  </div>
</template>

<script>
import hey_logo from "../../../assets/images/hey_logo_2.png";

export default {
  name: "Login",
  data: function () {
    return {
      logo: hey_logo
    };
  }
};
</script>

<style scoped>

</style>
