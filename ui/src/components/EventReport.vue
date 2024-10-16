<template>
  <div class="event-report">
    <h2>Event Report</h2>
    <div class="event-selector">
      <select v-model="selectedEventId" @change="fetchReport" class="event-select">
        <option value="" disabled>Select an event</option>
        <option v-for="event in filteredEvents" :key="event.id" :value="event.id">
          {{ event.title }}
        </option>
      </select>
    </div>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="selectedEventId">
      <div v-if="report">
        <div class="report-summary">
          <h3>{{ report.event.title }} Report</h3>
          <div class="report-section">
            <div class="report-item">
              <strong>Total Tickets Sold:</strong>
              <p>{{ report.totalTicketsSold }}</p>
            </div>
            <div class="report-item">
              <strong>Total Revenue:</strong>
              <p>${{ report.totalRevenue?.toFixed(2) }}</p>
            </div>
            <div class="report-item">
              <strong>Average Rating:</strong>
              <p>{{ report.reviewSummary.averageRating?.toFixed(1) }}</p>
            </div>
          </div>
        </div>

        <!-- Tickets Sold Per Day-->
        <div class="chart-container">
          <h4>Tickets Sold Per Day</h4>
          <div v-if="chartSeries.length > 0">
            <apexchart type="line" height="350" :options="chartOptions" :series="chartSeries"></apexchart>
          </div>
          <div v-else>
            <p>No ticket sales data available.</p>
          </div>
        </div>

        <!-- Top 5 Users -->
        <div class="top-users">
          <h4>Top 5 Users</h4>
          <ul v-if="report.topUsers.length > 0">
            <li v-for="user in report.topUsers" :key="user.id">
              {{ user.name }} ({{ user.email }}) - {{ user.ticketCount }} tickets
            </li>
          </ul>
          <div v-else>
            <p>No top users available for this event.</p>
          </div>
        </div>

        <!-- Recent Reviews -->
        <div class="recent-reviews">
          <h4>Recent Reviews</h4>
          <div v-if="report.reviewSummary.recentReviews.length > 0">
            <div v-for="review in report.reviewSummary.recentReviews" :key="review.id" class="review-item">
              <p><strong>{{ review.userName }}</strong> rated it {{ review.rating }} stars</p>
              <p>{{ review.text }}</p>
            </div>
          </div>
          <div v-else>
            <p>No reviews available for this event.</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Please select an event to view reports.</p>
    </div>
  </div>
</template>

<script>
import ApexCharts from 'vue3-apexcharts';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    apexchart: ApexCharts
  },
  props: {
    eventId: {
      type: Number
    }
  },
  data() {
    return {
      selectedEventId: this.eventId,
      report: null,
      loading: false,
      error: null,
      chartOptions: {
        chart: {
          id: 'tickets-sold-per-day',
        },
        xaxis: {
          type: 'datetime',
        },
        title: {
          text: 'Tickets Sold Per Day',
          align: 'center',
        },
        stroke: {
          curve: 'smooth',
        }
      },
      chartSeries: []
    };
  },
  computed: {
    ...mapGetters(['events', 'currentUser']),
    filteredEvents() {
      return this.events.filter(event => event.organizerId == this.currentUser?.id || this.currentUser?.role === 'admin');
    },
  },
  methods: {
    ...mapActions(['fetchEvents']),
    async fetchReport() {
      if (!this.selectedEventId) return;

      this.loading = true;
      this.error = null;

      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/reports/${this.selectedEventId}`);
        if (!response.ok) throw new Error('Failed to fetch report');
        this.report = await response.json();
        this.prepareChart();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    prepareChart() {
      if (!this.report) return;

      const dates = Object.keys(this.report.ticketsSoldPerDay);
      const tickets = Object.values(this.report.ticketsSoldPerDay);

      this.chartSeries = tickets.length > 0 ? [
        {
          name: 'Tickets Sold',
          data: dates.map((date, index) => ({
            x: new Date(date).getTime(),
            y: tickets[index]
          }))
        }
      ] : [];
    }
  },
  created() {
    this.fetchEvents();
    this.fetchReport();
  }
};
</script>

<style scoped>
.event-report {
  padding: 20px;
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

.loading {
  font-weight: bold;
  color: #ff9800;
}

.report-summary {
  margin-bottom: 20px;
}

.report-section {
  display: flex;
  gap: 20px;
}

.report-item {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  flex: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chart-container {
  margin-bottom: 20px;
}

.top-users,
.recent-reviews {
  margin-bottom: 20px;
}

.review-item {
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 10px;
}

.error {
  color: red;
}
</style>
