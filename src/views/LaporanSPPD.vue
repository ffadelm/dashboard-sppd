<template>
  <!-- 
  dibuat berdasarkan pegawai 
 -->
  <main class="laporan-page">
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
      <h1 class="h2">Laporan SPPD</h1>
    </div>
    <table
      id="datatable"
      class="table table-striped table-hover table-sm"
    >
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">No. Surat</th>
          <th scope="col">Nama Pegawai</th>
          <th scope="col">Tanggal Mulai</th>
          <th scope="col">Tanggal Selesai</th>
          <th scope="col">Tujuan</th>
          <th scope="col">Nama Kegiatan</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(report, index) in reports.data"
          :key="index"
        >
          <th scope="row">{{ index+1 }}</th>
          <td>{{ report.perintah_jalan_id.nomor_surat }}</td>
          <td>{{ report.user_id.name }}</td>
          <td>{{ date(report.perintah_jalan_id.tgl_awal) }}</td>
          <td>{{ date(report.perintah_jalan_id.tgl_akhir) }}</td>
          <td>{{ report.perintah_jalan_id.tujuan }}</td>
          <td>{{ report.nama_kegiatan }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import moment from "moment";

export default {
  methods: {
    date(value) {
      return moment(value).format("DD-MM-YYYY");
    },
  },
  setup() {
    let reports = ref([]);

    onMounted(() => {
      axios
        .get("http://103.100.27.29/sppd/public/api/laporan-jalan")
        .then(({ data }) => {
          reports.value = data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return {
      reports,
    };
  },
};
</script>

<style>
</style>