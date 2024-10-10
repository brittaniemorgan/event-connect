<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Discover Events Around You</h1>
        <p style="color: #0a6320;font-weight: 600;">Find and attend the best events in your city.</p>
        <input type="text" v-model="searchQuery" placeholder="Search for events..." />
        <button class="btn-primary">Search</button>
      </div>
    </section>

    <section class="featured-events">
      <h2>Featured Events</h2>
      <div class="event-list">
        <div v-if="loading" class="loading">Loading...</div>
        <EventCard v-for="event in filteredEvents" :key="event.id" :event="event" />
      </div>
      <router-link to="/events" class="nav-link">
        <button class="btn-primary">View All Events </button>
      </router-link>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EventCard from "@/components/EventCard.vue";

export default {
  name: "HomeView",
  components: {
    EventCard,
  },
  data() {
    return {
      searchQuery: "",
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['events', 'categories']),
    filteredEvents() {
      return this.events.filter(event =>
        event.title?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    ...mapActions(['fetchEvents', 'fetchCategories']),

    async loadEvents() {
      this.loading = this.events.length === 0;
      const loadingTimer = setTimeout(() => {
        if (this.loading) {
          alert("Events are taking longer than expected to load due to server restraints. Events will be displayed shortly.");
        }
      }, 3000);
      try {
        await this.fetchEvents();
      } finally {
        this.loading = false;
        clearTimeout(loadingTimer);
      }
    }
  },
  created() {
    this.loadEvents();
    this.fetchCategories();
  }
};
</script>


<style scoped>
div {
  padding-bottom: 20px;
}

.hero {
  background: linear-gradient(rgba(237, 237, 237, 0.5), rgba(237, 237, 237, 0.5)),
    url('../assets/common-bg.svg') center/cover no-repeat;
  color: white;
  text-align: center;
  padding: 50px 20px 200px;
}

.hero-content h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.hero-content p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.hero-content input[type="text"] {
  padding: 10px;
  width: 300px;
  border-radius: 4px;
  border: none;
  margin-right: 10px;
}

.btn-primary {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  background-color: #0a6320;
  color: white;
  cursor: pointer;
}

.featured-events {
  margin-top: 40px;
  text-align: center;
}

.event-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}


.filters {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filters label {
  margin-bottom: 5px;
}

.filters select,
.filters input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
