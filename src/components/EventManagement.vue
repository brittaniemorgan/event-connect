<template>
  <div class="event-management">
    <div class="header">
      <h2>Manage Events</h2>
      <button @click="showAddEventModal = true" class="btn-primary">
        <i class="fas fa-plus"></i> Create Event
      </button>
    </div>
    <div v-if="events.length">
      <div v-for="event in events" :key="event.id" class="event-card">
        <h3>{{ event.title }}</h3>
        <p><strong>Date:</strong> {{ formatDate(event.date) }}</p>
        <p><strong>Location:</strong> {{ event.location }}</p>
        <p><strong>Status:</strong> {{ event.status }}</p>
        <div class="button-group">
          <button @click="openEditModal(event)" class="btn-primary">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button @click="viewEventDetail(event.id)" class="btn-secondary">
            <i class="fas fa-info-circle"></i> View Details
          </button>
          <button @click="openCancelModal(event)" class="btn-danger">
            <i class="fas fa-ban"></i> Cancel
          </button>
          <div class="dropdown">
            <button class="btn dropdown-toggle">
              More Actions <i class="fas fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a @click="selectEvent(event.id)">
                <i class="fas fa-users"></i> View Participants
              </a>
              <a @click="viewTickets(event)">
                <i class="fas fa-ticket-alt"></i> Manage Tickets
              </a>
              <a @click="scanTickets(event.id)">
                <i class="fas fa-qrcode"></i> Scan Tickets
              </a>
            </div>
          </div>
        </div>
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
      selectedEvent: null
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
      this.$router.push(`/events/${eventId}`);
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

.button-group {
  display: flex;
  gap: 10px;
}

.btn,
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

.btn:hover{
  background-color: #9f9b9b;
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

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background-color: #c0392b;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
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