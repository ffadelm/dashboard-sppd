<template>
  <main class="update-user-page">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Ubah Data Pengguna</h1>
    </div>
    <div class="mt-3">
      <form
        @submit.prevent="update()"
        class="row g-3 mt-4"
      >
        <div class="col-md-6">
          <label
            for="nama"
            class="form-label"
          >Nama Lengkap</label>
          <input
            v-model="user.name"
            type="text"
            class="form-control"
            id="nama"
            autocomplete="off"
          />
        </div>

        <div class="col-md-6">
          <label
            for="username"
            class="form-label"
          >Username</label>
          <input
            v-model="user.username"
            type="username"
            class="form-control"
            id="username"
            autocomplete="off"
          />
        </div>

        <div class="col-md-6">
          <label
            for="email"
            class="form-label"
          >Email Resmi</label>
          <input
            v-model="user.email"
            type="email"
            class="form-control"
            id="email"
            autocomplete="off"
          />
        </div>

        <div class="col-md-6">
          <label
            for="jabatan"
            class="form-label"
          >Jabatan Fungsional</label>
          <input
            v-model="user.jabatan"
            type="jabatan"
            class="form-control"
            id="jabatan"
            autocomplete="off"
          />
        </div>

        <div class="col-md-6">
          <label
            for="nidn"
            class="form-label"
          >Nomor identifikasi Nasional Dosen (NIDN)</label>
          <input
            v-model="user.nidn"
            type="nidn"
            class="form-control"
            id="nidn"
            autocomplete="off"
          />
        </div>

        <div
          class="col-md-6"
          v-if="userRole === '1'"
        >
          <label
            for="password"
            class="form-label"
          >Password</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            id="password"
            autocomplete="off"
          />
        </div>

        <div class="col-12">
          <button
            type="submit"
            class="btn btn-success"
          >Simpan</button>
          <router-link
            class="btn btn-outline-danger ms-2"
            to="/user"
          >Kembali</router-link>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    let user = reactive({
      name: "",
      nidn: "",
      username: "",
      jabatan: "",
      email: "",
      password: "",
    });

    const validation = ref([]);
    const userRole = localStorage.getItem("userRole");

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios
        .get(`https://api.sppd.tatiumy.com/api/user/${route.params.id}`)
        .then(({ data }) => {
          console.log(data);
          user.name = data.data.name;
          user.nidn = data.data.nidn;
          user.username = data.data.username;
          user.jabatan = data.data.jabatan;
          user.email = data.data.email;
          user.password = data.data.password;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    function update() {
      axios
        .put(`https://api.sppd.tatiumy.com/api/user/${route.params.id}`, user)
        .then((response) => {
          console.log(response);
          router.push("/user");
          swal({
            title: "Sukses!",
            text: "Data Berhasil Diubah!",
            icon: "success",
            button: "OK",
          });
        })
        .catch((err) => {
          validation.value = err.response.data;
        });
    }

    return {
      user,
      validation,
      router,
      update,
      userRole,
    };
  },
};
</script>