<template>
  <main class="laporan-page">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Daftar Seluruh Laporan Kegiatan SPPD</h1>
    </div>

    <div class="row">
      <div
        class="col-md-4"
        v-for="(report, index) in currentData"
        :key="index"
      >
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ report.user_id.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted text-truncate">{{ report.lokasi }}</h6>
            <p class="card-text text-truncate">{{ report.nama_kegiatan }}</p>
            <router-link
              :to="`/detail-laporan/${report.id}`"
              class="btn btn-sm btn-outline-primary"
            >Detail</router-link>
          </div>
        </div>
      </div>
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
import { onMounted, ref, computed } from "vue";
import moment from "moment";

export default {
  methods: {
    date(value) {
      return moment(value).format("DD-MM-YYYY");
    },
  },
  setup() {
    let reports = ref([]);
    const currentPage = ref(1);
    const perPage = ref(6);
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

    onMounted(() => {
      if (userRole === "0") {
        axios
          .get(`https://api.sppd.tatiumy.com/api/laporan?user_id=${userId}`)
          .then(({ data }) => {
            reports.value = data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get("https://api.sppd.tatiumy.com/api/laporan")
          .then(({ data }) => {
            reports.value = data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    // Hitung jumlah total halaman berdasarkan jumlah data dan data per halaman
    const totalPages = computed(() =>
      Math.ceil(reports.value.length / perPage.value)
    );

    // Ambil data untuk halaman saat ini berdasarkan currentPage dan perPage
    const currentData = computed(() => {
      const start = (currentPage.value - 1) * perPage.value;
      const end = start + perPage.value;
      return reports.value.slice(start, end);
    });

    function goToPage(page) {
      currentPage.value = page;
    }

    return {
      reports,
      currentPage,
      totalPages,
      currentData,
      goToPage,
    };
  },
};
</script>

<style scoped>
/* Style untuk container card */
.card-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

/* Style untuk card */
.card {
  margin-right: 1rem;
  /* Style card sesuai kebutuhan */
}

/* Style untuk card terakhir */
.card:last-child {
  margin-right: 0;
}

.card-title {
  text-align: left;
}
</style>