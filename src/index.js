//import 'normalize.css';

//region Vue Environment

import Vue from "vue";

import store from "./js/store";
import router from "./js/routes";

/* Establish Connection */

import VueSocketIOExt from "vue-socket.io-extended";
import {io} from "socket.io-client";

const socket = io("http://localhost:3009");

Vue.use(VueSocketIOExt, socket, { store });

import Vuelidate from "vuelidate";

Vue.use(Vuelidate);
Vue.config.productionTip = false;
//endregion

//region Bootstrap Vue

import {BootstrapVue, IconsPlugin} from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
	TablePlugin,
	FormTimepickerPlugin,
	FormDatepickerPlugin,
	FormSelectPlugin,
	FormRadioPlugin,
	NavPlugin
} from "bootstrap-vue";

Vue.use(NavPlugin);

Vue.use(TablePlugin);
Vue.use(FormTimepickerPlugin);
Vue.use(FormDatepickerPlugin);
Vue.use(FormDatepickerPlugin);
Vue.use(FormSelectPlugin);
Vue.use(FormRadioPlugin);
import "bootstrap-vue/dist/bootstrap-vue.css";
//endregion

//region App Components and Assets

import "./styles/main.scss";

import App from "./js/components/App.vue";

//endregion

const tramites = new Vue({
	el: "#app_tramites",
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
			console.log(val)
			console.log("CHAT this method was fired by the socket server. eg: io.emit(\"customEmit\", data)");
		}
	},

});
