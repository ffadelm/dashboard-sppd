<template>
  <!-- nama belum masuk form -->
  <main class="BuatSPPD-page">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Edit SPPD</h1>
    </div>
    <div class="mt-3">
      <form
        @submit.prevent="update()"
        class="row g-3"
      >
        <div class="form-group">
          <label
            for="nama"
            class="form-label"
          >Nama Pegawai</label>
          <select
            id=""
            v-model="surat.user_id"
            name="user_id"
            class="form-select"
          >
            <option
              selected
              v-for="(user, index) in users.data"
              :key="index"
              :value="user.id"
            >
              {{ user.name }}
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
          />
        </div>
        <div class="col-md-6">
          <label
            for="pejabat"
            class="form-label"
          >Pejabat yang memberi perintah</label>
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
          >Keterangan</label>
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
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //data binding
    let surat = reactive({
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

    let users = ref([]);

    onMounted(() => {
      axios
        .get("http://sppd-api.herokuapp.com/api/user")
        .then(({ data }) => {
          users.value = data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const validation = ref([]);

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios
        .get(
          `https://sppd-api.herokuapp.com/api/perintah-jalan/${route.params.id}`
        )
        .then(({ data }) => {
          //   console.log(data);
          surat.user_id = data.data.user_id;
          surat.judul = data.data.judul;
          surat.nomor_surat = data.data.nomor_surat;
          surat.pemberi_perintah = data.data.pemberi_perintah;
          surat.anggota_mengikuti = data.data.anggota_mengikuti;
          surat.lokasi_tujuan = data.data.lokasi_tujuan;
          surat.keterangan = data.data.keterangan;
          surat.tgl_awal = data.data.tgl_awal;
          surat.tgl_akhir = data.data.tgl_akhir;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });

    function update() {
      axios
        .put(
          `https://sppd-api.herokuapp.com/api/perintah-jalan/${route.params.id}`,
          surat
        )
        .then(() => {
          router.push("/surat-perintah");
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
    };
  },
};
</script>
