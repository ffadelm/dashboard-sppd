<template>
  <main class="surat-selesai">
    <div class="container">
      <h1>Daftar Surat Selesai</h1>
      <div v-if="letters.length === 0">
        <p>Tidak ada surat yang selesai.</p>
      </div>
      <div v-else>
        <table
          id="table"
          class="table table-striped table-hover table-sm"
        >
          <thead>
            <tr>
              <th scope="col">Judul Surat</th>
              <th scope="col">Nomor Surat</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(surat, index) in letters"
              :key="index"
            >
              <td
                class="text-truncate"
                style="max-width: 200px;"
                scope="row"
              >{{ surat.judul }}</td>
              <td scope="row">{{ surat.nomor_surat }}</td>
              <td scope="row">{{ surat.diserahkan }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>


<script>
import axios from "axios";
import { onMounted, ref, computed } from "vue";

export default {
  setup() {
    const letters = ref([]);
    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

    onMounted(() => {
      if (userRole === "0") {
        axios
          .get(`http://127.0.0.1:8000/api/surat-selesai?user_id=${userId}`)
          .then(({ data }) => {
            letters.value = data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get("http://127.0.0.1:8000/api/surats-selesai")
          .then(({ data }) => {
            letters.value = data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    return {
      letters,
    };
  },
};
</script>

<style>
</style>