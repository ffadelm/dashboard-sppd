<template>
  <main class="BuatSPPD-page">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Tambah Data Pengguna</h1>
    </div>
    <div class="mt-3">
      <form
        @submit.prevent="store()"
        class="row g-3"
      >
        <div class="col-md-6">
          <div class="mb-3">
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
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label
              for="email"
              class="form-label"
            >Email</label>
            <input
              v-model="user.email"
              type="email"
              class="form-control"
              id="email"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
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
        </div>

        <div class="col-12">
          <div class="mb-3">
            <button
              type="submit"
              class="btn btn-success btn-block"
            >
              Simpan
            </button>
            <router-link
              class="btn btn-outline-danger ms-2"
              to="/user"
            >
              Kembali
            </router-link>
          </div>
        </div>

      </form>
    </div>
  </main>
</template>


<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //data binding
    const user = reactive({
      name: "",
      email: "",
      password: "",
    });

    const validation = ref([]);

    const router = useRouter();

    function store() {
      axios
        .post("http://127.0.0.1:8000/api/user", user)
        .then(() => {
          router.push("/user");
          swal({
            title: "Sukses!",
            text: "Data Berhasil Ditambahkan!",
            icon: "success",
            button: "OK",
          });
        })
        .catch((error) => {
          validation.value = error.response.data;
        });
    }

    return {
      user,
      validation,
      router,
      store,
    };
  },
};
</script>