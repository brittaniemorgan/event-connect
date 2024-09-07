<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <form @submit.prevent="signup">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit" :disabled="isLoading">{{ isLoading ? 'Signing up...' : 'Sign Up' }}</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SignupView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: null,
      isLoading: false
    };
  },
  methods: {
    ...mapActions(['signupUser']),
    async signup() {
      this.isLoading = true;
      this.error = null;
      try {
        await this.signupUser({ name: this.name, email: this.email, password: this.password });
        this.$router.push('/');
      } catch (error) {
        this.error = error.message || 'Failed to sign up. Please try again.';
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.signup {
  text-align: center;
  padding: 50px 20px;
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #0a6320;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>