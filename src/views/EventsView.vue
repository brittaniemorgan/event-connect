<template>
  <div class="events">
    <h1>All Events</h1>    
    <section class="hero">
      <div class="hero-content">
        <h1>Discover Events Around You</h1>
        <p>Find and attend the best events in your city.</p>
        <input type="text" v-model="searchQuery" placeholder="Search for events..." />
        <button @click="searchEvents">Search</button>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filters">
      <label for="category">Category:</label>
      <select v-model="selectedCategory" @change="updateFilter('category', selectedCategory)">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category.id" :value="category.name">
          {{ category.name }}
        </option>
      </select>
      <label for="location">Location:</label>
      <input type="text" v-model="selectedLocation" @input="updateFilter('location', selectedLocation)" placeholder="Enter location..." />

      <label for="date">Date:</label>
      <input type="date" v-model="selectedDate" @change="updateFilter('date', selectedDate)" />
    </section>

    <div class="event-grid">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "EventsView",
  components: {
    EventCard,
  },
  data() {
    return {
      searchQuery: "",
      selectedCategory: "",
      selectedLocation: "",
      selectedDate: ""
    };
  },
  computed: {
    ...mapGetters(['events', 'categories']),
    filteredEvents() {
      return this.events.filter(event =>
        event.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    ...mapActions(['fetchEvents', 'fetchCategories']),
    updateFilter(filterType, value) {
      switch (filterType) {
        case 'category':
          this.$store.commit('setSelectedCategory', value);
          break;
        case 'location':
          this.$store.commit('setSelectedLocation', value);
          break;
        case 'date':
          this.$store.commit('setSelectedDate', value);
          break;
      }
    },
    searchEvents() {
      console.log("Searching for:", this.searchQuery);
    }
  },
  created() {
    this.fetchEvents();
    this.fetchCategories();
  }
};
</script>

<style scoped>
.event-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}
</style>