<template>
  <div class="app">
    <Sidebar />
    <router-view />
  </div>
</template>

<script setup>
import Sidebar from "./components/Sidebar.vue";
import axios from "axios";
axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
  "X-CSRF-TOKEN": window.csrf_token,
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
  display: flex;
  main {
    flex: 1;
    padding: 2rem;

    @media (max-width: 768px) {
      padding-left: 6rem;
    }
  }
}
</style>
