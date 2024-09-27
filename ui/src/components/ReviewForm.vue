<template>
  <div class="review-form">
    <h3>Leave a Review</h3>
    <form @submit.prevent="submitReview">
      <textarea v-model="reviewText" placeholder="Write your review here..." required></textarea>
      <div class="rating">
        <label>Rating:</label>
        <label>Rating:</label>
        <div class="stars">
          <span v-for="n in 5" :key="n" @click="rating = n" @mouseover="hoverRating = n"
            @mouseleave="hoverRating = null" :class="{ 'star': true, 'filled': n <= (hoverRating || rating) }">
            ★
          </span>
        </div>
      </div>
      <button type="submit" class="btn-primary">Submit Review</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ReviewForm",
  data() {
    return {
      reviewText: '',
      rating: null,
      hoverRating: null
    };
  },
  props: {
    eventId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    submitReview() {
      const review = {
        text: this.reviewText,
        rating: this.rating,
        eventId: this.eventId
      };
      this.$emit('submit-review', review);
      this.reviewText = '';
      this.rating = null;
      this.hoverRating = null;
    }
  }
};
</script>

<style scoped>
.review-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

textarea {
  width: 80%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.rating {
  margin-bottom: 10px;
}

.rating label {
  margin-right: 10px;
}

.stars {
  display: flex;
  font-size: 1.5em;
}

.star {
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s;
}

.star.filled {
  color: #f39c12;
}


.btn-primary {
  background-color: #0a6320;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>