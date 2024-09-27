<template>
  <div class="event-details">
    <button class="btn-primary" @click="goBack">Back to Events</button>
    <div v-if="event" class="event-content">
      <h1 class="event-title">{{ event.title }}</h1>
      <p><strong>Date:</strong> {{ formatDate(event.date) }}</p>
      <p><strong>Location:</strong> {{ event.location }}</p>
      <p><strong>Category:</strong> {{ event.category }}</p>
      <p><strong>Status:</strong> <span :class="statusClass">{{ event.status }}</span></p>
      <p><strong>Organizer:</strong> {{ event.organizerId }}</p>
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

      <div v-else-if="event.status === 'Upcoming'">
        <button class="btn-primary" @click="showPurchaseModal = true">
          Purchase Ticket
        </button>
        <p>Come back and leave a review after the event!</p>
      </div>
      <div v-else-if="event.status === 'Sold Out'">
        <p class="sold-out-message">This event is sold out. Check back later for any updates.</p>
      </div>
      <div v-else-if="event.status === 'Cancelled'">
        <p class="cancelled-message">We're sorry, this event has been cancelled. If you purchased a ticket, you will be
          contacted for a refund.</p>
      </div>
    </div>

    <div v-else>
      <p>Loading event details...</p>
    </div>

    <TicketPurchaseModal v-if="showPurchaseModal" @close="showPurchaseModal = false" :event="event" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { format, isBefore } from 'date-fns';
import ReviewForm from "@/components/ReviewForm.vue";
import TicketPurchaseModal from "@/components/TicketPurchaseModal.vue";

export default {
  name: "EventDetailsView",
  components: {
    ReviewForm,
    TicketPurchaseModal
  },
  data() {
    return {
      showPurchaseModal: false
    };
  },
  computed: {
    ...mapGetters(['eventDetails', 'currentUser', 'hasUserPurchasedTicket', 'eventReviews']),
    event() {
      return this.eventDetails[this.$route.params.id] || null;
    },
    isEventCompleted() {
      if (this.event) {
        return isBefore(new Date(this.event.date), new Date());
      }
      return false;
    },
    statusClass() {
      if (!this.event) return '';
      switch (this.event.status) {
        case 'Upcoming': return 'status-upcoming';
        case 'Sold Out': return 'status-sold-out';
        case 'Cancelled': return 'status-cancelled';
        default: return '';
      }
    }
  },
  methods: {
    ...mapActions(['fetchEventDetails', 'submitEventReview', 'fetchPurchasedTickets', 'fetchEventReviews']),
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
      this.submitEventReview(review)
    }
  },
  created() {
    const eventId = this.$route.params.id;
    this.fetchEventDetails(eventId);
    this.fetchEventReviews(eventId);

    if (this.currentUser) {
      this.fetchPurchasedTickets(this.currentUser.email);
    }
  }
};
</script>

<style scoped>
.event-details {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.btn-primary {
  padding: 12px 24px;
  background-color: #0a6320;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 16px;
}

.event-title {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #0a6320;
}

.event-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.event-image {
  width: 100%;
  max-width: 600px;
  height: 300px; 
  overflow: hidden; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  margin-bottom: 20px;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.review {
  font-size: 90%;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.status-upcoming {
  color: #28a745;
  font-weight: bold;
}

.status-sold-out {
  color: #ffc107;
  font-weight: bold;
}

.status-cancelled {
  color: #dc3545;
  font-weight: bold;
}

.sold-out-message,
.cancelled-message {
  font-style: italic;
  color: #6c757d;
  margin-top: 20px;
}
</style>
