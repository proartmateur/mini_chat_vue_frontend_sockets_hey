/**
 * Created by Enrique Nieto Martínez on 30/08/21
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./components/pages/Login.vue";
import Chat from "./components/pages/Chat.vue";


Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "login",
		component: Login
	},
	{
		path: "/chat",
		name: "chat",
		component: Chat
	}
];

const router = new VueRouter({
	routes // short for `routes: routes`
});

export default router;
