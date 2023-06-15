<template>
  <main class="home-page">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Selamat Datang, {{userName}}</h1>
    </div>
    <div class="dashboard row col-lg-12 col-md-12">
      <div class="col-lg-6 col-md-12">
        <LineChart />
      </div>
      <div class="col-lg-6 col-md-12">
        <div class="row">
          <div class="col-md-6">
            <div class="card bg-primary text-white mb-3">
              <div class="card-body">
                <h3 class="card-title">
                  <i class="material-icons">access_time</i> Terbaru
                </h3>
                <p class="card-text">{{ terbaru }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card bg-success text-white mb-3">
              <div class="card-body">
                <h3 class="card-title">
                  <i class="material-icons">check_circle</i> Selesai
                </h3>
                <p class="card-text">{{ selesai }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card bg-warning text-white mb-3">
              <div class="card-body">
                <h3 class="card-title">
                  <i class="material-icons">verified</i> Tervalidasi
                </h3>
                <p class="card-text">{{ valid }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card bg-info text-white mb-3">
              <div class="card-body">
                <h3 class="card-title">
                  <i class="material-icons">list</i> Semua
                </h3>
                <p class="card-text">{{ jumlahSurat }}</p>
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
            <th scope="col">#</th>
            <th scope="col">No. Surat</th>
            <th scope="col">Judul</th>
            <th scope="col">Penerima Perintah</th>
            <th scope="col">Tanggal Surat</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(letter, index) in currentData"
            :key="index"
          >
            <th scope="row">{{ startIndex + index + 1 }}</th>
            <td>{{ letter.nomor_surat }}</td>
            <td
              class="text-truncate"
              style="max-width: 300px;"
            >{{ letter.judul }}</td>
            <td>{{ letter.user_id.name }}</td>
            <td>{{ date(letter.tgl_awal) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

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
  </main>
</template>

<script>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import LineChart from "../components/LineChart.vue";

export default {
  components: {
    LineChart,
  },
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
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");
    const userName = localStorage.getItem("Name");

    const letters = ref([]);
    const currentPage = ref(1);
    const perPage = 5;

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

    onMounted(() => {
      if (userRole === "0") {
        axios
          .get(`http://127.0.0.1:8000/api/surat?user_id=${userId}`)
          .then(({ data }) => {
            letters.value = data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get(`http://127.0.0.1:8000/api/surat`)
          .then(({ data }) => {
            letters.value = data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    const jumlahSurat = computed(() => {
      if (Array.isArray(letters.value)) {
        return letters.value.length;
      }
      return 0;
    });

    const selesai = computed(() => {
      if (Array.isArray(letters.value)) {
        const suratSelesai = letters.value.filter(
          (surat) => surat.diserahkan === 1
        );
        return suratSelesai.length;
      }
      return 0;
    });

    const terbaru = computed(() => {
      if (Array.isArray(letters.value)) {
        const suratTervalidasi = letters.value.filter(
          (surat) => surat.validasi === 0
        );
        return suratTervalidasi.length;
      }
      return 0;
    });

    const valid = computed(() => {
      if (Array.isArray(letters.value)) {
        const suratTervalidasi = letters.value.filter(
          (surat) => surat.validasi === 1
        );
        return suratTervalidasi.length;
      }
      return 0;
    });

    return {
      letters,
      jumlahSurat,
      selesai,
      terbaru,
      valid,
      userName,
      totalPages,
      currentData,
      currentPage,
      goToPage,
      startIndex,
    };
  },
};
</script>

<style scoped>
.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: left;
}

.card-text {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0;
}

.table {
  margin-top: 1.5rem;
}

.table th {
  font-size: 1.2rem;
  font-weight: bold;
}

.table td {
  font-size: 1.1rem;
}

.table-responsive {
  overflow-x: auto;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
}

.mb-3 {
  margin-bottom: 1.5rem;
}

.mt-3 {
  margin-top: 1.5rem;
}
@media (min-width: 992px) {
  .dashboard {
    display: flex;
    align-items: flex-start;
  }
  .col-lg-6 {
    flex-basis: 50%;
    max-width: 50%;
  }
}
</style>