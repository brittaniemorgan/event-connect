import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EventsView from "../views/EventsView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import EventDetailsView from "@/views/EventDetailsView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import OrganizerDashBoardView from "@/views/OrganizerDashBoardView.vue";
import store from "@/store";
import ScanTicketsView from "@/views/ScanTicketsView.vue";
import ManageEventDetailsView from "@/views/ManageEventDetailsView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
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
    path: '/organizer-dashboard',
    name: 'OrganizerDashboard',
    component: OrganizerDashBoardView,
    meta: { requiresAuth: true, requiredRole: 'organizer' }
  },
  {
    path: '/event/:eventId',
    name: 'ManageEventDetails',
    component: ManageEventDetailsView,
    props: true
  },
  {
    path: '/scan-tickets/:eventId',
    name: 'ScanTickets',
    component: ScanTicketsView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let user = store.getters.currentUser

  if (to.meta.requiresAuth) {    
    if (!user) {
      store.dispatch('setFlashMessage', { message: 'Please log in to access this page.', type: 'warning' });
      next('/login'); 
    } else if (to.meta.requiredRole && user?.role !== to.meta.requiredRole) {
      store.dispatch('setFlashMessage', { message: 'You do not have the required permissions to access this page.', type: 'danger' });
      next('/'); 
    } else {
      next(); 
    }
  } else {
    next();
  }
});

export default router;
