<template>
  <aside :class="`${is_expanded && 'is-expanded'}`">
    <div class="logo">
      <img
        src="../assets/logo.png"
        alt="Logo"
      >
    </div>

    <div class="menu-toggle-wrap">
      <button
        class="menu-toggle"
        @click="ToggleMenu"
      >
        <span class="material-icons">keyboard_double_arrow_right</span>
      </button>
    </div>
    <h3>Menu</h3>
    <div class="menu">
      <router-link
        class="button"
        to="/"
      >
        <span class="material-icons">space_dashboard</span>
        <span class="text">Dashboard</span>
      </router-link>
      <router-link
        class="button"
        to="/pegawai"
      >
        <span class="material-icons">groups</span>
        <span class="text">Pegawai</span>
      </router-link>
      <router-link
        class="button"
        to="/buat-sppd"
      >
        <span class="material-icons">description</span>
        <span class="text">SPPD</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;

  localStorage.setItem("is_expanded", is_expanded.value);
};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;

  background-color: var(--bs-dark);
  color: var(--bs-light);

  transition: 0.2s ease-out;

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--bs-light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--bs-green);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }

  h3 {
    color: var(--bs-gray);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      padding: 0.5rem 1rem;
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 1.7rem;
        color: var(--bs-light);
        transition: 0.2s ease-out;
      }

      .text {
        color: var(--bs-light);
        transition: 0.2s ease-out;
      }

      &:hover,
      &.router-link-exact-active {
        background-color: var(--bs-gray-800);

        .material-icons,
        .text {
          color: var(--bs-green);
        }
      }

      &.router-link-exact-active {
        border-right: 5px solid var(--bs-green);
      }
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;
      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}
</style>