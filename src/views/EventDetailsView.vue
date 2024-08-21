<template>
  <div class="event-details">
    <h1>{{ event.title }}</h1>
    <img :src="event.image" :alt="event.title" />
    <p>{{ event.date }} - {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
export default {
  name: "EventDetailsView",
  data() {
    return {
      event: {
        title: "Music Festival",
        date: "2024-09-01",
        location: "New York, NY",
        image: "path/to/image1.jpg",
        description: "Join us for an unforgettable experience with live music!",
      },
    };
  },
};
</script>

<style scoped>
.event-details {
  text-align: center;
  padding: 20px;
}

.event-details img {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.event-details p {
  font-size: 1.2em;
  color: #333;
}
</style>
