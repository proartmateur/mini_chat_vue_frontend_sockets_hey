<template>
  <div class="page login-page">
    <figure class="login-page__logo">
      <img :src="logo" class="img-fluid" alt="Responsive image">
    </figure>
    <h1 class="login-page__title">Chat</h1>
    <form action="" class="login-page__form">
      <div>
        <label for="user_name" class="form-label">Nombre de usuario:</label>
        <input
            @keyup.enter="saveName"
            v-model="$v.form.user_name.$model"
            type="text"
            class="form-control"
            id="user_name"
            placeholder="Escribe tu nombre">
        <template v-if="$v.form.$error">
          <small class="hey-danger"
              v-if="!$v.form.user_name.minLength">El nombre debe ser más largo.</small>
          <small class="hey-danger"
              v-else>Es necesario proporcionar un nombre.</small>
        </template>

      </div>
      <button
          :disabled="disable_btn"
          @click="saveName"
          class="btn btn-primary"
          type="button">Entrar</button>
    </form>


  </div>
</template>

<script>
import hey_logo from "../../../assets/images/hey_logo_2.png";
import store from "../../store";
import router from "../../routes";
import {
  required,
  helpers,
  minLength,
  maxLength
} from "vuelidate/dist/validators.min";

export default {
  name: "Login",
  store,
  data: function () {
    return {
      logo: hey_logo,
      form: {
        user_name: null
      }
    };
  },
  validations: {
    form: {
      user_name: {
        required,
        minLength: minLength(3)
      }

    }
  },
  computed:{
    disable_btn: function (){
      if(this.$v.form.$invalid){
        return true
      }
      return false
    }
  },
  methods: {
    saveName: function (e) {
      e.preventDefault();
      console.log(e);
      store.commit("setUserName", this.form.user_name);
      router.push("chat");
    }
  }
};
</script>

<style scoped>

</style>
