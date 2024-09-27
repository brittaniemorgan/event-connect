<template>
    <div class="user-details">
      <button class="btn-close" @click="$emit('close')">Close</button>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Registration Date:</strong> {{ formatDate(user.purchaseDate) }}</p>
      <!-- Add any other user details you need here -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserDetails',
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    methods:{
      formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    },
    }
  };
  </script>
  
  <style scoped>
  .user-details {
    padding: 20px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .btn-close {
    background: #ff5c5c;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .btn-close:hover {
    background: #e04b4b;
  }
  </style>
  