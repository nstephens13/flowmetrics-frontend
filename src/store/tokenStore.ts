import { defineStore } from 'pinia';

const useTokenStore = defineStore('token', {
  state: () => ({
    token: '',
  }),

  getters: {
    getToken(): string {
      return this.token;
    },
  },

  actions: {
    setToken(token: string) {
      this.token = token;
    },
  },
});

export default useTokenStore;
