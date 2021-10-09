<template>
  <nav class="navbar navbar navbar-dark bg-hey-gradient">
    <div class="container-fluid">
      <a class="navbar-brand logo-container">
        <img :src="logo" alt="" width="30" height="24">
      </a>

      <template v-if="is_search">
        <form class="form-search">

          <span
              @click="searchIconClick"
              class="navbar-text form-icon search-icon">
              <img :src="icons.search" alt="click aquí para buscar">
          </span>

          <input
              @keyup.enter="findMessage"
              @keyup.esc="hideSearchForm"
              v-model="search_query"
              ref="text-input"
              class="form-search__text-input"
              placeholder="Algo que buscar…"
              type="text">

          <span
              @click="hideSearchForm"
              class="navbar-text form-icon close-icon">
            <img :src="icons.close" alt="click aquí para buscar">
          </span>
        </form>
      </template>

      <template v-else>

        <span

            @click="showSearchForm"
            class="navbar-text options-icon">
                <img :src="icons.options" alt="click aquí para buscar">
        </span>
      </template>
    </div>
  </nav>

</template>

<script>

import hey_isologo from "../../../assets/images/icons/hey_isologo.svg";
import options_icon from "../../../assets/images/icons/options_dot_icon.svg";
import close_icon from "../../../assets/images/icons/close_icon.svg";
import search_icon from "../../../assets/images/icons/search_icon.svg";

export default {
  name: "Nav",
  data: function () {
    return {
      logo: hey_isologo,
      icons: {
        options: options_icon,
        close: close_icon,
        search: search_icon
      },
      is_search: false,
      search_query: null
    };
  },
  methods: {
    showSearchForm: function (e) {
      this.is_search = true;
      setTimeout(() => {

        this.$refs["text-input"].focus();
      }, 100);
    },
    hideSearchForm: function (e) {
      this.is_search = false;
      this.cleanSearchQuery(e);
    },
    cleanSearchQuery: function (e) {
      this.search_query = null;
    },
    findMessage: function (e) {
      this.$emit("findMessage", {
        search_query: this.search_query
      });
    },
    searchIconClick: function (e) {
      if (!this.search_query) {
        this.$refs["text-input"].focus();
      } else {
        this.findMessage(e);
      }
    }
  }
};
</script>

<style scoped>

</style>
