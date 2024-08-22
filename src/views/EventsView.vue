<template>
  <div class="events">
    <h1>All Events</h1>
    <section class="hero">
      <div class="hero-content">
        <h1>Discover Events Around You</h1>
        <input type="text" v-model="searchQuery" placeholder="Search for events..." />
        <button @click="searchEvents" class="btn-primary">Search</button>
      </div>
    </section>
    
    <div class="filters-container">
      <section class="filters">
        <label for="category">Category:</label>
        <select v-model="selectedCategory" @change="updateFilter('category', selectedCategory)">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name }}
          </option>
        </select>
        <label for="location">Location:</label>
        <input type="text" v-model="selectedLocation" @input="updateFilter('location', selectedLocation)"
          placeholder="Enter location..." />

        <label for="date">Date:</label>
        <input type="date" v-model="selectedDate" @change="updateFilter('date', selectedDate)" />
      </section>
    </div>

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
div{
  padding: 10px;
}

.event-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.hero {
  text-align: center;
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

.filters-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filters {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;
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