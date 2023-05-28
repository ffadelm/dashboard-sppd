<template>
  <!-- nama belum masuk form -->
  <main class="BuatSPPD-page">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Edit Surat Perintah Perjalanan Dinas</h1>
    </div>
    <div class="mt-3">
      <form
        @submit.prevent="update()"
        class="row g-3"
      >
        <div class="form-group visually-hidden">
          <label
            for="nama"
            class="form-label"
          >Nama Pemohon</label>
          <input
            v-model="surat.user_id"
            type="text"
            class="form-control"
            id="nama"
            autocomplete="off"
            disabled
          />
        </div>

        <div class="form-group">
          <label
            for="judul"
            class="form-label"
          >Judul Surat</label>
          <input
            v-model="surat.judul"
            type="text"
            class="form-control"
            id="judul"
            autocomplete="off"
          />
        </div>
        <div class="col-md-6">
          <label
            for="nomorSurat"
            class="form-label"
          >Nomor Surat</label>
          <input
            v-model="surat.nomor_surat"
            type="nomor"
            class="form-control"
            id="nomorSurat"
            autocomplete="off"
          />
        </div>
        <div class="col-md-6">
          <label
            for="pejabat"
            class="form-label"
          >Pemberi Perintah</label>
          <input
            v-model="surat.pemberi_perintah"
            type="text"
            class="form-control"
            id="pejabat"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label
            for="anggota_mengikuti"
            class="form-label"
          >Anggota yang mengikuti</label>
          <input
            v-model="surat.anggota_mengikuti"
            type="text"
            class="form-control"
            id="anggota_mengikuti"
            autocomplete="off"
          />
        </div>
        <div class="col-12">
          <label
            for="alamat"
            class="form-label"
          >Alamat Tujuan</label>
          <textarea
            v-model="surat.lokasi_tujuan"
            type="address"
            class="form-control"
            id="alamat"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label
            for="keterangan"
            class="form-label"
          >Deskripsi Perjalanan</label>
          <textarea
            v-model="surat.keterangan"
            type="text"
            class="form-control"
            id="keterangan"
            autocomplete="off"
          />
        </div>
        <div class="col-md-6">
          <label
            for="tglMulai"
            class="form-label"
          >Tanggal Mulai</label>
          <input
            v-model="surat.tgl_awal"
            type="date"
            class="form-control"
            id="tglMulai"
          />
        </div>
        <div class="col-md-6">
          <label
            for="tglSelesai"
            class="form-label"
          >Tanggal selesai</label>
          <input
            v-model="surat.tgl_akhir"
            type="date"
            class="form-control"
            id="tglSelesai"
          />
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
    </div>
  </main>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
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
    //data binding
    let surat = reactive({
      user_id: null,
      judul: "",
      nomor_surat: "",
      pemberi_perintah: "",
      anggota_mengikuti: [],
      lokasi_tujuan: "",
      keterangan: "",
      tgl_awal: "",
      tgl_akhir: "",
      validasi: "",
    });

    let users = ref([]);

    onMounted(() => {
      axios
        .get("http://127.0.0.1:8000/api/user")
        .then(({ data }) => {
          users.value = data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const validation = ref("");

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios
        .get(`http://127.0.0.1:8000/api/surat/${route.params.id}`)
        .then(({ data }) => {
          surat.user_id = data.data.user_id.name;
          surat.judul = data.data.judul;
          surat.nomor_surat = data.data.nomor_surat;
          surat.pemberi_perintah = data.data.pemberi_perintah;
          surat.anggota_mengikuti = data.data.anggota_mengikuti;
          surat.lokasi_tujuan = data.data.lokasi_tujuan;
          surat.keterangan = data.data.keterangan;
          surat.tgl_awal = data.data.tgl_awal;
          surat.tgl_akhir = data.data.tgl_akhir;
          surat.validasi = data.data.validasi;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });

    const userId = localStorage.getItem("userId");
    const userIdInt = parseInt(userId);

    function update() {
      surat.user_id = userIdInt;

      axios
        .put(`http://127.0.0.1:8000/api/surat/${route.params.id}`, surat)
        .then((response) => {
          console.log(response);
          router.push("/surat-perintah");
          swal({
            title: "Sukses!",
            text: "Data Berhasil Diubah!",
            icon: "success",
            button: "OK",
          });
        })
        .catch((error) => {
          validation.value = error.response.data;
        });
    }

    return {
      surat,
      users,
      validation,
      router,
      update,
      userRole,
    };
  },
};
</script>