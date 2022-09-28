import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'

createApp(App).use(store).use(router).mount('#app')

let token = (new URLSearchParams(window.location.search)).get("token") || localStorage.getItem("token");
if (!token) {
    router.push({ name: "Unauthenticated" });
} else {
    store.commit("setToken", token);
    localStorage.setItem("token", token);
}
