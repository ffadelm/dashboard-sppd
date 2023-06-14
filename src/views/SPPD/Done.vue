<template>
  <main class="surat-selesai">
    <div class="container">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Daftar Surat Selesai</h1>
      </div>
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
              <th scope="col">No</th>
              <th scope="col">Nomor Surat</th>
              <th scope="col">Judul Surat</th>
              <th scope="col">Tanggal Selesai</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(surat, index) in currentData"
              :key="index"
            >
              <th scope="row">{{ startIndex + index + 1 }}</th>
              <td
                scope="row"
                style="max-width: 20px"
              >{{ surat.nomor_surat }}</td>
              <td
                class="text-truncate"
                style="max-width: 250px;"
                scope="row"
              >{{ surat.judul }}</td>
              <td scope="row">{{ date(surat.tgl_akhir) }}</td>
              <td scope="row">
                <router-link
                  :to="`/show/sppd/${surat.id}`"
                  class="btn btn-sm btn-outline-info "
                >Detail</router-link>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          v-if="currentData.length === 0"
          class="text-center mt-3"
        >
          <p>Tidak ada data yang ditemukan.</p>
        </div>

        <div class="d-flex justify-content-center">
          <nav aria-label="Pagination">
            <ul class="pagination">
              <li
                class="page-item"
                :class="{ disabled: currentPage === 1 }"
              >
                <button
                  class="page-link"
                  @click="goToPage(currentPage - 1)"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li
                class="page-item"
                v-for="page in totalPages"
                :key="page"
                :class="{ active: currentPage === page }"
              >
                <button
                  class="page-link"
                  @click="goToPage(page)"
                >{{ page }}</button>
              </li>
              <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
              >
                <button
                  class="page-link"
                  @click="goToPage(currentPage + 1)"
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import axios from "axios";
import { onMounted, ref, computed } from "vue";

export default {
  methods: {
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
  },
  setup() {
    const letters = ref([]);
    const currentPage = ref(1);
    const perPage = 10;
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

    // Hitung jumlah total halaman berdasarkan jumlah data dan data per halaman
    const totalPages = computed(() =>
      Math.ceil(letters.value.length / perPage)
    );

    // Hitung indeks awal data untuk halaman saat ini
    const startIndex = computed(() => (currentPage.value - 1) * perPage);

    // Ambil data untuk halaman saat ini berdasarkan startIndex dan perPage
    const currentData = computed(() => {
      return letters.value.slice(startIndex.value, startIndex.value + perPage);
    });

    function goToPage(page) {
      currentPage.value = page;
    }

    return {
      letters,
      totalPages,
      currentData,
      currentPage,
      goToPage,
      startIndex,
    };
  },
};
</script>

<style>
</style>