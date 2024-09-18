import { mockUsers } from '../assets/mockData';

export const auth = {
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  actions: {
    async loginUser({ commit }, { email, password }) {
      try {
        const user = mockUsers.find(user => user.email === email && user.password === password);
        if (!user) throw new Error('Invalid email or password');

        commit('setUser', user);
        commit('setToken', {role: user.role, name: user.name, email: user.email});
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async signupUser({ commit }, { name, email, password }) {
      try {
        const existingUser = mockUsers.find(user => user.email === email);
        if (existingUser) throw new Error('Email already in use');
        const newUser = {
          id: mockUsers.length + 1,
          name,
          email,
          password,
          role: 'user',
        };
        mockUsers.push(newUser);

        const token = 'mock-token';

        commit('setUser', newUser);
        commit('setToken', token);
      } catch (error) {
        console.error('Signup failed:', error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('clearAuth');
    },
  },
  getters: {
    currentUser: state =>  state.user
  },
};
