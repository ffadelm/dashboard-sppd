<template>
  <main class="BuatLaporan-page">
    <div class="
        d-flex
        justify-content-between
        flex-wrap flex-md-nowrap
        align-items-center
        pt-3
        pb-2
        mb-3
        border-bottom
      ">
      <h1 class="h2">Buat Laporan Kegiatan</h1>
    </div>
    <form
      @submit.prevent="store()"
      class="row g-3"
    >

      <div class="form-group visually-hidden">
        <label
          for="judul_surat"
          class="form-label"
        >Judul Surat</label>
        <input
          v-model="laporan.surat_id"
          type="text"
          class="form-control"
          id="judul_surat"
          autocomplete="off"
          disabled
        />
      </div>

      <div class="form-group visually-hidden">
        <label
          for="nama"
          class="form-label"
        >Nama Pemohon</label>
        <input
          v-model="laporan.user_id"
          type="text"
          class="form-control"
          id="nama"
          autocomplete="off"
          disabled
        />
      </div>

      <div class="form-group">
        <label
          for="nama_kegiatan"
          class="form-label"
        >Nama Kegiatan</label>
        <input
          v-model="laporan.nama_kegiatan"
          type="text"
          class="form-control"
          id="nama_kegiatan"
          autocomplete="off"
          placeholder="Contoh: Seminar Nasional"
        />
      </div>

      <div class="form-group">
        <label
          for="formFileMultiple"
          class="form-label"
        >Dokumentasi & File</label>
        <input
          class="form-control"
          type="file"
          id="formFileMultiple"
          multiple
          @change="handleFileUpload"
        />
      </div>

      <div class="form-group">
        <label
          for="keterangan"
          class="form-label"
        >Deskripsi Kegiatan</label>
        <textarea
          v-model="laporan.deskripsi"
          class="form-control"
          id="keterangan"
          autocomplete="off"
          placeholder="Contoh: Seminar Nasional bertema 'Pembelajaran Online'"
        ></textarea>
      </div>

      <div class="form-group">
        <label
          for="alamat"
          class="form-label"
        >Lokasi Kegiatan</label>
        <textarea
          v-model="laporan.lokasi"
          class="form-control"
          id="alamat"
          autocomplete="off"
          placeholder="Contoh: Jl. Raya Kampus, Kampus UMY, Yogyakarta"
        ></textarea>
      </div>

      <div class="form-group">
        <button
          type="submit"
          class="btn btn-success"
        >Simpan</button>
        <router-link
          class="btn btn-outline-danger ms-2"
          to="/surat-perintah"
        >Kembali</router-link>
      </div>
    </form>
  </main>
</template>


<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  computed: {
    filteredUsers() {
      return this.users.data
        ? this.users.data.filter((user) => user.role !== 1)
        : [];
    },
  },
  setup() {
    const laporan = reactive({
      user_id: "",
      surat_id: "",
      nama_kegiatan: "",
      foto: [],
      lokasi: "",
      deskripsi: "",
    });

    const userId = localStorage.getItem("userId");
    const userIdInt = parseInt(userId);

    const suratId = localStorage.getItem("suratId");
    const suratIdInt = parseInt(suratId);

    const users = ref([]);
    const surat = ref([]);
    const validation = ref([]);
    const router = useRouter();

    function store() {
      laporan.user_id = userIdInt;
      laporan.surat_id = suratIdInt;

      const formData = new FormData();
      formData.append("user_id", laporan.user_id);
      formData.append("surat_id", laporan.surat_id);
      formData.append("nama_kegiatan", laporan.nama_kegiatan);
      formData.append("lokasi", laporan.lokasi);
      formData.append("deskripsi", laporan.deskripsi);
      for (let i = 0; i < laporan.foto.length; i++) {
        formData.append("foto[]", laporan.foto[i]);
      }

      axios
        .post("http://127.0.0.1:8000/api/laporan", formData)
        .then(() => {
          router.push("/surat-perintah");
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

      localStorage.removeItem("suratId");
    }

    onMounted(() => {
      axios
        .get("http://127.0.0.1:8000/api/user")
        .then(({ data }) => {
          users.value = data;
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("http://127.0.0.1:8000/api/surat")
        .then(({ data }) => {
          surat.value = data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    function handleFileUpload(event) {
      laporan.foto = [];
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        laporan.foto.push(files[i]);
      }
    }

    return {
      laporan,
      store,
      users,
      surat,
      validation,
      handleFileUpload,
    };
  },
};
</script>

<style>
option {
  max-height: 150px;
  overflow-y: auto;
}
</style>