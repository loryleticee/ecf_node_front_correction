<template>
  <div class="main">
    <div>
      <form @submit.prevent="handleSearch" class="search_form">
        <input
          type="text"
          name="search_bar"
          id="search_bar"
          v-model.trim="search_content"
          @keyup="handleSearch"
        />
        <button type="submit">🔎</button>
      </form>
      <span>{{ error_msg }}</span>
    </div>
    <table>
      <tr>
        <th>ID</th>
        <th>USERNAME</th>
        <th>EMAIL</th>
        <th>ROLE</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td class="px2">{{ user.id }}</td>
        <td class="px2">{{ user.name }}</td>
        <td class="px2">{{ user.email }}</td>
        <td class="px2">{{ user.role }}</td>
      </tr>
    </table>
    <transition name="notif">
      <div v-if="response?.length > 1" class="error">{{ response }}</div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapWritableState } from "pinia";
import { useMainStore } from "../../stores/main";
import ServicesMixin from "../../mixins/ServicesMixin.vue";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  mixins: [ServicesMixin],
  computed: {
    ...mapWritableState(useMainStore, [
      "search_content",
      "error_msg",
      "users",
      "response",
    ]),
  },
  methods: {
    handleSearch() {
      if (this.search_content.length < 1) {
        this.fetchUsers();
        return;
      }

      let isGoodSearchContent = /^[^<>].*$/.test(this.search_content);
      // try {
      //   if(!isGoodSearchContent) {
      //     throw "Attention .....";
      //   }

      // } catch (error) {
      //   return;
      // }

      if (!isGoodSearchContent) {
        this.error_msg = "Attention saisissez des lettres ou des chiffres";
        return;
      }

      let object_to_send = { data: this.search_content };

      // axios
      //   .post(`http://127.0.0.1:8000/users`, object_to_send)
      //   .then((response) => {
      //     this.users = response?.data?.users;
      //   });

      axios
        .get(`http://127.0.0.1:8000/users/${this.search_content}`)
        .then((response) => {
          this.users = response?.data?.users;
        })
        .catch((e) => {
          this.response = e?.message;
          setTimeout(() => {
            this.response = "";
          }, 2000);
        });
    },
  },
};
</script>

<style scoped>
.px2 {
  padding: 0 2rem;
}
.error {
  padding: 1rem;
  border-radius: 1rem;
  background-color: cornflowerblue;
}

.notif-enter-from {
  opacity: 0;
}
.notif-enter-to {
  opacity: 1;
}

.notif-enter-active {
  transition: opacity 3s ease;
}

.notif-leave-from {
  opacity: 1;
}
.notif-leave-to {
  opacity: 0;
}
.notif-leave-active {
  transition: opacity 3s ease;
}

.search_form {
  display: flex;
  justify-content: space-between;
}
</style>
