import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    articles: [],
    users: [],
    search_content: "",
    error_msg: "",
    response: ""
  }),
  persist: true,
  getters: {
    getArticles: (state) => state.articles,
    getUsers: (state) => state.users
  }
})
