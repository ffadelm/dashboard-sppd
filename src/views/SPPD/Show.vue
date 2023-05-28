<template>
  <main>
    <div class="row">
      <div class="col-lg-8 col-md-12">
        <h6
          v-if="surat.validasi === 0"
          class="badge text-bg-danger"
        >Surat Belum disetujui!</h6>
        <h6
          v-if="surat.validasi === 1"
          class="badge text-bg-success"
        >Surat sudah disetujui dan bisa dicetak</h6>

        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <p class="h2 fw-bold">{{surat.judul}}</p>
        </div>

        <div class="mt-3">
          <p class="h6 fw-bold">Nomor Surat</p>
          <p class="text-muted fw-normal">{{surat.nomor_surat}}</p>
        </div>

        <div class="mt-4">
          <p class="h6 fw-bold">Pemberi Perintah</p>
          <p class="text-muted fw-normal">{{surat.pemberi_perintah}}</p>
        </div>

        <div class="mt-4">
          <p class="h6 fw-bold">Nama yang diberi perintah</p>
          <p class="text-muted fw-normal">{{surat.user_id.name}}</p>
        </div>

        <div class="mt-4">
          <p class="h6 fw-bold">Anggota yang mengikuti</p>
          <p
            class="text-muted fw-normal"
            v-for="(anggota, index) in surat.anggota_mengikuti"
            :key="index"
          >
            {{index+1}}. {{anggota}}
          </p>
        </div>

        <div class="mt-4">
          <p class="h6 fw-bold">Lokasi Kegiatan</p>
          <p class="text-muted fw-normal">{{surat.lokasi_tujuan}}</p>
        </div>

        <div class="row mt-4">
          <div class="col">
            <p class="h6 fw-bold">Tanggal Mulai</p>
            <p class="text-muted fw-normal">{{date(surat.tgl_awal)}}</p>
          </div>
          <div class="col">
            <p class="h6 fw-bold">Tanggal Selesai</p>
            <p class="text-muted fw-normal">{{date(surat.tgl_akhir)}}</p>
          </div>
        </div>

        <div class="mt-4">
          <p class="h6 fw-bold">Deskripsi</p>
          <p class="text-muted fw-normal">{{surat.keterangan}}</p>
        </div>

        <div class="mt-4">
          <p class="h6 fw-bold">Laporan Perjalanan Dinas</p>
        </div>

        <router-link
          v-for="(laporan, index) in laporanFilter"
          :key="index"
          :to="`/detail-laporan/${laporan.id}`"
          class="text-black text-decoration-none"
        >
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  :src="'http://localhost:8000/storage/'+laporan.foto[0]"
                  class="img-fluid rounded-start"
                  alt="..."
                >
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title fw-semibold text-truncate text-start">{{laporan.nama_kegiatan}}</h5>
                  <p class="card-text text-truncate">{{laporan.lokasi}}</p>
                </div>
              </div>
            </div>
          </div>
        </router-link>

        <div class="d-flex justify-content-between mt-4">
          <router-link
            :class="{ 'disabled': surat.validasi === 0 }"
            v-if="surat.diserahkan === 0"
            class="btn btn-sm btn-info text-white px-4"
            to="/create/laporan"
          >Tambah Laporan</router-link>

          <button
            v-if="surat.diserahkan === 0"
            class="btn btn-sm btn-secondary px-4"
            type="button"
            @click="serahkanSurat"
          >Serahkan Surat</button>
        </div>
      </div>
    </div>

    <div class="btn-group d-grid gap-2 d-md-block mt-5">
      <router-link
        to="/surat-perintah"
        class="btn btn-outline-danger"
        type="button"
      >Kembali</router-link>
      <router-link
        to="/surat-perintah"
        class="btn btn-success px-4"
        type="button"
        :class="{ 'disabled': surat.validasi === 0 }"
      >Cetak</router-link>
    </div>
  </main>
</template>

<script>
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import moment from "moment";

export default {
  methods: {
    date(value) {
      return moment(value).format("DD MMMM YYYY");
    },
    serahkanSurat() {
      axios
        .post(`http://localhost:8000/api/surat/${this.surat.id}/serahkan`)
        .then((response) => {
          console.log(response.data);
          this.surat.diserahkan = 1;
          this.$router.push("/surat-perintah");
          swal({
            title: "Sukses!",
            text: "Data Berhasil Diserahkan!",
            icon: "success",
            button: "OK",
          });
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },

  setup() {
    const surat = reactive({
      id: "",
      user_id: "",
      judul: "",
      nomor_surat: "",
      pemberi_perintah: "",
      anggota_mengikuti: "",
      lokasi_tujuan: "",
      keterangan: "",
      tgl_awal: "",
      tgl_akhir: "",
      validasi: "",
      diserahkan: "",
    });

    const route = useRoute();

    const laporan = ref({ data: [] });

    onMounted(() => {
      axios
        .get("http://127.0.0.1:8000/api/laporan")
        .then(({ data }) => {
          console.log(data);
          laporan.value = data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const laporanFilter = computed(() => {
      if (laporan.value && laporan.value.data && route.params.id) {
        return laporan.value.data.filter((laporan) => {
          return laporan.surat_id.id == route.params.id;
        });
      } else {
        console.log("Data laporan belum tersedia");
        return [];
      }
    });

    onMounted(() => {
      axios
        .get(`http://127.0.0.1:8000/api/surat/${route.params.id}`)
        .then(({ data }) => {
          console.log(data);
          surat.id = data.data.id;
          surat.user_id = data.data.user_id;
          surat.judul = data.data.judul;
          surat.nomor_surat = data.data.nomor_surat;
          surat.pemberi_perintah = data.data.pemberi_perintah;
          surat.anggota_mengikuti = data.data.anggota_mengikuti;
          surat.lokasi_tujuan = data.data.lokasi_tujuan;
          surat.keterangan = data.data.keterangan;
          surat.tgl_awal = data.data.tgl_awal;
          surat.tgl_akhir = data.data.tgl_akhir;
          surat.validasi = data.data.validasi;
          surat.diserahkan = data.data.diserahkan;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });

    return {
      surat,
      laporanFilter,
      laporan,
    };
  },
};
</script>

