<template>
  <div class="main">
    <UsersComponent />
  </div>
</template>

<script>
import UsersComponent from "@/components/user/UsersComponent.vue";
import axios from "axios";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

import { useMainStore } from "@/stores/main";
import { mapWritableState } from "pinia";
import ServicesMixin from "../mixins/ServicesMixin.vue";

export default {
  components: { UsersComponent },
  mixins: [ServicesMixin],
  mounted() {
    this.fetchUsers();
  },
  computed: {
    ...mapWritableState(useMainStore, ["users", "response"]),
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
