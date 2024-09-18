<template>
  <div class="ticket-management">
    <h2>Ticket Management</h2>
    <div class="event-selector">
      <select id="event" v-model="selectedEvent" @change="onEventChange" class="event-select">
        <option value="">Select an event</option>
        <option v-for="event in filteredEvents" :key="event.id" :value="event">{{ event.title }}</option>
      </select>
    </div>
    <div v-if="selectedEvent">
      <!-- Add New Ticket Type Form -->
      <div class="add-ticket-type">
        <h3>Add New Ticket Type</h3>
        <form @submit.prevent="onAddTicket">
          <div class="form-group">
            <label for="cost">Ticket Type:</label>
            <input v-model="newTicketType.ticketType" placeholder="Ticket Type" required />
          </div>

          <div class="form-group">
            <label for="cost">Ticket Cost:</label>
            <input v-model.number="newTicketType.price" type="number" placeholder="Price" required />
          </div>

          <div class="form-group">
            <label for="cost">Ticket Quantity:</label>
            <input v-model.number="newTicketType.quantity" type="number" placeholder="Quantity" required />
          </div>
          <button type="submit" class="btn-primary" style="width: 50%;">Add Ticket Type</button>
        </form>
      </div>

      <!-- Current Ticket Types -->
      <div class="current-ticket-types" v-if="tickets.length">
        <h3>Current Ticket Types</h3>
        <div v-for="ticket in tickets" :key="ticket.id" class="ticket-type">
          <div class="ticket-info">
            <h4>{{ selectedEvent.title }} | {{ ticket.ticketType }}</h4>
            <p>Price: ${{ ticket.price }}</p>
            <p>Remaining: {{ ticket.remaining }} / {{ ticket.quantity }}</p>
          </div>
          <div class="button-group">
            <button @click="openQRCode(ticket)" class="btn-secondary">View QR Code</button>
            <button @click="openEditModal(ticket)" class="btn-primary">Edit</button>
            <button @click="openDeleteModal(ticket)" class="btn-warning">Delete</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>There are no tickets created for this event.</p>
      </div>
    </div>
    <div v-else>
      <p>Please select an event to view and manage tickets.</p>
    </div>

    <!-- Edit Ticket Modal -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h3>Edit Ticket: {{ selectedEvent.title }} {{ selectedTicket.ticketType }}</h3>
        <form @submit.prevent="updateTicket">          
          <div class="form-group">
            <label for="cost">Ticket Type:</label>
            <input v-model="selectedTicket.ticketType" required />
          </div>

          <div class="form-group">
            <label for="cost">Ticket Cost:</label>
            <input v-model.number="selectedTicket.price" type="number" placeholder="Price" required />
          </div>

          <div class="form-group">
            <label for="cost">Ticket Quantity:</label>
            <input v-model.number="selectedTicket.quantity" type="number" placeholder="Quantity" required />
          </div>
          <div class="button-group">
            <button type="submit" class="btn-primary">Update</button>
            <button @click="closeEditModal" class="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- QR Code Modal -->
    <div v-if="showQRCode" class="modal">
      <div class="modal-content">
        <h3>QR Code for {{ selectedEvent.title }} {{ selectedTicket.ticketType }}</h3>
        <img :src="selectedTicket.qrCode" alt="Ticket QR Code" />
        <button @click="closeQRCode" class="btn-secondary">Close</button>
      </div>
    </div>

    <!-- Delete Ticket Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <h3>Are you sure you want to delete this ticket?</h3>
        <p>This action cannot be undone.</p>
        <div class="button-group">
          <button @click="deleteTicket(selectedTicket)" class="btn-danger">Yes, Delete</button>
          <button @click="closeDeleteModal" class="btn-secondary">No, Keep Ticket</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TicketManagement',
  props: {
    event: {
      type: Object
    }
  },
  data() {
    return {
      newTicketType: {
        ticketType: '',
        price: null,
        quantity: null,
      },
      showEditModal: false,
      showDeleteModal: false,
      showQRCode: false,
      selectedTicket: null,
      selectedEvent: this.event,
    };
  },
  computed: {
    ...mapGetters(['events', 'tickets', 'currentUser']),
    filteredEvents() {
      return this.events.filter(event => {
        return event.organizerId == this.currentUser?.id
      });
    }
  },
  methods: {
    ...mapActions(['fetchEvents', 'addTicket', 'editTicket', 'fetchTickets']),
    onAddTicket() {
      if (this.selectedEvent?.id) {
        this.addTicket({ ...this.newTicketType, eventId: this.selectedEvent.id });
        this.newTicketType = { name: '', price: null, quantity: null };
      }
    },
    openEditModal(ticket) {
      this.showEditModal = true;
      this.selectedTicket = ticket;
    },
    updateTicket() {
      this.editTicket(this.selectedTicket);
      this.closeEditModal();
    },
    openDeleteModal(ticket) {
      this.showDeleteModal = true;
      this.selectedTicket = ticket;
    },
    deleteTicket() {
      this.editTicket({...this.selectedTicket, deleted : 1});
      this.closeDeleteModal();
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.selectedTicket = null;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.selectedTicket = null;
    },
    openQRCode(ticket) {
      this.selectedTicket = ticket;
      this.showQRCode = true;
    },
    closeQRCode() {
      this.showQRCode = false;
      this.selectedTicket = null;
    },
    onEventChange() {
      if (this.selectedEvent?.id) {
        this.fetchTickets(this.selectedEvent.id);
      }
    }
  },
  created() {
    this.fetchEvents();
    if (this.filteredEvents.length) {
      this.fetchTickets(this.selectedEvent?.id);
    }
  }
};
</script>

<style scoped>
.ticket-management {
  max-width: 800px;
  margin: 0 auto;
}

.add-ticket-type form,
.ticket-type,
.modal-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.ticket-type {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 400px;
}


.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.8rem;
}

.form-group input,
.form-group select {
  width: 100%;
  height: 5%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-primary,
.btn-secondary,
.btn-warning,
.btn-danger,
.btn-info {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #0a6320;
  color: white;
}

.btn-primary:hover {
  background-color: #0a6320b1;
}

.btn-secondary {
  background-color: #3498db;
  color: white;
}

.btn-secondary:hover {
  background-color: #2980b9;
}

.btn-warning {
  background-color: #f39c12;
  color: white;
}

.btn-warning:hover {
  background-color: #d35400;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background-color: #c0392b;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.event-select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  width: 100%;
}

.event-select {
  flex: 1;
}
</style>