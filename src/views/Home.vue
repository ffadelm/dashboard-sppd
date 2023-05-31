<template>
  <main class="home-page">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Dashboard</h1>
    </div>
    <div class="dashboard row col-lg-12 col-md-12">
      <div class="col-md-3">
        <div class="card bg-primary text-white mb-3">
          <div class="card-body">
            <h3 class="card-title">
              <i class="material-icons">access_time</i> Terbaru
            </h3>
            <p class="card-text">{{ terbaru }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-success text-white mb-3">
          <div class="card-body">
            <h3 class="card-title">
              <i class="material-icons">check_circle</i> Selesai
            </h3>
            <p class="card-text">{{ selesai }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-warning text-white mb-3">
          <div class="card-body">
            <h3 class="card-title">
              <i class="material-icons">verified</i> Tervalidasi
            </h3>
            <p class="card-text">{{ valid }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
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
            <th scope="row">{{ index + 1 }}</th>
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

    <nav aria-label="Pagination">
      <ul class="pagination justify-content-center mt-3">
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click="goToPage(currentPage - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li
          class="page-item"
          :class="{ active: page === currentPage }"
          v-for="page in totalPages"
          :key="page"
        >
          <a
            class="page-link"
            href="#"
            @click="goToPage(page)"
          >{{ page }}</a>
        </li>

        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click="goToPage(currentPage + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import moment from "moment";

export default {
  methods: {
    date(value) {
      return moment(value).format("DD-MM-YYYY");
    },
  },
  setup() {
    let letters = ref([]);

    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

    let currentPage = ref(1);
    const pageSize = 11;

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    const startIndex = computed(() => (currentPage.value - 1) * pageSize);
    const endIndex = computed(() => startIndex.value + pageSize);
    const paginatedLetters = computed(() =>
      letters.value.data.slice(startIndex.value, endIndex.value)
    );
    const totalPages = computed(() => {
      if (Array.isArray(letters.value.data)) {
        return Math.ceil(letters.value.data.length / pageSize);
      }
      return 0;
    });

    onMounted(() => {
      if (userRole === "0") {
        axios
          .get(`http://127.0.0.1:8000/api/surat?user_id=${userId}`)
          .then(({ data }) => {
            letters.value = data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get(`http://127.0.0.1:8000/api/surat`)
          .then(({ data }) => {
            letters.value = data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    const jumlahSurat = computed(() => {
      if (Array.isArray(letters.value.data)) {
        return letters.value.data.length;
      }
      return 0;
    });

    const selesai = computed(() => {
      if (Array.isArray(letters.value.data)) {
        const suratSelesai = letters.value.data.filter(
          (surat) => surat.diserahkan === 1
        );
        return suratSelesai.length;
      }
      return 0;
    });

    const terbaru = computed(() => {
      if (Array.isArray(letters.value.data)) {
        const suratTervalidasi = letters.value.data.filter(
          (surat) => surat.validasi === 0
        );
        return suratTervalidasi.length;
      }
      return 0;
    });

    const valid = computed(() => {
      if (Array.isArray(letters.value.data)) {
        const suratTervalidasi = letters.value.data.filter(
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
      currentPage,
      goToPage,
      paginatedLetters,
      totalPages,
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
</style>