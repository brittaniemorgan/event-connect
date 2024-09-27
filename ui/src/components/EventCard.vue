<template>
  <div class="event-card">
    <img :src="getImagePath(event.image)" :alt="event.title" />
    <div class="event-info">
      <h3>{{ event.title }}</h3>
      <p>{{ formattedDate }} - {{ event.location }}</p>
      <router-link :to="`/events/${event.id}`" class="btn-details">View Details</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      return new Date(this.event.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  },
  methods: {
    getImagePath(imageName) {
      try {
        const images = require.context('../assets/event_images', false, /\.(png|jpg|jpeg)$/);
        return images(`./${imageName}`) || images('./fallback_image.png');
      } catch (e) {
        return require('../assets/event_images/fallback_image.png');
      }
    }
  }
};
</script>

<style scoped>
.event-card {
  width: 250px;
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.event-card:hover {
  transform: scale(1.05);
}

.event-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.event-info {
  padding: 10px;
  background-color: #fff;
}

.event-info h3 {
  margin: 0;
  font-size: 1.2em;
}

.event-info p {
  margin: 5px 0 0;
  color: #666;
  font-size: 0.9em;
}

.btn-details {
  display: inline-block;
  padding: 8px 12px;
  margin-top: 10px;
  color: #fff;
  background-color: #007bff;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
}

.btn-details:hover {
  background-color: #0056b3;
}
</style>
