<template>
  <div class="home">
    <!-- Hero Section -->
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

    <!-- Featured Events Section -->
    <section class="featured-events">
      <h2>Featured Events</h2>
      <div class="event-list">
        <EventCard v-for="event in filteredEvents" :key="event.id" :event="event" />
      </div>
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
.home {
  padding: 20px;
}

.hero {
  /*background: url('g') center/cover no-repeat; */
  color: white;
  text-align: center;
  padding: 50px 20px;
  border-radius: 8px;
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

.hero-content button {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  background-color: #0a6320; 
  color: white;
  cursor: pointer;
}

.featured-events {
  margin-top: 40px;
}

.event-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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
