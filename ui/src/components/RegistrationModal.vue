<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <button class="modal-close" @click="close">X</button>
      <h2>Register for Event</h2>
      <form @submit.prevent="register" class="registration-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="userDetails.name" id="name" type="text" placeholder="Name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="userDetails.email" id="email" type="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input v-model="userDetails.phone" id="phone" type="tel" placeholder="Phone" required />
        </div>
        <button type="submit" class="btn-primary">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "RegistrationModal",
  props: {
    eventId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      userDetails: {
        name: '',
        email: '',
        phone: ''
      }
    };
  },
  methods: {
    ...mapActions(['registerForEvent']),
    close() {
      this.$emit('close');
    },
    register() {
      this.registerForEvent({ ...this.userDetails, eventId: this.eventId })
        .then(() => {
          this.$emit('close');
          alert('Successfully registered!');
        })
        .catch(error => {
          console.error("Error registering for event:", error);
          alert('Registration failed. Please try again.');
        });
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
}

.registration-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 80%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-primary {
  padding: 10px 20px;
  background-color: #0a6320;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
