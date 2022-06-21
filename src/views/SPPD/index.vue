<template>
  <!-- belum bisa delete -->
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
            <th scope="col">No</th>
            <th scope="col">No. Surat</th>
            <th scope="col">Judul Surat</th>
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
            <td>{{ letter.nomor_surat }}</td>
            <td>{{ letter.judul }}</td>
            <td>{{ letter.user_id.name }}</td>
            <td>
              <div class="btn-group">
                <router-link
                  :to="`/show/sppd/${letter.id}`"
                  class="btn btn-sm btn-outline-info"
                >Detail</router-link>
                <router-link
                  :to="`/update/sppd/${letter.id}`"
                  class="btn btn-sm btn-outline-warning"
                >Ubah</router-link>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click.prevent="destroy(letter.id, index)"
                >
                  Hapus
                </button>
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

    function destroy(id, index) {
      axios
        .delete(`https://sppd-api.herokuapp.com/api/perintah-jalan/${id}`)
        .then(() => {
          letters.value.data.splice(index, 1);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }

    return {
      letters,
      destroy,
    };
  },
};
</script>

<style>
</style>