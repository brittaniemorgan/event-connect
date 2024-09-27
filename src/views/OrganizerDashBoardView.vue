<template>
  <div class="dashboard-container">
    <!-- Sidebar Navigation -->
    <aside class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <div class="sidebar-header">
        <h1>Organizer Dashboard</h1>
        <button class="close-sidebar" @click="toggleSidebar">×</button>
      </div>
      <nav class="sidebar-nav">
        <button v-for="item in navItems" :key="item.id" @click="activeView = item.id"
          :class="{ active: activeView === item.id }" class="nav-button">
          {{ item.name }}
        </button>
      </nav>
    </aside>

    <main class="main-content">
      <button class="open-sidebar" @click="toggleSidebar">☰</button>

      <!-- Overview View -->
      <div v-if="activeView === 'overview'" class="dashboard-view overview-view">
        <h2>Overview</h2>
        <div class="overview-stats">
          <div class="stat-card">
            <h3>Total Events</h3>
            <p>{{ filteredEvents.length }}</p>
          </div>
          <div class="stat-card">
            <h3>Upcoming Events</h3>
            <p>{{ upcomingEvents.length }}</p>
          </div>
          <div class="stat-card">
            <h3>Total Registered Users</h3>
            <p>{{ totalRegisteredUsers }}</p>
          </div>
        </div>
      </div>

      <!-- Manage Events View -->
      <div v-if="activeView === 'events'" class="dashboard-view">
        <div class="event-controls">
          <input v-model="searchQuery" placeholder="Search events..." class="search-input" />
        </div>
        <EventManagement :events="filteredEvents" @edit-event="onEditEvent" @delete-event="onDeleteEvent"
          @select-event="selectEvent" @cancel-event="onEditEvent" @view-tickets="onViewTickets"/>
      </div>

      <!-- Registered Users View -->
      <div v-if="activeView === 'users'" class="dashboard-view">
        <h2>Registered Users</h2>
        <div class="user-controls">
          <select v-model="selectedEvent" @change="loadRegisteredUsers" class="event-select">
            <option value="">Select an event</option>
            <option v-for="event in filteredEvents" :key="event.id" :value="event">
              {{ event.title }}
            </option>
          </select>
        </div>
        <div v-if="selectedEvent">
          <h3>Users for {{ selectedEvent.title }}</h3>
          <RegisteredUserList :event="selectedEvent" />
          <ContactUserForm :users="registeredUsers" @send-message="handleSendMessage" />
        </div>
        <div v-else>
          <p>Please select an event to view registered users and contact them.</p>
        </div>
      </div>

      <!-- Ticket Management View -->
      <div v-if="activeView === 'tickets'" class="dashboard-view" >
        <TicketManagement :event="selectedEvent"/>
      </div>

      <!-- Reports View -->
      <div v-if="activeView === 'reports'" class="dashboard-view">
        <!--<EventReport :eventId="selectEvent.id" />-->
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EventManagement from '@/components/EventManagement.vue';
import RegisteredUserList from '@/components/RegisteredUserList.vue';
import ContactUserForm from '@/components/ContactUserForm.vue';
import TicketManagement from '@/components/TicketManagement.vue';
/*import EventReport from '@/components/EventReport.vue';*/

export default {
  name: 'OrganizerDashboard',
  components: {
    EventManagement,
    RegisteredUserList,
    ContactUserForm,
    TicketManagement,
    /*EventReport*/
  },
  data() {
    return {
      selectedEvent: null,
      activeView: 'overview',
      navItems: [
        { id: 'overview', name: 'Overview' },
        { id: 'events', name: 'Manage Events' },
        { id: 'users', name: 'Registered Users' },
        { id: 'tickets', name: 'Ticket Management' },
        { id: 'reports', name: 'Reports' },
      ],
      searchQuery: '',
      userSearchQuery: '',
      isSidebarOpen: false,
    };
  },
  computed: {
    ...mapGetters(['events', 'registeredUsers', 'currentUser']),
    upcomingEvents() {
      const now = new Date();
      return this.filteredEvents.filter(event => event.status === 'Upcoming' && new Date(event.date) >= now);
    },
    totalRegisteredUsers() {
      // TODO: Implement logic to calculate total registered users
      return 0;
    },
    filteredEvents() {
      return this.events.filter(event => {
        return event.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          event.organizerId == this.currentUser?.id
      });
    },
  },
  methods: {
    ...mapActions(['fetchEvents', 'fetchRegisteredUsers', 'sendUserMessage', 'cancelEvent', 'rescheduleEvent', 'editEvent', ]),
    onEditEvent(event) {
      this.editEvent(event)
        .then(() => {
          console.log(event)
          this.fetchEvents();
        })
        .catch(error => {
          console.error('Error editing event:', error);
        });
    },
    onDeleteEvent(eventId) {
      console.log('Deleting event:', eventId);
    },
    selectEvent(event) {
      this.selectedEvent = event;
      this.loadRegisteredUsers();
      this.activeView = 'users';
    },
    onViewTickets(event) {
      this.selectedEvent = event;
      this.activeView = 'tickets';
    },
    loadRegisteredUsers() {
      if (this.selectedEvent) {
        this.fetchRegisteredUsers(this.selectedEvent.id);
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    handleSendMessage({ userId, message }) {
      if (this.selectedEvent && userId && message) {
        this.sendUserMessage({ eventId: this.selectedEvent, userId, message });
        console.log(`Sending message to user ${userId} for event ${this.selectedEvent.title}: ${message}`);
      } else {
        console.error('Missing required information to send message');
      }
    },
  },
  created() {
    this.fetchEvents();
    if (this.$route.query['create-event'] === 'true') {
      this.showCreateEventModal = true;
      this.activeView = 'events';
    }
  }
};
</script>

<style scoped>

.ticket-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.generate-tickets-btn, .link-ticket-btn {
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.generate-tickets-btn:disabled, .link-ticket-btn:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.ticket-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.ticket-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.ticket-qr-code {
  max-width: 100%;
  height: auto;
  margin: 10px 0;
}
.dashboard-container {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.sidebar-header h1 {
  font-size: 1.5em;
  margin: 0;
  color: white;
}

.close-sidebar {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
}

.nav-button {
  background: none;
  border: none;
  color: white;
  padding: 10px;
  text-align: left;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.nav-button:hover,
.nav-button.active {
  background-color: #34495e;
}

.main-content {
  flex-grow: 1;
  padding: 30px;
  background-color: #ecf0f1;
  overflow-y: auto;
}

.open-sidebar {
  display: none;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  margin-bottom: 20px;
}

.dashboard-view {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.overview-view .overview-stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-card {
  background-color: #6eafda;
  color: white;
  padding: 20px;
  border-radius: 8px;
  flex: 1;
  min-width: 200px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.event-controls,
.user-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.event-select,
.search-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.event-select {
  flex: 1;
}

.search-input {
  flex: 2;
}

.registered-users-section {
  margin-top: 30px;
}

@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    transform: translateX(-100%);
    z-index: 1000;
  }

  .sidebar-open {
    transform: translateX(0);
  }

  .close-sidebar,
  .open-sidebar {
    display: block;
  }

  .main-content {
    padding: 20px;
  }

  .event-controls,
  .user-controls {
    flex-direction: column;
  }

  .event-select,
  .search-input {
    width: 100%;
  }
}
</style>
