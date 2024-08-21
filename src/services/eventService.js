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
  }
};
