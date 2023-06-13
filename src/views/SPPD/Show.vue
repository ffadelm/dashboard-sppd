<template>
  <main>
    <div class="row">
      <div class="col-lg-6 col-md-12">
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

        <div
          v-if="surat.anggota_mengikuti && surat.anggota_mengikuti.length > 0"
          class="mt-4"
        >
          <p class="h6 fw-bold">Anggota yang mengikuti</p>
          <p
            class="text-muted fw-normal"
            v-for="(anggota, index) in surat.anggota_mengikuti"
            :key="index"
          >
            {{index+1}}. {{anggota.name}}
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
          <p class="text-muted fw-normal text-justify">{{surat.keterangan}}</p>
        </div>

        <div class="mt-4">
          <p class="h6 fw-bold">Laporan Kegiatan</p>
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
                  class="img img-fluid"
                  alt="..."
                  style="height: 225px; object-fit: cover; overflow: hidden;"
                >
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title fw-semibold text-start">Kegiatan {{ index + 1 }} : {{laporan.nama_kegiatan}}</h5>
                  <p class="card-text">{{laporan.lokasi}}</p>
                  <button
                    class="btn btn-sm btn-danger"
                    @click.prevent="destroy(laporan.id, index)"
                    :class="{ 'visually-hidden': surat.diserahkan === 1 || userRole === '1'}"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </router-link>

        <div class="d-flex justify-content-between mt-4">
          <router-link
            :class="{ 'visually-hidden': surat.validasi === 0 || userRole === '1'}"
            v-if="surat.diserahkan === 0"
            class="btn btn-sm btn-info text-white px-4"
            to="/create/laporan"
            @click="tambahLaporan"
          >Tambah Laporan</router-link>

          <button
            v-if="surat.diserahkan === 0"
            class="btn btn-sm btn-secondary px-4"
            type="button"
            @click="serahkanSurat"
            :class="{ 'visually-hidden': surat.validasi === 0 || userRole === '1'}"
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
        :to="`/show/sppd/${surat.id}`"
        class="btn btn-success px-4"
        type="button"
        :class="{ 'disabled': surat.validasi === 0 }"
        @click="cetakSurat"
      >Cetak</router-link>
    </div>
  </main>
</template>

<script>
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import moment from "moment";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import logoPath from "../../assets/kop.png";
import ttdPath from "../../assets/ttd.png";
import arabPath from "../../assets/arab.png";
import footerPath from "../../assets/footer.png";

