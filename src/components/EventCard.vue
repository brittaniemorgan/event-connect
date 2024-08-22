<template>
    <div class="event-card">
      <img :src="getImagePath(event.image)" :alt="event.title" />
      <div class="event-info">
        <h3>{{ event.title }}</h3>
        <p>{{ event.date }} - {{ event.location }}</p>
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
    methods: {
    getImagePath(imageName) {
      try {
        return require(`../assets/event_images/${imageName}`);
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
  }
  
  .event-card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .event-info {
    padding: 10px;
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
  </style>
  