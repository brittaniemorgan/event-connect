<template>
  <div class="event-details">
    <button class="btn-primary" @click="goBack">Back to Events</button>
    <div v-if="event" class="event-content">
      <h1>{{ event.title }}</h1>
      <p><strong>Date:</strong> {{ formatDate(event.date) }}</p>
      <p><strong>Location:</strong> {{ event.location }}</p>
      <p><strong>Category:</strong> {{ event.category }}</p>
      <p><strong>Description:</strong></p>
      <p>{{ event.description }}</p>
      <div v-if="getImagePath(event.image)" class="event-image">
        <img :src="getImagePath(event.image)" alt="Event Image" />
      </div>
    </div>
    <div v-else>
      <p>Loading event details...</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { format } from 'date-fns';

export default {
  name: "EventDetailsView",
  computed: {
    ...mapGetters(['eventDetails']),
    event() {
      return this.eventDetails[this.$route.params.id] || null;
    }
  },
  methods: {
    ...mapActions(['fetchEventDetails']),
    formatDate(date) {
      return format(new Date(date), 'MMMM dd, yyyy');
    },
    goBack() {
      this.$router.go(-1);
    },
    getImagePath(imageName) {
      try {
        const images = require.context('../assets/event_images', false, /\.(png|jpg|jpeg)$/);
        return images(`./${imageName}`) || images('./fallback_image.png');
      } catch (e) {
        return require('../assets/event_images/fallback_image.png');
      }
    }
  },
  created() {
    const eventId = this.$route.params.id;
    this.fetchEventDetails(eventId)
  }
};
</script>

<style scoped>
.event-details {
  padding: 20px;
}

.btn-primary {
  padding: 10px 20px;
  background-color: #0a6320;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.event-content {
  max-width: 800px;
  margin: 0 auto;
}

.event-image img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>
