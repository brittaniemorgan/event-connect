<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Edit Event</h2>
      <form @submit.prevent="submitEditEvent">
        <div class="form-group">
          <label for="title">Event Title</label>
          <input v-model="eventData.title" id="title" type="text" required />
        </div>

        <div class="form-group">
          <label for="date">Event Date</label>
          <input v-model="eventData.date" id="date" type="date" required />
        </div>

        <div class="form-group">
          <label for="location">Location</label>
          <input v-model="eventData.location" id="location" type="text" required />
        </div>

        <div class="form-group">
          <label for="category">Category:</label>
          <select v-model="eventData.category" id="category" required>
            <option v-for="category in categories" :key="category.id" :value="category.name">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="description">Event Description:</label>
          <textarea v-model="eventData.description" id="description" required></textarea>
        </div>

        <div class="form-group">
          <label for="image">Event Image:</label>
          <input type="file" @change="onFileChange"  id="image" ref="imageInput" />
        </div>

        <div class="button-group">
          <button type="submit" class="btn-primary">Save Changes</button>
          <button type="button" @click="$emit('close')" class="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EditEventModal',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      eventData: { ...this.event, image: null },
    };
  },
  computed: {
    ...mapGetters(['categories'])
  },
  methods: {
    ...mapActions(['fetchCategories']),
    submitEditEvent() {
      const formData = new FormData();
      formData.append('id', this.eventData.id);
      formData.append('title', this.eventData.title);
      formData.append('date', this.eventData.date);
      formData.append('location', this.eventData.location);
      formData.append('category', this.eventData.category);
      formData.append('description', this.eventData.description);
      formData.append('status', "Upcoming");

      if (this.eventData.image) {
        formData.append('image', this.eventData.image);
      }
      if (this.eventData.date !== this.event.date) {
        if (confirm('The event date has been changed. Would you like to reschedule the event?')) {
          this.$emit('edit-event', formData);
          this.$emit('close');
        }
      } else {
        this.$emit('edit-event', formData);
        this.$emit('close');
      }
    },
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
        this.eventData.image = file;
      }
    }
  },
  created() {
    this.fetchCategories();
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