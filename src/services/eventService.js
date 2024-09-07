import { mockEvents, mockCategories } from '../assets/mockData';

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
        newEvent.id = mockEvents.length + 1; // Simple ID generation
        mockEvents.push(newEvent);
        console.log(mockEvents)
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
  }
};
