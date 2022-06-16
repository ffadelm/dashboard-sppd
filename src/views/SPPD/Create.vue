<template>
  <!-- 
    Belum bisa post 
    
    *mungkin bisa buat dropdown buat nama pegawai sesuai user id
    *menambahkan judul surat perintah
    *anggota yang mengikuti
    *membuat status aktif tanpa input
  -->
  <main class="BuatSPPD-page">
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
      <h1 class="h2">Buat Surat Perintah Perjalanan Dinas</h1>
    </div>
    <div class="mt-3">
      <form
        @submit.prevent="store()"
        class="row g-3"
      >
        @csrf
        <div class="form-group">
          <label
            for="nama"
            class="form-label"
          >Nama Pegawai</label>
          <input
            v-model="surat.penerima_perintah"
            type="nama"
            class="form-control"
            id="nama"
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
          >Pejabat yang memberi perintah</label>
          <input
            v-model="surat.pemberi_perintah"
            type="pejabat"
            class="form-control"
            id="pejabat"
            autocomplete="off"
          />
        </div>
        <div class="col-12">
          <label
            for="alamat"
            class="form-label"
          >Alamat Tujuan</label>
          <input
            v-model="surat.lokasi_tujuan"
            type="text"
            class="form-control"
            id="alamat"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label
            for="keterangan"
            class="form-label"
          >Keterangan</label>
          <input
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
            class="btn btn-primary"
          >Simpan</button>
          <router-link
            class="btn btn-secondary"
            to="/surat-perintah"
          >Kembali</router-link>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //data binding
    const surat = reactive({
      penerima_perintah: "",
      nomor_surat: "",
      pemberi_perintah: "",
      lokasi_tujuan: "",
      keterangan: "",
      tgl_awal: "",
      tgl_akhir: "",
    });

    const validation = ref([]);

    const router = useRouter();

    function store() {
      axios
        .post("https://sppd-api.herokuapp.com/api/perintah-jalan", surat)
        .then(() => {
          router.push("/surat-perintah");
        })
        .catch((err) => {
          validation.value = err.response.data;
        });
    }

    return {
      surat,
      validation,
      router,
      store,
    };
  },
};
</script>