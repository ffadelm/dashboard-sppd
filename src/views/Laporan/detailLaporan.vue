<template>
  <main class="detail-laporan">
    <div class="row">
      <div class="col-lg-8 col-md-12">
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
          <p class="h2 text-secondary">Laporan Kegiatan SPPD</p>
        </div>

        <div class="mt-3">
          <p class="h6 fw-bold">Waktu</p>
          <p class="text-muted fw-normal">{{ date(laporan.created_at) }}</p>
        </div>

        <div class="mt-4">
          <p class="h6 fw-bold">Nama Kegiatan</p>
          <p class="text-muted fw-normal">{{laporan.nama_kegiatan}}</p>
        </div>

        <div class="row mt-4">
          <div class="col">
            <p class="h6 fw-bold">Tanggal Mulai</p>
            <p class="text-muted fw-normal">{{date(laporan.surat_id.tgl_awal)}}</p>
          </div>
          <div class="col">
            <p class="h6 fw-bold">Tanggal Selesai</p>
            <p class="text-muted fw-normal">{{date(laporan.surat_id.tgl_akhir)}}</p>
          </div>
        </div>

        <div class="mt-4">
          <p class="h6 fw-bold">Dokumentasi & File</p>
          <div class="row">
            <div
              class="col-12 col-md-4 col-lg-3"
              v-for="(foto, index) in laporan.foto"
              :key="index"
            >
              <div class="mt-2 d-flex align-items-center justify-content-center">
                <img
                  :src="'http://localhost:8000/storage/' + foto"
                  alt=""
                  class="img-fluid"
                  style="max-width: 300px; max-height: 300px; overflow: hidden; border-radius: 10px;"
                >
              </div>
            </div>
          </div>
        </div>

        <div class="
                mt-4">
          <p class="h6 fw-bold">Deskripsi/Notulensi</p>
          <p class="text-muted fw-normal">{{laporan.deskripsi}}</p>
        </div>

        <div class="mt-4">
          <p class="h6 fw-bold">Lokasi Kegiatan</p>
          <p class="text-muted fw-normal">
            {{ laporan.lokasi }}
          </p>
        </div>

        <div class="btn-group d-grid gap-2 d-md-block">
          <router-link
            to="/laporan"
            class="btn btn-outline-danger"
            type="button"
          >Kembali</router-link>
          <router-link
            to="/"
            class="btn btn-success px-4"
            type="button"
          >Cetak</router-link>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import moment from "moment";

export default {
  methods: {
    date(value) {
      return moment(value).format("DD MMMM YYYY");
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
      created_at: "",
    });

    const validation = ref([]);
    const route = useRoute();

    onMounted(() => {
      axios
        .get(`http://127.0.0.1:8000/api/laporan/${route.params.id}`)
        .then(({ data }) => {
          console.log(data);
          laporan.user_id = data.data.user_id;
          laporan.surat_id = data.data.surat_id;
          laporan.nama_kegiatan = data.data.nama_kegiatan;
          laporan.foto = data.data.foto;
          laporan.lokasi = data.data.lokasi;
          laporan.deskripsi = data.data.deskripsi;
          laporan.created_at = data.data.created_at;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });

    return {
      laporan,
      validation,
    };
  },
};
</script>

<style scoped>
</style>

