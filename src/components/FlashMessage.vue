<template>
  <div v-if="flashMessage" :class="`flash-message flash-${flashType}`">
    {{ flashMessage }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['flashMessage', 'flashType'])
  },
};
</script>

<style scoped>
.flash-message {
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  color: #000000;
  font-size: 1em;
  font-weight: bold;
  transition: opacity 0.5s ease, transform 0.5s ease;
  opacity: 1;
  transform: translateY(0);
}

.flash-message.fade-out {
  opacity: 0;
  transform: translateY(-20px);
}

.flash-info {
  background-color: #d1ecf1;
  border: 1px solid #bee5eb;
  color: #0c5460;
}

.flash-warning {
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  color: #856404;
}

.flash-danger {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}
</style>
