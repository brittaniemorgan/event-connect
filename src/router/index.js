import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EventsView from "../views/EventsView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import CreatEventView from "@/views/CreatEventView.vue";
import EventDetailsView from "@/views/EventDetailsView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/events",
    name: "Events",
    component: EventsView,
  },
  {
    path: "/events/:id",
    name: "EventDetails",
    component: EventDetailsView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactView,
  },
  {
    path: '/create-event',
    name: 'CreateEvent',
    component: CreatEventView
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
