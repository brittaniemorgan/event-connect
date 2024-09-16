<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Create a New Event</h2>
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
          <label for="cost">Ticket Cost:</label>
          <input type="number" v-model="form.cost" id="cost" required />
        </div>

        <div class="form-group">
          <label for="quantity">Quantity Available:</label>
          <input type="number" v-model="form.quantity" id="quantity" required />
        </div>

        <div class="form-group">
          <label for="image">Event Image:</label>
          <input type="file" @change="onFileChange" id="image" ref="imageInput" />
        </div>

        <div class="button-group">
          <button type="submit" class="btn-primary">Create Event</button>
          <button type="button" @click="$emit('close')" class="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "CreateEventModal",
  data() {
    return {
      form: {
        title: '',
        date: '',
        location: '',
        category: '',
        description: '',
        image: null
      }
    };
  },
  computed: {
    ...mapGetters(['categories'])
  },
  methods: {
    ...mapActions(['addEvent']),
    onFileChange(event) {
      const file = event.target.files[0];
      const fileType = file.type;
      const maxSize = 2 * 1024 * 1024;

      if (!fileType.startsWith('image/')) {
        alert('Only image files are allowed.');
        this.$refs.imageInput.value = ''; 
      } else if (file.size > maxSize) {
        alert('File size exceeds 2MB.');
        this.$refs.imageInput.value = '';
      } else {
        this.form.image = file;
      }
    }
    ,
    
    async submitForm() {
      try {
        await this.addEvent(this.form);
        this.$emit('event-created');
      } catch (error) {
        console.error('Error adding event:', error);
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh; 
  overflow-y: auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;  
  font-size: 0.8rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  height: 5%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #0a6320;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}
</style>