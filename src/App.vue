<template>
  <div id="app">
    <!-- Navigation Bar -->
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
        </ul>
      </div>
    </nav>
    

    <!-- Router View to Render the Pages -->
    <router-view></router-view>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Event Connect. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
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
  text-decoration: underline;
}


.footer {
  background-color: #0a6320;
  color: white;
  padding: 10px 20px;
  text-align: center;
  margin-top: 20px;
}

.footer p {
  margin: 0;
}
</style>
