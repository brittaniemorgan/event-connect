import { mockEvents, mockCategories, mockRegisteredEvents, mockReviews } from '../assets/mockData';

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
        const users = mockRegisteredEvents.filter(reg => reg.eventId === eventId);
        resolve(users);
      }, 500);
    });
  },
};