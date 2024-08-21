<template>
  <div class="create-event">
    <h1>Create New Event</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Event Title</label>
        <input type="text" v-model="event.title" id="title" required />
      </div>
      
      <div class="form-group">
        <label for="date">Event Date</label>
        <input type="date" v-model="event.date" id="date" required />
      </div>

      <div class="form-group">
        <label for="location">Location</label>
        <input type="text" v-model="event.location" id="location" required />
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <select v-model="event.category" id="category" required>
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="event.description" id="description" rows="4" required></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Create Event</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "CreateEventView",
  data() {
    return {
      event: {
        title: '',
        date: '',
        location: '',
        category: '',
        description: ''
      }
    };
  },
  computed: {
    ...mapGetters(['categories']),
  },
  methods: {
    ...mapActions(['createEvent', 'fetchCategories']),
    async handleSubmit() {
      if (this.validateForm()) {
        await this.createEvent(this.event);
        this.$router.push('/events');
      }
    },
    validateForm() {
      return (
        this.event.title &&
        this.event.date &&
        this.event.location &&
        this.event.category &&
        this.event.description
      );
    },
  },
  created() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
.create-event {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #0a6320;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #054314; 
}
</style>
