import { createStore } from 'vuex';
import eventService from '../services/eventService';

export default createStore({
  state() {
    return {
      events: [],
      categories: [],
      selectedCategory: null,
      selectedLocation: null,
      selectedDate: null,
    };
  },
  mutations: {
    addEvent(state, event) {
      state.events.push(event);
    },
    setEvents(state, events) {
      state.events = events;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setSelectedCategory(state, category) {
      state.selectedCategory = category;
    },
    setSelectedLocation(state, location) {
      state.selectedLocation = location;
    },
    setSelectedDate(state, date) {
      state.selectedDate = date;
    }
  },
  actions: {
    async fetchEvents({ commit }) {
      try {
        const events = await eventService.getEvents();
        commit('setEvents', events);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    },
    async fetchCategories({ commit }) {
      try {
        const categories = await eventService.getCategories();
        commit('setCategories', categories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }
  },
  getters: {
    events: state => {
      let filteredEvents = state.events;

      if (state.selectedCategory) {
        filteredEvents = filteredEvents.filter(event => event.category === state.selectedCategory);
      }

      if (state.selectedLocation) {
        filteredEvents = filteredEvents.filter(event => event.location === state.selectedLocation);
      }

      if (state.selectedDate) {
        filteredEvents = filteredEvents.filter(event => event.date === state.selectedDate);
      }

      return filteredEvents;
    },
    categories: state => state.categories
  }
});
