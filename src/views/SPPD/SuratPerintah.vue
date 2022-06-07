<template>
  <main class="surat-page">
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
      <h1 class="h2">Surat Perintah Perjalanan Dinas</h1>
    </div>
    <div class="table-responsive">
      <router-link
        class="btn btn-primary mb-3"
        to="/create/sppd"
      >Buat SPPD baru</router-link>

      <table class="table table-striped table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Judul Kegiatan</th>
            <th scope="col">Pemberi Perintah</th>
            <th scope="col">Penerima Perintah</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(letter, index) in letters.data"
            :key="index"
          >
            <th scope="row">{{ index+1 }}</th>
            <td>{{ letter.judul }}</td>
            <td>{{ letter.pemberi_perintah }}</td>
            <td>{{ letter.penerima_perintah }}</td>
            <td>
              <div class="btn-group">
                <router-link
                  to="/"
                  class="btn btn-sm btn-outline-info"
                >Detail</router-link>
                <router-link
                  to="/"
                  class="btn btn-sm btn-outline-warning"
                >Ubah</router-link>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                >Hapus</button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-success"
                >Cetak</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
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

<style>
</style>