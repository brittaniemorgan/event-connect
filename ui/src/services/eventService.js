import { authService } from "./authService";

const API_URL = process.env.VUE_APP_API_URL;
export default {
  async getEvents() {
    return fetch(`${API_URL}/events`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error fetching events:`, error);
        throw error;
      });
  },

  async getCategories() {
    return fetch(`${API_URL}/categories`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error fetching categories:`, error);
        throw error;
      });
  },

  async addEvent(newEvent) {
    return fetch(`${API_URL}/events`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`,
      },
      body: JSON.stringify(newEvent),
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error adding event:`, error);
        throw error;
      });
  },

  async getEventDetails(id) {
    return fetch(`${API_URL}/events/${id}`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error fetching event details:`, error);
        throw error;
      });
  },

  async registerForEvent(eventId, userEmail) {
    return fetch(`${API_URL}/events/${eventId}/register`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail }),
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error registering for event:`, error);
        throw error;
      });
  },

  async getRegisteredEvents(userEmail) {
    return fetch(`${API_URL}/users/${userEmail}/registered-events`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error fetching registered events:`, error);
        throw error;
      });
  },

  async purchaseTicket(ticketData) {
    return fetch(`http://localhost:3000/v1/purchased-tickets`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error purchasing ticket:`, error);
        throw error;
      });
  },

  async getPurchasedTickets(userEmail) {
    return fetch(`${API_URL}/purchased-tickets/?email=${userEmail}`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error fetching purchased tickets:`, error);
        throw error;
      });
  },

  async getEventReviews(eventId) {
    return fetch(`${API_URL}/reviews/${eventId}`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error fetching event reviews:`, error);
        throw error;
      });
  },

  async addEventReview(review) {
    return fetch(`${API_URL}/reviews`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error adding review:`, error);
        throw error;
      });
  },

  async getRegisteredUsers(eventId) {
    return fetch(`${API_URL}/purchased-tickets/?eventId=${eventId}`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error fetching registered users:`, error);
        throw error;
      });
  },

  async getTicketHolders(eventId) {
    return fetch(`${API_URL}/events/${eventId}/ticket-holders`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error fetching ticket holders:`, error);
        throw error;
      });
  },

  async updateEvent(newData) {
    return fetch(`${API_URL}/events/${newData.id}`, {
      method: `PUT`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`,
      },
      body: JSON.stringify(newData),
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error updating event:`, error);
        throw error;
      });
  },

  async addTicket(newTicket) {
    console.log(newTicket);
    return fetch(`${API_URL}/tickets`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`,
      },
      body: JSON.stringify(newTicket),
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error adding ticket:`, error);
        throw error;
      });
  },

  async getTickets(eventId) {
    return fetch(`${API_URL}/tickets/?eventId=${eventId}`)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error fetching tickets:`, error);
        throw error;
      });
  },
  
  async updateTicket(newData) {
    return fetch(`${API_URL}/tickets/${newData.id}`, {
      method: `PUT`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`,
      },
      body: JSON.stringify(newData),
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error(`Error updating ticket:`, error);
        throw error;
      });
  },
};
