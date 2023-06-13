<template>
  <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link
        class="navbar-brand fw-semibold"
        to="/"
      >
        <img
          src="../assets/logo.png"
          alt="Logo"
          width="30"
          height="30"
          class="d-inline-block align-text-top"
        >
        E-SPPD
      </router-link>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
          >
            <i class="material-icons rounded-circle">person</i> <!-- Ikon profil dengan bentuk lingkaran -->
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: var(--bs-light);
  z-index: 100;
}
</style>