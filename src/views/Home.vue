<template>
  <!-- 
  Membuat card untuk menampilkan data selesai, terbaru, dan semua
 -->
  <main class="home-page">
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
      <h1 class="h2">Dashboard</h1>
    </div>
    <div class="dashboard row col-lg-8">
      <div class="col-md-4">
        <div class="card bg-success mb-3">
          <div class="card-body text-white">
            <div class="row">
              <div class="col-md-9">
                <h5 class="card-title">Terbaru</h5>
                <p class="card-text">
                  5
                </p>
              </div>
              <div class="col-md-3">
                <img
                  src="public/letter.svg"
                  alt=""
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-danger mb-3">
          <div class="card-body text-white">
            <div class="row">
              <div class="col-md-9">
                <h5 class="card-title">Selesai</h5>
                <p class="card-text">
                  5
                </p>
              </div>
              <div class="col-md-3">
                <img
                  src="public/letter.svg"
                  alt=""
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-info mb-3">
          <div class="card-body text-white">
            <div class="row">
              <div class="col-md-9">
                <h5 class="card-title">Semua</h5>
                <p class="card-text">
                  10
                </p>
              </div>
              <div class="col-md-3">
                <img
                  src="public/letter.svg"
                  alt=""
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive mt-3">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">No. Surat</th>
            <th scope="col">Judul</th>
            <th scope="col">Penerima Surat</th>
            <th scope="col">Tanggal Surat</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(letter, index) in letters.data"
            :key="index"
          >
            <th scope="row">{{ index+1 }}</th>
            <td>{{ letter.nomor_surat }}</td>
            <td>{{ letter.judul }}</td>
            <td>{{ letter.user_id.name }}</td>
            <td>{{ date(letter.tgl_awal) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
    let letters = ref([]);

    onMounted(() => {
      axios
        .get("http://sppd-api.herokuapp.com/api/perintah-jalan")
        .then(({ data }) => {
          letters.value = data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return {
      letters,
    };
  },
};
</script>
