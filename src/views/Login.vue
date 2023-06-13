<template>
  <div class="login-container">
    <div class="card login-card">
      <div class="card-body">
        <h2 class="card-title mb-4">SELAMAT DATANG DI SISTEM E-SPPD</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label
              for="email"
              class="form-label"
            >Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="user.email"
              placeholder="Masukkan email Anda"
              required
            />
            <div
              v-if="validation.email"
              class="mt-2 text-danger"
            >Masukkan Email</div>
          </div>
          <div class="mb-3">
            <label
              for="password"
              class="form-label"
            >Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="user.password"
              placeholder="Masukkan password"
              required
            />
            <div
              v-if="validation.password"
              class="mt-2 text-danger"
            >Masukkan Password</div>
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-block"
          >Masuk</button>
        </form>
        <div
          v-if="loginFailed"
          class="mt-3 text-danger text-center alert alert-danger"
        >Email atau Password Anda salah. Mohon Cek Kembali</div>
        <div class="mt-3">
          <a
            href="https://wa.me/6282176515234?text=Halo%20Admin!%20Tolong%20Bantu%20Saya%20Lupa%20Password"
            target="_blank"
          >Lupa Password?</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Login",

  data() {
    return {
      loggedIn: localStorage.getItem("loggedIn"),
      token: localStorage.getItem("token"),
      user: {
        email: "",
        password: "",
      },
      validation: {
        email: false,
        password: false,
      },
      loginFailed: false,
    };
  },

  methods: {
    login() {
      this.validation = {};

      if (!this.user.email) {
        this.validation.email = true;
      }

      if (!this.user.password) {
        this.validation.password = true;
      }

      if (this.validation.email || this.validation.password) {
        this.loginFailed = false;
        return;
      }
      if (this.user.email && this.user.password) {
        axios
          .get("http://localhost:8000/sanctum/csrf-cookie")
          .then((response) => {
            console.log(response);
            axios
              .post("http://localhost:8000/api/login", {
                email: this.user.email,
                password: this.user.password,
              })
              .then((res) => {
                console.log(res);
                if (res.data.success) {
                  localStorage.setItem("loggedIn", "true");
                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("userId", res.data.user.id); // Simpan user ID ke local storage
                  localStorage.setItem("userRole", res.data.user.role); // Simpan user role ke local storage
                  localStorage.setItem("Name", res.data.user.name); // Simpan user name ke local storage
                  localStorage.setItem("jabatan", res.data.user.jabatan);
                  setTimeout(() => {
                    localStorage.removeItem("loggedIn");
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId"); // Hapus user ID dari local storage setelah 1 jam
                    localStorage.removeItem("userRole"); // Hapus user role dari local storage setelah 1 jam
                    localStorage.removeItem("Name"); // Hapus user name dari local storage setelah 1 jam
                    localStorage.removeItem("jabatan");
                    this.$router.push({ name: "Login" });
                  }, 60 * 60 * 1000);
                  this.loggedIn = true;
                  return this.$router.push({ name: "Home" });
                } else {
                  this.loginFailed = true;
                }
              })
              .catch((error) => {
                console.log(error);
                this.loginFailed = true;
              });
          });
      }
    },
  },

  mounted() {
    if (this.loggedIn) {
      return this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.card-body {
  padding: 2rem;
}

.card-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.form-label {
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  width: 100%;
}

.btn-primary:hover {
  background-color: #0069d9;
}

.text-danger {
  color: red;
}
</style>
