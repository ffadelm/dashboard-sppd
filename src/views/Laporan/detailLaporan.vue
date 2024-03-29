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
          <p class="h2">Laporan Kegiatan SPPD</p>
          <p
            class="text-muted"
            :class="{'visually-hidden': userRole === '0'}"
          >{{laporan.user_id.name}}</p>
        </div>

        <div class="mt-3">
          <p class="h6 fw-bold">Waktu</p>
          <p class="text-muted fw-normal">{{ time(laporan.created_at) }}</p>
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
          <p class="h6 fw-bold">Dokumentasi</p>
          <div class="row">
            <div
              class="col-12 col-md-4 col-lg-3"
              v-for="(foto, index) in laporan.foto"
              :key="index"
            >
              <div class="mt-2 d-flex align-items-center justify-content-center">
                <img
                  :src="'https://api.sppd.tatiumy.com/storage/' + foto"
                  alt=""
                  class="img-fluid"
                  style="max-width: 500px; max-height: 500px; overflow: hidden; border-radius: 10px;"
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
            :to="`/show/sppd/${laporan.surat_id.id}`"
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
import "moment/locale/id";

import pdfMake from "pdfmake/build/pdfmake";

import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import logoPath from "../../assets/kop.png";

export default {
  methods: {
    async cetakLaporan() {
      try {
        const response = await axios.get(
          `https://api.sppd.tatiumy.com/api/laporan/${this.laporan.id}`
        );
        const laporanData = response.data.data;

        const logoResponse = await fetch(logoPath);

        const logoBlob = await logoResponse.blob();

        const reader = new FileReader();
        reader.readAsDataURL(logoBlob);

        reader.onloadend = () => {
          const KopBase64data = reader.result;

          const docDefinition = {
            header: {
              absolutePosition: { x: 0, y: 0 },
              columns: [
                {
                  image: KopBase64data,
                  width: 450,
                  height: 70,
                },
              ],
            },
            content: [
              {
                text: "Laporan Tugas",
                style: "title",
                alignment: "center",
                margin: [0, 50, 0, 20],
              },
              {
                text: `Nama Kegiatan\t\t\t\t  : ${laporanData.nama_kegiatan}`,
                style: "content",
              },
              {
                text: `Nama Pelaksana tugas\t: ${laporanData.user_id.name}`,
                style: "content",
              },
              {
                text: `NIDN\t\t\t\t\t\t\t\t\t: ${laporanData.user_id.nidn}`,
                style: "content",
              },
              {
                text: `Jabatan\t\t\t\t\t\t\t   : ${laporanData.user_id.jabatan}`,
                style: "content",
              },
              {
                text: `Hari, Tanggal\t\t\t\t\t  : ${this.date(
                  laporanData.created_at
                )}`,
                style: "content",
              },
              {
                text: `Waktu\t\t\t\t\t\t\t\t  : ${this.time(
                  laporanData.created_at
                )}`,
                style: "content",
              },
              {
                text: `Tempat\t\t\t\t\t\t\t\t: ${laporanData.lokasi}`,
                style: "content",
              },
              {
                text: "Notulensi",
                style: "title",
                alignment: "center",
                margin: [0, 10, 0, 20],
              },
              {
                text: `${laporanData.deskripsi}`,
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
              header: { fontSize: 12, margin: [0, 0, 0, 10] },
              title: {
                fontSize: 20,
                margin: [0, 0, 0, 10],
                bold: true,
              },
              content: {
                fontSize: 12,
                margin: [0, 0, 0, 10],
                textAlign: "justify",
              },
            },
          };
          const pdfDocGenerator = pdfMake.createPdf(docDefinition);
          pdfDocGenerator.download(laporanData.nama_kegiatan + ".pdf");
        };
      } catch (error) {
        console.log(error);
      }
    },
    date(value) {
      const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];

      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const date = new Date(value);
      const day = days[date.getDay()];
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `${day}, ${date.getDate()} ${month} ${year}`;
    },
    time(value) {
      const date = new Date(value);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const period = hours < 12 ? "AM" : "PM";

      return `${hours}:${minutes} ${period}`;
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
    const userRole = localStorage.getItem("userRole");

    onMounted(() => {
      axios
        .get(`https://api.sppd.tatiumy.com/api/laporan/${route.params.id}`)
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
      userRole,
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

