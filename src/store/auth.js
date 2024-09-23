import { authService } from '@/services/authService';

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
    loginUser({ commit }, { email, password }) {
      return authService.login(email, password)
        .then(userData => {
          commit('setUser', userData.user);
          commit('setToken', userData.token);
        })
        .catch(error => {
          console.error('Login failed:', error);
          throw error;
        });
    },
    signupUser({ commit }, { name, email, password }) {
      return authService.signup(name, email, password)
        .then(newUser => {
          commit('setUser', newUser);
          commit('setToken', newUser.token);
        })
        .catch(error => {
          console.error('Signup failed:', error);
          throw error;
        });
    },
    logout({ commit }) {
      authService.logout();
      commit('clearAuth');
    },
  },
  getters: {
    currentUser: state => state.user,
  },
};
