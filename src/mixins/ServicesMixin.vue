<script>
import axios from "axios";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

import { useMainStore } from "@/stores/main";
import { mapWritableState } from "pinia";

export default {
  methods: {
    fetchUsers() {
      axios
        .get("http://127.0.0.1:8000/users")
        .then((response) => {
          this.users = response?.data;
        })
        .catch((e) => {
          this.response = e?.message;
          setTimeout(() => {
            this.response = "";
          }, 2000);
        });
    },
  },
  computed: {
    ...mapWritableState(useMainStore, ["users", "response"]),
  },
};
</script>