<template>
    <div class="contact-user-form">
      <h2>Contact Users</h2>
      <form @submit.prevent="sendContactMessage">
        <select v-model="selectedUser">
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }} - {{ user.email }}
          </option>
        </select>
        <textarea v-model="message" placeholder="Write your message here..." required></textarea>
        <button type="submit" class="btn-primary">Send Message</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContactUserForm',
    props: {
      users: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        selectedUser: null,
        message: ''
      };
    },
    methods: {
      sendContactMessage() {
        this.$emit('send-message', { userId:1, message: this.message });
        this.message = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .contact-user-form {
    padding: 20px;
  }
  
  .contact-user-form select,
  .contact-user-form textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .contact-user-form button {
    background-color: #0a6320;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  