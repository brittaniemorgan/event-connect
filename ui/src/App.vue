<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="navbar-brand">Event Connect</router-link>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/events" class="nav-link">Events</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="true" to="/organizer-dashboard" class="nav-link">Organizer Dashboard</router-link>
          </li>
          <li class="nav-item" v-if="currentUser">
            <button @click="handleLogout" class="btn-secondary">Logout</button>
          </li>
          <li class="nav-item" v-else>
            <router-link to="/login" class="btn-secondary">Sign In</router-link>
          </li>
        </ul>
      </div>
    </nav>    
    <template v-if="currentUser">
      <p class="greeting">Welcome, {{ currentUser.name }}!</p>
    </template>
    <FlashMessage />
    <router-view class="content"></router-view>
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Event Connect. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FlashMessage from './components/FlashMessage.vue';

export default {
  name: "App",
  components:{FlashMessage},
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    ...mapActions(['logout']),
    
    handleLogout() {
      this.logout().then(() => {
        this.$router.push('/');
      })
    }
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
}

.navbar {
  background-color: #0a6320;
  padding: 10px 20px;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.navbar-brand {
  font-size: 1.5em;
  color: #fff;
  text-decoration: none;
}

.navbar-nav {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
}

.navbar-nav .nav-item {
  margin-left: 20px;
}

.navbar-nav .nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 1em;
}

.navbar-nav .nav-link:hover {
  opacity: 0.8;
}

.btn-secondary {
  background-color: white;
  font-size: 0.9rem;
  color: #0a6320;
  border: 2px solid #0a6320;
  padding: 8px 16px; 
  border-radius: 4px;
  text-decoration: none;
}

.btn-secondary:hover {
  opacity: 0.8;
  text-decoration: none;
}

.greeting{
  padding: 15px;
  padding-top: 0px;
  font-size: 1.5em; 
  color: #0a6320; 
  font-weight: bold;
}

.footer {
  background-color: #0a6320;
  color: white;
  padding: 10px 20px;
  text-align: center;
}

.footer p {
  margin: 0;
}
</style>
