/**
 * Created by Enrique Nieto Martínez on 12/09/21
 */
import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0,
    user_name: null,
    messages: [],
  },
  getters:{
    getUserName: function (state) {
      return state.user_name
    },
    getMessages: function (state){
      return state.messages
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setUserName (state, name){
      state.user_name = name
    },
    SOCKET_NEW_CHAT_MESSAGE(state, message){
      console.log("SOCKET_NEW_CHAT_MESSAGE")
      const msg = message.data
      console.log(msg)
      if(state.user_name){

        state.messages = [...state.messages, {...msg}];
      }
    }
  }
})

export default store;
