<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Buy a Ticket</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="event">Event:</label>
          <input type="text" id="event" :value="event.title" disabled />
        </div>

        <div class="form-group">
          <label for="ticketId">Ticket Type:</label>
          <select v-model="form.ticketId" id="ticketId" required>
            <option v-for="ticket in tickets" :key="ticket.id" :value="ticket.id">
              {{ ticket.ticketType }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="quantity">Quantity:</label>
          <input type="number" v-model="form.quantity" id="quantity" min="1" required />
        </div>

        <div class="form-group">
          <label for="name">Full Name:</label>
          <input type="text" v-model="form.name" id="name" required />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="form.email" id="email" required />
        </div>

        <div class="form-group">
          <label for="paymentMethod">Payment Method:</label>
          <select v-model="form.paymentMethod" id="paymentMethod" required>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div class="button-group">
          <button type="submit" class="btn-primary">Purchase Ticket</button>
          <button type="button" @click="$emit('close')" class="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "TicketPurchaseModal",
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        eventId: this.event.id,
        ticketId: null,
        quantity: 1,
        name: '',
        email: '',
        paymentMethod: 'creditCard'
      }
    };
  },
  computed: {
    ...mapGetters(['events', 'currentUser', 'tickets']),
  },
  methods: {
    ...mapActions(['purchaseTicket', 'fetchEvents', 'loginUser', 'setFlashMessage', 'fetchTickets']),
    async submitForm() {
      try {
        this.form.eventId = this.event.id;
        await this.purchaseTicket(this.form);
        this.setFlashMessage({ message: 'Ticket purchased successfully.', type: 'info' });
      } catch (error) {
        this.error = 'Error purchasing ticket:' + error || 'Please try again.';
        console.error('Error purchasing ticket:', error);
      }
      this.$emit('close');
    }
  },
  created() {
    this.form.name = this.currentUser?.name || "";
    this.form.email = this.currentUser?.email || "";
    this.fetchEvents();
    this.fetchTickets(this.event.id)
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #0a6320;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}
</style>