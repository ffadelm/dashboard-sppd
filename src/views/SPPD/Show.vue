<template>
  <main>
    <!-- <div class="card">
      <div class="card-header text-center">
        <h4 class="card-title">
          {{ surat.judul }}
        </h4>
        <p>{{ surat.nomor_surat }}</p>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <tr>
            <th>1</th>
            <th>Pejabat yang berwenang memberi perintah</th>
            <td>{{ surat.pemberi_perintah }}</td>
          </tr>

          <tr>
            <th>2</th>
            <th>Nama Pegawai yang diperintahkan</th>
            <td>{{surat.user_id.name}}</td>
          </tr>

          <tr>
            <th>3</th>
            <th>Anggota yang Mengikuti</th>
            <td>
              {{ surat.anggota_mengikuti }}
            </td>
          </tr>

          <tr>
            <th>4</th>
            <th>Lokasi Tujuan</th>
            <td>{{surat.lokasi_tujuan}}</td>
          </tr>

          <tr>
            <th>5</th>
            <th>Keterangan</th>
            <td class="col-lg-6">
              {{ surat.keterangan }}
            </td>
          </tr>

          <tr>
            <th>6</th>
            <th>Tanggal Mulai</th>
            <td>{{surat.tgl_awal}}</td>
          </tr>

          <tr>
            <th>7</th>
            <th>Tanggal Akhir</th>
            <td>{{surat.tgl_akhir}}</td>
          </tr>
        </table>

        <div class="btn-group d-grid gap-2 d-md-block">
          <router-link
            to="/surat-perintah"
            class="btn btn-outline-danger"
            type="button"
          >Kembali</router-link>
          <router-link
            to="/surat-perintah"
            class="btn btn-success px-4"
            type="button"
          >Cetak</router-link>
        </div>
      </div>
    </div> -->
    <div class="rangkasurat">
      <table class="isi">
        <tr>
          <td>1</td>
          <td>Pejabat yang berwenang memberi perintah</td>
          <td>{{surat.pemberi_perintah}}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Nama Pegawai yang diperintahkan</td>
          <td>{{surat.user_id.name}}</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Anggota yang Mengikuti</td>
          <td
            style="outline: none"
            v-for="(anggota, index) in surat.anggota_mengikuti"
            :key="index"
          >{{anggota}}</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Lokasi Tujuan</td>
          <td>{{surat.lokasi_tujuan}}</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Keterangan</td>
          <td class="col-lg-6">{{surat.keterangan}}</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Tanggal Mulai</td>
          <td>{{surat.tgl_awal}}</td>
        </tr>
        <tr>
          <td>7</td>
          <td>Tanggal Akhir</td>
          <td>{{surat.tgl_akhir}}</td>
        </tr>
      </table>
    </div>
  </main>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const surat = reactive({
      user_id: "",
      judul: "",
      nomor_surat: "",
      pemberi_perintah: "",
      anggota_mengikuti: "",
      lokasi_tujuan: "",
      keterangan: "",
      tgl_awal: "",
      tgl_akhir: "",
    });

    const validation = ref([]);
    const route = useRoute();

    onMounted(() => {
      axios
        .get(
          `https://sppd-api.herokuapp.com/api/perintah-jalan/${route.params.id}`
        )
        .then(({ data }) => {
          console.log(data);
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

    return {
      surat,
      validation,
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border: 1px solid;
}
tr {
  outline: thin solid;
}
td {
  padding: 5px;
  outline: thin solid;
}
</style>>
