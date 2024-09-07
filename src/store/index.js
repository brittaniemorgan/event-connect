import { createStore } from 'vuex';
import eventService from '../services/eventService';

export default createStore({
  state() {
    return {
      events: [],
      categories: [],
      searchQuery: null,
      selectedCategory: null,
      selectedLocation: null,
      selectedDate: null,
      eventDetails: {}
    };
  },
  mutations: {
    addEvent(state, event) {
      state.events.push(event);
    },
    setEvents(state, events) {
      state.events = events;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
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
    },
    setEventDetails(state, { id, details }) {
      state.eventDetails = { ...state.eventDetails, [id]: details };
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
    },
    async addEvent({ commit }, newEvent) {
      try {
        const event = await eventService.addEvent(newEvent);
        commit('addEvent', event);
      } catch (error) {
        console.error('Failed to add event:', error);
        throw error;
      }
    },
    async fetchEventDetails({ commit }, eventId) {
      try {
        const event = await eventService.getEventDetails(eventId);
        commit('setEventDetails', { id: eventId, details: event });
      } catch (error) {
        console.error('Failed to fetch event details:', error);
      }
    }
  },
  getters: {
    events: state => {
      let filteredEvents = state.events;

      if (state.searchQuery) {
        filteredEvents = filteredEvents.filter(event => event.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
      }

      if (state.selectedCategory) {
        filteredEvents = filteredEvents.filter(event => event.category === state.selectedCategory);
      }

      if (state.selectedLocation) {
        filteredEvents = filteredEvents.filter(event => event.location.toLowerCase().includes(state.selectedLocation.toLowerCase()));
      }

      if (state.selectedDate) {
        filteredEvents = filteredEvents.filter(event => event.date === state.selectedDate);
      }

      return filteredEvents;
    },
    categories: state => state.categories,
    eventDetails: (state) => state.eventDetails
  }
});
