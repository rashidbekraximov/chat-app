import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";

import "bulma/css/bulma.css";
import "./assets/main.css";

import Notifications from "@kyvg/vue3-notification";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEllipsis,
  faPaperPlane,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const icons = [faSearch, faEllipsis, faPaperPlane];

icons.forEach((icon) => library.add(icon));

// Create a new store instance.
const store = createStore({
  state() {
    return {
      username: "",
    };
  },
});

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Notifications);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
