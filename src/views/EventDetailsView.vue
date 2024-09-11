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
        <img :src="getImagePath(event.image)" :alt="event.title + ' Image'" />
      </div>

      <div v-if="isEventCompleted">
        <h3>Reviews</h3>
        <div v-if="eventReviews(event.id).length === 0">
          <p>Be the first to leave a review!</p>
          <ReviewForm :eventId="event.id" @submit-review="handleReviewSubmit" />
        </div>
        <div v-else>
          <div v-for="review in eventReviews(event.id)" :key="review.id" class="review">
            <p><strong>User:</strong> {{ review.email }}</p>
            <p><strong>Rating:</strong> {{ review.rating }}</p>
            <p><strong>Review:</strong> {{ review.text }}</p>
            <p><strong>Date:</strong> {{ review.date }}</p>
          </div>
          <ReviewForm :eventId="event.id" @submit-review="handleReviewSubmit" />
        </div>
      </div>
      <div v-else>
        <button v-if="!currentUser || (currentUser && !isUserRegisteredForEvent(event.id))" class="btn-primary"
          @click="showRegistrationModal = true">Register for
          Event</button>
        <button v-else class="btn-disabled">You are Registered</button>
      <p>Come back a leave a review after the event!</p>
    </div>
  </div>

  <div v-else>
    <p>Loading event details...</p>
  </div>

  <RegistrationModal v-if="showRegistrationModal" @close="showRegistrationModal = false" :eventId="event.id" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { format, isBefore } from 'date-fns';
import ReviewForm from "@/components/ReviewForm.vue";
import RegistrationModal from "@/components/RegistrationModal.vue";

export default {
  name: "EventDetailsView",
  components: {
    ReviewForm,
    RegistrationModal
  },
  data() {
    return {
      showRegistrationModal: false
    };
  },
  computed: {
    ...mapGetters(['eventDetails', 'isAuthenticated', 'currentUser', 'isUserRegisteredForEvent', 'eventReviews']),
    event() {
      return this.eventDetails[this.$route.params.id] || null;
    },
    isEventCompleted() {
      if (this.event) {
        return isBefore(new Date(this.event.date), new Date());
      }
      return false;
    }
  },
  methods: {
    ...mapActions(['fetchEventDetails', 'submitEventReview', 'fetchRegisteredEvents', 'fetchEventReviews']),
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
    },
    handleReviewSubmit(review) {
      this.submitEventReview(review).then(() => {
        this.fetchEventReviews(this.event.id);
      }).catch(error => {
        console.error("Error submitting review:", error);
      });
    }
  },
  created() {
    const eventId = this.$route.params.id;
    this.fetchEventDetails(eventId);
    this.fetchEventReviews(eventId);

    if (this.currentUser) {
      this.fetchRegisteredEvents(this.currentUser.email);
    }
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

.btn-disabled {
  padding: 10px 20px;
  background-color: #a1a1a1;
  color: rgb(52, 52, 52);
  border: none;
  border-radius: 4px;
  cursor: not-allowed;
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

.review {
  font-size: 80%;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 10px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
