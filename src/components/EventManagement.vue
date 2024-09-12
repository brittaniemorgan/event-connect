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
        <button @click="editEvent(event)" class="btn-secondary">Edit</button>
        <button @click="selectEvent(event.id)" class="btn-secondary">View Participants</button>
        <button @click="confirmDeleteEvent(event.id)" class="btn-danger">Delete</button>
      </div>
    </div>
    <div v-else>
      <p>No events found. Create a new event to get started!</p>
    </div>
    
    <CreateEventModal 
      v-if="showAddEventModal" 
      @close="showAddEventModal = false"
      @event-created="onEventCreated"
    />
  </div>
</template>

<script>
import { format } from 'date-fns';
import CreateEventModal from './CreateEventModal.vue';

export default {
  name: 'EventManagement',
  components: {
    CreateEventModal
  },
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showAddEventModal: false
    };
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), 'MMMM dd, yyyy');
    },
    editEvent(event) {
      this.$emit('edit-event', event);
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
      this.$emit('refresh-events');
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
.btn-danger {
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

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background-color: #c0392b;
}
</style>