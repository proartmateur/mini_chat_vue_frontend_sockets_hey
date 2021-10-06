/**
 * Created by Enrique Nieto Martínez on 12/09/21
 */
import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0,
    user_name: null
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setUserName (state, name){
      state.user_name = name
    }
  }
})

export default store;
