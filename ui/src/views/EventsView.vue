<template>
  <div class="events">
    <header class="header">
      <h1>All Events</h1>
      <router-link to="/organizer-dashboard?create-event=true" class="btn-primary">Create Event</router-link>
    </header>

    <section class="hero">
      <div class="hero-content">
        <h2>Discover Events Around You</h2>
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="Search for events..." @input="updateFilter('searchQuery', searchQuery)" />
          <button class="btn-primary">Search</button>
        </div>
      </div>
    </section>

    <section class="filters-container">
      <div class="filters">
        <div class="filter-group">
          <label for="category">Category:</label>
          <select v-model="selectedCategory" @change="updateFilter('category', selectedCategory)">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.name">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label for="location">Location:</label>
          <input type="text" v-model="selectedLocation" @input="updateFilter('location', selectedLocation)"
            placeholder="Enter location..." />
        </div>

        <div class="filter-group">
          <label for="date">Date:</label>
          <input type="date" v-model="selectedDate" @change="updateFilter('date', selectedDate)" />
        </div>
      </div>
      <button @click="resetFilters" class="btn-secondary">Reset Filters</button>
    </section>

    <section class="event-grid">
      <div v-if="loading" class="loading">Loading...</div>
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </section>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapActions, mapGetters, mapMutations } from 'vuex';

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
      selectedDate: "",
      loading: true,
      showLoadingPopup: false,
      loadingTimer: null
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
    ...mapMutations(['setSearchQuery', 'setSelectedCategory', 'setSelectedLocation', 'setSelectedDate']),
    updateFilter(filterType, value) {
      switch (filterType) {
        case 'searchQuery':
          this.setSearchQuery(value);
          break;
        case 'category':
          this.setSelectedCategory(value);
          break;
        case 'location':
          this.setSelectedLocation(value);
          break;
        case 'date':
          this.setSelectedDate(value);
          break;
      }
    },
    resetFilters() {
      this.searchQuery = "";
      this.selectedCategory = "";
      this.selectedLocation = "";
      this.selectedDate = "";
      this.updateFilter('searchQuery', "");
      this.updateFilter('category', "");
      this.updateFilter('location', "");
      this.updateFilter('date', "");
    },
    async loadEvents() {
      this.loading = true;
      await this.fetchEvents();
      this.loading = false;
    }
  },
  created() {
    this.fetchCategories();
    this.loadEvents();
  }
};
</script>

<style scoped>
.events {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
}

header a {
  text-decoration: none;
}

.btn-primary {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  background-color: #0a6320;
  color: white;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0a6320b1;
}

.btn-secondary {
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.hero {
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
}

.hero-content h2 {
  margin: 0 0 10px;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.search-bar input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 300px;
}

.filters-container {
  margin-bottom: 20px;
  text-align: center;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-group label {
  font-weight: bold;
}

.filter-group select,
.filter-group input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.event-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.loading-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  z-index: 1000;
}
</style>
