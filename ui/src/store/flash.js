export const flash = {
    state: {
      message: null,
      type: 'info',
    },
    mutations: {
      setFlashMessage(state, { message, type }) {
        state.message = message;
        state.type = type;
      },
      clearFlashMessage(state) {
        state.message = null;
        state.type = 'info';
      },
    },
    actions: {
      setFlashMessage({ commit }, payload) {
        commit('setFlashMessage', payload);
        setTimeout(() => commit('clearFlashMessage'), 3000);
      },
    },
    getters: {
      flashMessage: state => state.message,
      flashType: state => state.type,
    },
  };
  