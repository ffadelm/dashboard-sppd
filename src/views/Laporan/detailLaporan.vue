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
          <p class="text-justify text-muted fw-normal">{{laporan.deskripsi}}</p>
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
            :to="`/detail-laporan/${laporan.id}`"
            class="btn btn-success px-4"
            type="button"
            @click="cetakLaporan"
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
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  methods: {
    async cetakLaporan() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/laporan/${this.laporan.id}`
        );

        console.log(response);

        const laporanData = response.data.data;

        const docDefinition = {
          content: [
            {
              text: "Laporan Kegiatan SPPD",
              style: "title",
              bold: true,
              alignment: "center",
              margin: [0, 0, 0, 20],
            },
            {
              text: `Waktu Kegiatan : ${this.time(laporanData.created_at)}`,
              style: "content",
            },
            {
              text: `\nNo. Surat : ${laporanData.surat_id.nomor_surat}`,
              style: "content",
            },
            {
              text: `Judul Kegiatan : ${laporanData.nama_kegiatan}`,
              style: "content",
            },
            {
              text: `Nama Penerima : ${laporanData.user_id.name}`,
              style: "content",
            },
            {
              text: `NIDN : ${laporanData.user_id.nidn}`,
              style: "content",
            },
            {
              text: `Jabatan : ${laporanData.user_id.jabatan}`,
              style: "content",
            },
            { text: "Anggota yang mengikuti:", style: "content" },
            ...(laporanData.surat_id.anggota_mengikuti.map(
              (anggota, index) => ({
                text: `${index + 1}. ${anggota}`,
                style: "content",
              })
            ) || []), // Menangani jika 'anggota_mengikuti' adalah array kosong
            {
              text: `Lokasi : ${laporanData.lokasi}`,
              style: "content",
            },
            {
              text: `Tanggal : ${this.date(
                laporanData.surat_id.tgl_awal
              )} - ${this.date(laporanData.surat_id.tgl_akhir)}`,
              style: "content",
            },
            {
              text: `Notulensi : ${laporanData.deskripsi}`,
              style: "content",
            },

            {
              text: "\n\n\n",
              style: "content",
            },

            {
              columns: [
                { width: "*", text: "" },
                {
                  width: "auto",
                  stack: [
                    {
                      text: "Mengetahui/menyetujui",
                      style: "content",
                    },
                    {
                      text: "\n\n\n\n\n",
                      alignment: "center",
                    },
                    {
                      text: "Cahya Damarjati, S.T., M.Eng., Ph.D.",
                      style: "content",
                    },
                  ],
                  margin: [0, 0, 100, 0],
                  alignment: "center",
                },
                {
                  width: "auto",
                  stack: [
                    {
                      text: `Yogyakarta, ${this.date(moment())}`,
                      style: "content",
                    },
                    {
                      text: "Yang membuat",
                      style: "content",
                    },
                    {
                      text: "\n\n\n",
                      alignment: "center",
                    },
                    {
                      text: `${laporanData.user_id.name}`,
                      style: "content",
                    },
                  ],
                  margin: [85, 0, 0, 0],
                  alignment: "center",
                },
              ],
              margin: [0, 40],
              style: "content",
            },
          ],
          styles: {
            header: { fontSize: 12, bold: true, margin: [0, 0, 0, 10] },
            title: {
              fontSize: 20,
              bold: true,
              margin: [0, 0, 0, 10],
              FontFace: "Times",
            },
            content: {
              fontSize: 12,
              margin: [0, 0, 0, 10],
              textAlign: "justify",
              FontFace: "Times",
            },
          },
        };
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.download(laporanData.nama_kegiatan + ".pdf");
      } catch (error) {
        console.log(error);
      }
    },
    date(value) {
      return moment(value).format("DD MMMM YYYY");
    },
    time(value) {
      return moment(value).format("DD MMMM YYYY, HH:mm A");
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
          laporan.id = data.data.id;
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
.text-justify {
  text-align: justify;
  text-justify: inter-word;
}
</style>

