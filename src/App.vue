<template>
  <div class="app">
    <Navbar v-if="!isLoginPage" />
    <Sidebar v-if="!isLoginPage" />
    <router-view class="container" />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    Sidebar,
    Navbar,
  },
  setup() {
    const route = useRoute();
    const isLoginPage = computed(() => route.path === "/login");
    return { isLoginPage };
  },
};
</script>


<style lang="scss">
:root {
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background: var(--bs-light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  // display: flex;
  main {
    flex: 1;
    padding: 2rem;
    margin-top: 3rem;

    @media (max-width: 768px) {
      padding-left: 6rem;
    }
  }
}
</style>
