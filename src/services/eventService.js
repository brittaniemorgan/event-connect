import { mockEvents, mockCategories, mockRegisteredEvents, mockReviews, mockPurchasedTickets } from '../assets/mockData';

export default {
  async getEvents() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockEvents), 500);
    });
  },

  async getCategories() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCategories), 500);
    });
  },

  async addEvent(newEvent) {
    return new Promise((resolve) => {
      setTimeout(() => {
        newEvent.id = mockEvents.length + 1;
        mockEvents.push(newEvent);
        console.log(mockEvents);
        resolve(newEvent);
      }, 500);
    });
  },

  async getEventDetails(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const event = mockEvents.find(event => event.id === parseInt(id));
        if (event) {
          resolve(event);
        } else {
          reject(new Error('Event not found'));
        }
      }, 500);
    });
  },
  async registerForEvent(eventId, userEmail) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!mockRegisteredEvents.find(reg => reg.eventId === eventId && reg.email === userEmail)) {
          mockRegisteredEvents.push({ email: userEmail, eventId });
          resolve({ success: true });
        } else {
          reject(new Error('Already registered for this event'));
        }
      }, 500);
    });
  },

  async getRegisteredEvents(userEmail) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const registeredEventIds = mockRegisteredEvents
          .filter(reg => reg.email === userEmail)
          .map(reg => reg.eventId);

        resolve(registeredEventIds);
      }, 500);
    });
  },

  async purchaseTicket(ticketData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTicket = {
          id: mockPurchasedTickets.length + 1,
          ...ticketData,
          purchaseDate: new Date().toISOString()
        };
        mockPurchasedTickets.push(newTicket);
        resolve(newTicket);
      }, 500);
    });
  },

  async getPurchasedTickets(userEmail) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tickets = mockPurchasedTickets.filter(ticket => ticket.email === userEmail);
        resolve(tickets);
      }, 500);
    });
  },

  async getEventReviews(eventId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reviews = mockReviews.filter(review => review.eventId == eventId);
        resolve(reviews);
      }, 500);
    });
  },

  async addReview(review) {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockReviews.push(review);
        resolve(review);
      }, 500);
    });
  },

  async getRegisteredUsers(eventId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = mockPurchasedTickets.filter(reg => reg.eventId === eventId);
        resolve(users);
      }, 500);
    });
  },

  async getTicketHolders(eventId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tickets = mockPurchasedTickets.filter(ticket => ticket.eventId === eventId);
        resolve(tickets);
      }, 500);
    });
  },
  async updateEvent(newData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(newData); 
        const eventIndex = mockEvents.findIndex(event => event.id === newData.id);
        if (eventIndex !== -1) {
          mockEvents[eventIndex] = { ...mockEvents[eventIndex], ...newData };
          resolve(mockEvents[eventIndex]);
        } else {
          reject(new Error('Event not found'));
        }
      }, 500);
    });
  },
};