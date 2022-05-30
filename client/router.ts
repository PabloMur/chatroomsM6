import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "welcome-page" },
  { path: "/choose", component: "choose-page" },
  { path: "/chat", component: "chat-page" },
  { path: "/getroom", component: "get-room-page" },
]);
