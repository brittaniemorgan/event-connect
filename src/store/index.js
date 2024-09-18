import { createStore } from 'vuex';
import eventService from '../services/eventService';
import { auth } from './auth';
import { flash } from './flash';

export default createStore({
  modules: { auth, flash },
  state() {
    return {
      events: [],
      categories: [],
      searchQuery: null,
      selectedCategory: null,
      selectedLocation: null,
      selectedDate: null,
      eventDetails: {},
      reviews: {},
      registeredEvents: [],
      registeredUsers: [],
      purchasedTickets: {},
      userTickets: {},
      tickets: [],
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
    },
    setRegisteredEvents(state, events) {
      state.registeredEvents = events;
    },
    addReview(state, review) {
      if (!state.reviews[review.eventId]) {
        state.reviews[review.eventId] = [];
      }
      state.reviews[review.eventId].push(review);
    },
    registerEvent(state, eventId) {
      if (!state.registeredEvents.includes(eventId)) {
        state.registeredEvents.push(eventId);
      }
    },
    setEventReviews(state, { eventId, reviews }) {
      state.reviews = { ...state.reviews, [eventId]: reviews };
    },
    setRegisteredUsers(state, users) {
      state.registeredUsers = users;
    },
    setPurchasedTickets(state, { eventId, tickets }) {
      state.purchasedTickets = { ...state.purchasedTickets, [eventId]: tickets };
    },
    addPurchasedTicket(state, { userId, eventId, ticket }) {
      if (!state.userTickets[userId]) {
        state.userTickets[userId] = {};
      }
      if (!state.userTickets[userId][eventId]) {
        state.userTickets[userId][eventId] = [];
      }
      state.userTickets[userId][eventId].push(ticket);
    },

    editEvent(state, { updatedEvent }) {
      const eventIndex = state.events.findIndex(event => event.id === updatedEvent.id);
      if (eventIndex !== -1) {
        state.events[eventIndex] = { ...state.events[eventIndex], ...updatedEvent };
      }
    },

    addTicket(state, { ticket }) {
      state.tickets.push(ticket);      
      console.log(this.state.tickets);
    },
    setTickets(state, { tickets }) {
      state.tickets = tickets;
    },
    editTicket(state, { updatedTicket }) {
      const ticketIndex = state.tickets.findIndex(ticket => ticket.id === updatedTicket.id);
      if (ticketIndex !== -1) {
        state.tickets[ticketIndex] = { ...state.events[ticketIndex], ...updatedTicket };
      }
    },
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
    },

    async fetchRegisteredEvents({ commit }, email) {
      try {
        const events = await eventService.getRegisteredEvents(email);
        commit('setRegisteredEvents', events);
      } catch (error) {
        console.error('Failed to fetch registered events:', error);
      }
    },

    submitEventReview({ commit }, review) {
      try {
        commit('addReview', review);
        eventService.addEventReview(review);
      } catch (error) {
        console.error('Failed to submit event review:', error);
        throw error
      }

    },

    async registerForEvent({ commit }, event) {
      try {
        await eventService.registerForEvent(event.eventId);
        commit('registerEvent', event.eventId);
      } catch (error) {
        console.error('Failed to register for event:', error);
        throw error;
      }
    },

    async fetchEventReviews({ commit }, eventId) {
      try {
        const reviews = await eventService.getEventReviews(eventId);
        commit('setEventReviews', { eventId, reviews });
      } catch (error) {
        console.error('Failed to fetch event reviews:', error);
      }
    },
    async fetchPurchasedTickets({ commit }, email) {
      try {
        const tickets = await eventService.getPurchasedTickets(email);
        tickets.forEach(ticket => {
          commit('addPurchasedTicket', ticket);
        });
      } catch (error) {
        console.error('Failed to fetch purchased tickets:', error);
      }
    },

    async fetchRegisteredUsers({ commit }, eventId) {
      try {
        const users = await eventService.getRegisteredUsers(eventId);
        commit('setRegisteredUsers', users);
      } catch (error) {
        console.error('Failed to fetch registered users:', error);
      }
    },

    async purchaseTicket({ commit }, data) {
      try {
        const response = await eventService.purchaseTicket(data);
        commit('addPurchasedTicket', { email: data.email, eventId: data.eventId, ticketId: data.ticketId, ticketType: data.ticketType });
        return response;
      } catch (error) {
        console.error('Failed to purchase ticket:', error);
        throw error;
      }
    },

    async sendUserMessage({ eventId, userId, message }) {
      try {
        console.log('Message sent successfully', message, eventId, userId);
      } catch (error) {
        console.error('Failed to send message:', error);
        throw error;
      }
    },

    async editEvent({ commit }, updatedEvent) {
      try {
        await eventService.updateEvent(updatedEvent);
        commit('editEvent', { updatedEvent });
      } catch (error) {
        console.error('Failed to edit event:', error);
        throw error;
      }
    },
    async fetchTickets({ commit }, eventId) {
      try {
        const tickets = await eventService.getTickets(eventId);
        commit('setTickets', { tickets });
        return tickets;
      } catch (error) {
        console.error('Failed to generate mock tickets:', error);
        throw error;
      }
    },
    async addTicket({ commit }, newTicket) {
      try {
        const ticket = await eventService.addTicket(newTicket);
        commit('addTicket', { ticket });
      } catch (error) {
        console.error('Failed to add ticket:', error);
        throw error;
      }
    },
    async editTicket({ commit }, updatedTicket) {
      try {
        await eventService.updateTicket(updatedTicket);
        commit('editTicket', { updatedTicket });
      } catch (error) {
        console.error('Failed to edit event:', error);
        throw error;
      }
    },
  },
  getters: {
    events: state => {
      let filteredEvents = state.events;

      if (state.searchQuery) {
        filteredEvents = filteredEvents.filter(event =>
          event.title.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }

      if (state.selectedCategory) {
        filteredEvents = filteredEvents.filter(event => event.category === state.selectedCategory);
      }

      if (state.selectedLocation) {
        filteredEvents = filteredEvents.filter(event =>
          event.location.toLowerCase().includes(state.selectedLocation.toLowerCase())
        );
      }

      if (state.selectedDate) {
        filteredEvents = filteredEvents.filter(event => event.date === state.selectedDate);
      }

      return filteredEvents;
    },

    categories: state => state.categories,

    eventDetails: state => state.eventDetails,

    isUserRegisteredForEvent: (state) => (eventId) => {
      return state.registeredEvents.includes(eventId);
    },

    registeredEvents: state => state.registeredEvents,

    eventReviews: (state) => (eventId) => {
      return state.reviews[eventId] || [];
    },

    registeredUsers: state => state.registeredUsers,

    getUserTickets: (state) => (userId) => {
      return state.userTickets[userId] || {};
    },
    getTicketCount: (state) => (userId, eventId) => {
      return state.userTickets[userId]?.[eventId] || 0;
    },
    hasUserPurchasedTicket: (state) => (userId, eventId) => {
      return state.userTickets[userId]?.[eventId] > 0;
    },
    tickets: (state) => {
      return state.tickets;
    },
  }
});