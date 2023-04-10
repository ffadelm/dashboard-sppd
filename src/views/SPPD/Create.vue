<template>
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
        <div class="form-group">
          <label
            for="nama"
            class="form-label"
          >Nama Pemohon</label>
          <select
            id=""
            v-model="surat.user_id"
            name="user_id"
            class="form-select"
          >
            <option
              v-for="(user, index) in users.data"
              :key="index"
              :value="user.id"
            >
              {{user.name}}
            </option>
          </select>
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
            placeholder="Contoh: 123/SPD/UMY/TI/2023"
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
            v-model="anggotaMengikutiInput"
            type="text"
            class="form-control"
            id="anggota_mengikuti"
            autocomplete="off"
            placeholder="Contoh: Nama Anggota 1, Nama Anggota 2, Nama Anggota 3, dst."
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
            placeholder="Contoh: Jl. Raya Kampus, Kampus UMY, Yogyakarta"
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
            placeholder="Contoh: Perjalanan dinas ke kampus UMY untuk mengikuti kegiatan seminar"
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
            @click="addAnggotaMengikuti()"
          >Simpan</button>
          <router-link
            class="btn btn-secondary ms-2"
            to="/surat-perintah"
          >Kembali</router-link>
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
    const surat = reactive({
      user_id: "",
      judul: "",
      nomor_surat: "",
      pemberi_perintah: "",
      anggota_mengikuti: [],
      lokasi_tujuan: "",
      keterangan: "",
      tgl_awal: "",
      tgl_akhir: "",
    });

    const anggotaMengikutiInput = ref("");

    function addAnggotaMengikuti() {
      surat.anggota_mengikuti = anggotaMengikutiInput.value.split(",");
    }

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

    const validation = ref([]);

    const router = useRouter();

    function store() {
      axios
        .post("http://127.0.0.1:8000/api/surat", surat)
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
    }

    return {
      surat,
      users,
      validation,
      router,
      store,
      anggotaMengikutiInput,
      addAnggotaMengikuti,
    };
  },
};
</script>