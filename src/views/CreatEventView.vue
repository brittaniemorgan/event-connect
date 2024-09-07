<template>
  <div class="create-event">
    <h1>Create a New Event</h1>
    <div v-if="message" :class="{ success: isSuccess, error: !isSuccess }" class="flash-message">
        {{ message }}
      </div>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Event Title:</label>
        <input type="text" v-model="form.title" id="title" required />
      </div>

      <div class="form-group">
        <label for="date">Event Date:</label>
        <input type="date" v-model="form.date" id="date" required />
      </div>

      <div class="form-group">
        <label for="location">Location:</label>
        <input type="text" v-model="form.location" id="location" required />
      </div>

      <div class="form-group">
        <label for="category">Category:</label>
        <select v-model="form.category" id="category" required>
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="description">Event Description:</label>
        <textarea v-model="form.description" id="description" required></textarea>
      </div>

      <div class="form-group">
        <label for="image">Event Image:</label>
        <input type="file" @change="onFileChange" id="image" ref="imageInput" />
      </div>

      <button type="submit" class="btn-primary">Create Event</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "CreateEventView",
  data() {
    return {
      form: {
        title: '',
        date: '',
        location: '',
        category: '',
        description: '',
        image: null
      },
      message: '',
      isSuccess: false
    };
  },
  computed: {
    ...mapState(['categories'])
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      this.form.image = file;
    },
    async submitForm() {
      const newEvent = {
        title: this.form.title,
        date: this.form.date,
        location: this.form.location,
        category: this.form.category,
        description: this.form.description,
        image: this.form.image
      };

      try {
        await this.$store.dispatch('addEvent', newEvent);
        this.message = 'Event added successfully!';
        this.isSuccess = true;
        this.resetForm();
      } catch (error) {
        this.message = 'Error adding event. Please try again.';
        this.isSuccess = false;
      }
    },
    resetForm() {
      this.form = {
        title: '',
        date: '',
        location: '',
        category: '',
        description: '',
        image: null
      };
      this.$refs.imageInput.value = null;
    }
  },
  created() {
    this.$store.dispatch('fetchCategories');
  }
};
</script>

<style scoped>
.create-event {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.form-group textarea {
  resize: vertical;
}

.btn-primary {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #0a6320;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0a6320b1;
}

.flash-message {
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  color: black;
  text-align: center;
}

.flash-message.success {
  background-color: #b7f7c6;
}

.flash-message.error {
  background-color: #f0bcc1;
}
</style>
