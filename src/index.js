//import 'normalize.css';

//region Vue Environment

import Vue from "vue";

import store from "./js/store";
import router from "./js/routes";

/* Establish Connection */

import VueSocketIOExt from "vue-socket.io-extended";
import {io} from "socket.io-client";

const socket = io(app_config.socket_api_url);

Vue.use(VueSocketIOExt, socket, { store });

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
Vue.config.productionTip = false;
//endregion

//region Bootstrap Vue


// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
	NavPlugin
} from "bootstrap-vue";

Vue.use(NavPlugin);

import "bootstrap-vue/dist/bootstrap-vue.css";
//endregion

//region App Components and Assets

import "./styles/main.scss";

import App from "./js/components/App.vue";
import app_config from "./js/utils/config";

//endregion

const chat_app = new Vue({
	el: "#chat_app",
	data: {
		hi: "asd"
	},
	router,
	store,
	components: {
		App
	},
	sockets: {
		connect() {
			console.log("CHAT socket connected");
		},
		new_chat_message(val) {
		}
	},

});
