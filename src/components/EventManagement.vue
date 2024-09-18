<template>
  <div class="event-management">
    <div class="header">
      <h2>Manage Events</h2>
      <button @click="showAddEventModal = true" class="btn-primary">Create Event</button>
    </div>
    <div v-if="events.length">
      <div v-for="event in events" :key="event.id" class="event-card">
        <h3>{{ event.title }}</h3>
        <p><strong>Date:</strong> {{ formatDate(event.date) }}</p>
        <p><strong>Location:</strong> {{ event.location }}</p>
        <p><strong>Status:</strong> {{ event.status }}</p>
        <button @click="openEditModal(event)" class="btn-primary">Edit</button>
        <button @click="selectEvent(event.id)" class="btn-secondary">View Participants</button>
        <button @click="viewTickets(event)" class="btn-secondary">Manage Tickets</button>        
        <button @click="openCancelModal(event)" class="btn-warning">Cancel</button>
        <button @click="viewEventDetail(event.id)" class="btn-primary">View Details</button>        
        <button @click="scanTickets(event.id)" class="btn-primary">Scan Tickets</button>
        <!-- <button @click="confirmDeleteEvent(event.id)" class="btn-danger">Delete</button> -->
      </div>
    </div>
    <div v-else>
      <p>No events found. Create a new event to get started!</p>
    </div>
    <CreateEventModal v-if="showAddEventModal" @close="showAddEventModal = false" @event-created="onEventCreated" />

    <EditEventModal v-if="showEditEventModal" :event="selectedEvent" @close="closeEditModal"
      @edit-event="handleEditEvent" />

    <CancelEventModal v-if="showCancelModal" :event="selectedEvent" @close="closeCancelModal"
      @cancel-event="handleCancelEvent" />
  </div>
</template>

<script>
import CancelEventModal from './CancelEventModal.vue';
import CreateEventModal from './CreateEventModal.vue';
import EditEventModal from './EditEventModal.vue';

export default {
  name: 'EventManagement',
  components: {
    CreateEventModal,
    EditEventModal,
    CancelEventModal
  },
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showAddEventModal: false,
      showEditEventModal: false,
      showCancelModal: false,
    };
  },
  methods: {
    formatDate(date) {
      return new Date(date + "T00:00:00").toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    },
    openEditModal(event) {
      console.log(event)
      this.selectedEvent = event;
      this.showEditEventModal = true;
    },
    closeEditModal() {
      this.showEditEventModal = false;
      this.selectedEvent = null;
    },
    handleEditEvent(updatedEvent) {
      this.$emit('edit-event', updatedEvent);
      this.showEditEventModal = false;
    },
    confirmDeleteEvent(eventId) {
      if (confirm('Are you sure you want to delete this event?')) {
        this.$emit('delete-event', eventId);
      }
    },
    selectEvent(eventId) {
      this.$emit('select-event', eventId);
    },
    onEventCreated() {
      this.showAddEventModal = false;
    },
    openCancelModal(event) {
      this.selectedEvent = event;
      this.showCancelModal = true;
    },
    closeCancelModal() {
      this.showCancelModal = false;
      this.selectedEvent = null;
    },
    handleCancelEvent(event) {
      this.$emit('cancel-event', event);
      this.showCancelModal = false;
    },
    viewTickets(event) {
      this.$emit('view-tickets', event)
    },
    viewEventDetail(eventId) {
      this.$router.push(`/event/${eventId}`);
    },
    scanTickets(eventId) {
      this.$router.push(`/scan-tickets/${eventId}`);
    }
  }
};
</script>


<style scoped>
.event-management {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.event-card {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
}

.event-card button {
  margin-right: 10px;
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

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}

.modal {
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

.modal-content input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}
</style>