export default {
  methods: {
    async cetakSurat() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/surat/${this.surat.id}`
        );
        const suratData = response.data.data;

        const logoResponse = await fetch(logoPath);
        const ttdResponse = await fetch(ttdPath);
        const arabResponse = await fetch(arabPath);
        const footerResponse = await fetch(footerPath);

        const logoBlob = await logoResponse.blob();
        const ttdBlob = await ttdResponse.blob();
        const arabBlob = await arabResponse.blob();
        const footerBlob = await footerResponse.blob();

        const reader = new FileReader();
        reader.readAsDataURL(logoBlob);

        const reader2 = new FileReader();
        reader2.readAsDataURL(ttdBlob);

        const reader3 = new FileReader();
        reader3.readAsDataURL(arabBlob);

        const reader4 = new FileReader();
        reader4.readAsDataURL(footerBlob);

        reader.onloadend = () => {
          const logoBase64data = reader.result;
          reader2.onloadend = () => {
            const ttdBase64data = reader2.result;
            reader3.onloadend = () => {
              const arabBase64data = reader3.result;
              reader4.onloadend = () => {
                const footerBase64data = reader4.result;

                const docDefinition = {
                  header: {
                    absolutePosition: { x: 0, y: 0 },
                    columns: [
                      {
                        image: logoBase64data,
                        width: 450,
                        height: 70,
                      },
                    ],
                  },
                  content: [
                    {
                      text: "SURAT TUGAS",
                      style: "title",
                      decoration: "underline",
                      alignment: "center",
                      margin: [0, 50, 0, 0],
                    },

                    {
                      text: `NOMOR: ${suratData.nomor_surat}`,
                      style: "content",
                      alignment: "center",
                    },

                    {
                      image: arabBase64data,
                      width: 200,
                      height: 25,
                      alignment: "center",
                      margin: [0, 10],
                    },

                    {
                      text: "Yang bertanda tangan di bawah ini, Ketua Program Studi Teknologi Informasi Fakultas Teknik Universitas Muhammadiyah Yogyakarta, dengan ini memberi tugas dan ijin kepada :",
                      style: "content",
                    },

                    {
                      text: `Nama\t : ${suratData.user_id.name}`,
                      style: "content",
                    },

                    {
                      text: `NIDN\t  : ${suratData.user_id.nidn}`,
                      style: "content",
                    },

                    {
                      text: `Jabatan : ${suratData.user_id.jabatan}`,
                      style: "content",
                    },

                    // { text: "Anggota Mengikuti : Terlampir", style: "content" },

                    {
                      text: `Untuk\t : ${suratData.judul}`,
                      style: "content",
                    },

                    {
                      text: `Alamat   : ${suratData.lokasi_tujuan}`,
                      style: "content",
                    },

                    {
                      text: `Tanggal : ${this.date(
                        suratData.tgl_awal
                      )} - ${this.date(suratData.tgl_akhir)}`,
                      style: "content",
                    },

                    {
                      text: "Demikian surat tugas ini dibuat agar dapat dilaksanakan dengan sebaik-baiknya dan penuh tanggung jawab.",
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
                              text: `Yogyakarta, ${this.date(
                                moment()
                              )}\nKetua Program Studi Teknologi Informasi`,
                            },
                            {
                              image: ttdBase64data,
                              width: 100,
                              alignment: "center",
                            },
                            {
                              text: "Cahya Damarjati, S.T., M.Eng., Ph.D.",
                              decoration: "underline",
                              bold: true,
                            },
                            {
                              text: "NIK. 19870315201507123077",
                            },
                          ],
                          alignment: "center",
                        },
                      ],
                      margin: [0, 40],
                      style: "content",
                    },

                    // {
                    //   text: "Lampiran",
                    //   style: "title",
                    //   decoration: "underline",
                    //   alignment: "center",
                    //   margin: [0, 50, 0, 20],
                    //   pageBreak: "before",
                    // },
                  ],

                  footer: {
                    relativePosition: { x: 0, y: -110 },
                    stack: [
                      {
                        image: footerBase64data,
                        width: 595,
                        height: 150,
                      },
                    ],
                  },

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
                    tableHeader: {
                      fontSize: 13,
                      color: "black",
                      bold: true,
                      alignment: "center",
                    },
                    footer: {
                      fontSize: 12,
                      alignment: "center",
                    },
                  },
                };

                if (
                  suratData.anggota_mengikuti &&
                  suratData.anggota_mengikuti.length > 0
                ) {
                  const anggotaMengikuti = {
                    text: "Anggota Mengikuti : Terlampir",
                    style: "content",
                  };

                  // Menyisipkan elemen "Anggota Mengikuti : Terlampir" setelah jabatan
                  docDefinition.content.splice(10, 0, anggotaMengikuti); // Menyisipkan anggotaMengikuti pada indeks 6
                }

                if (
                  suratData.anggota_mengikuti &&
                  suratData.anggota_mengikuti.length > 0
                ) {
                  // Tambahkan logika untuk menambahkan halaman "Lampiran" jika anggota_mengikuti tidak sama dengan {0: null}
                  docDefinition.content.push({
                    text: "Lampiran",
                    style: "title",
                    decoration: "underline",
                    alignment: "center",
                    margin: [0, 50, 0, 20],
                    pageBreak: "before",
                  });
                }

                let anggotaMengikutiTable = null;

                if (
                  suratData.anggota_mengikuti &&
                  suratData.anggota_mengikuti.length === 0
                ) {
                  anggotaMengikutiTable = null;
                } else {
                  anggotaMengikutiTable = {
                    table: {
                      widths: ["auto", "*", "*"],
                      body: [
                        [
                          { text: "No", style: "tableHeader" },
                          { text: "Nama Anggota", style: "tableHeader" },
                          { text: "Sebagai", style: "tableHeader" },
                        ],
                        ...suratData.anggota_mengikuti.map((anggota, index) => [
                          index + 1,
                          anggota.name,
                          anggota.sebagai,
                        ]),
                      ],
                    },
                    layout: {
                      hLineWidth: function (i) {
                        return i === 0 || i === 1 ? 2 : 1;
                      },
                      vLineWidth: function (i) {
                        return 1;
                      },
                      hLineColor: function (i) {
                        return i === 0 || i === 1 ? "#000000" : "#000000";
                      },
                      paddingLeft: function (i) {
                        return i === 0 ? 0 : 8;
                      },
                      paddingRight: function (i) {
                        return i === 2 ? 0 : 8;
                      },
                      paddingTop: function (i) {
                        return i === 0 ? 8 : 0;
                      },
                      paddingBottom: function (i, node) {
                        return i === node.table.body.length - 1 ? 8 : 0;
                      },
                    },
                    style: "content",
                  };
                }

                // const anggotaMengikutiTable = {
                //   table: {
                //     widths: ["auto", "*"],
                //     body: [
                //       [
                //         { text: "No", style: "tableHeader" },
                //         {
                //           text: "Nama Anggota",
                //           style: "tableHeader",
                //         },
                //       ],
                //       ...suratData.anggota_mengikuti.map((anggota, index) => [
                //         index + 1,
                //         anggota,
                //       ]),
                //     ],
                //   },
                //   layout: {
                //     hLineWidth: function (i) {
                //       return i === 0 || i === 1 ? 2 : 1;
                //     },
                //     vLineWidth: function (i) {
                //       return 1;
                //     },
                //     hLineColor: function (i) {
                //       return i === 0 || i === 1 ? "#000000" : "#000000";
                //     },
                //     paddingLeft: function (i) {
                //       return i === 0 ? 0 : 8;
                //     },
                //     paddingRight: function (i) {
                //       return i === 1 ? 0 : 8;
                //     },
                //     paddingTop: function (i) {
                //       return i === 0 ? 8 : 0;
                //     },
                //     paddingBottom: function (i, node) {
                //       return i === node.table.body.length - 1 ? 8 : 0;
                //     },
                //   },
                //   style: "content",
                // };

                docDefinition.content.push(anggotaMengikutiTable);

                // Buat file PDF
                const pdfDocGenerator = pdfMake.createPdf(docDefinition);
                pdfDocGenerator.download(suratData.judul + ".pdf");
              };
            };
          };
        };
      } catch (error) {
        console.log(error);
      }
    },

    date(value) {
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
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `${day} ${month} ${year}`;
    },

    tambahLaporan() {
      const suratId = this.surat.id;

      localStorage.setItem("suratId", suratId);

      this.$router.push("/create/laporan");
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
            text: "Surat Berhasil Diserahkan!",
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
    const router = useRouter();

    const userRole = localStorage.getItem("userRole");

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

    function destroy(id, index) {
      swal({
        title: "Apakah anda yakin?",
        text: "Setelah dihapus, data tidak dapat dikembalikan!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(`http://127.0.0.1:8000/api/laporan/${id}`)
            .then((response) => {
              location.reload();
              console.log(response.data);
              laporan.value.splice(index, 1);
            })
            .catch((err) => {
              console.log(err);
            });

          swal("Data berhasil dihapus!", {
            icon: "success",
          });
        }
      });
    }

    return {
      surat,
      laporanFilter,
      laporan,
      destroy,
      userRole,
    };
  },
};
</script>

<style>
.text-justify {
  text-align: justify;
  text-justify: inter-word;
}
.card-text {
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-title {
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
@media screen and (max-width: 600px) {
  .img {
    width: 100%;
    height: auto;
  }
}
</style>

