<template>
  <main class="panel-task">
    <div class="card">
      <div class="card-header fs-3">
        Surat yang belum di validasi
      </div>
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li
            v-for="surat in suratBelumValidasi"
            :key="surat.id"
            class="list-group-item"
          >
            <div class="surat-info">
              <router-link
                class="surat-title fs-5 text-dark text-decoration-none"
                style="max-width: 50rem;"
                :to="`/show/sppd/${surat.id}`"
              >{{ surat.judul }}</router-link>
              <div class="
              surat-date">{{ tanggal(surat.created_at) }}</div>
            </div>
            <button
              class="validasi-button btn btn-success"
              @click="validasiSurat(surat)"
            >
              <i class="material-icons">done</i>
            </button>
          </li>
          <li
            v-if="suratBelumValidasi.length === 0"
            class="empty-message list-group-item text-center"
          >
            Tidak ada surat yang perlu divalidasi.
          </li>
        </ul>
      </div>
    </div>
  </main>

</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      suratBelumValidasi: [],
    };
  },
  created() {
    this.getSuratBelumValidasi();
  },
  methods: {
    tanggal(value) {
      return moment(value).format("DD MMMM YYYY, h:mm:ss a");
    },
    getSuratBelumValidasi() {
      axios
        .get("https://api.sppd.tatiumy.com/api/surat")
        .then((response) => {
          const suratData = response.data.data;
          this.suratBelumValidasi = suratData.filter(
            (surat) => surat.validasi == 0
          );
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    },

    validasiSurat(surat) {
      const suratId = surat.id;
      // Lakukan tindakan validasi surat
      console.log("Validasi surat dengan ID " + suratId);

      // Kirim permintaan ke API untuk mengubah status validasi
      axios
        .put(`https://api.sppd.tatiumy.com/api/surat/${suratId}`, {
          validasi: 1,
        })
        .then((response) => {
          // Ubah status validasi di dalam data lokal
          surat.validasi = 1;
          // SweetAlert sukses
          swal({
            icon: "success",
            title: "Surat berhasil divalidasi!",
            showConfirmButton: false,
            timer: 1500,
          });
          // Muat ulang halaman
          location.reload();
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
  display: flex;
  flex: 1;
  padding: 2rem;
}

.card-header {
  background-color: var(--bs-light);
  color: var(--bs-dark);
  padding: 1rem;
}

.card-body {
  padding: 0rem;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.surat-info {
  flex: 1;
}

.surat-title {
  font-weight: bold;
}

.surat-date {
  color: var(--bs-gray);
  font-size: 0.875rem;
}

.validasi-button {
  white-space: nowrap;
}

.empty-message {
  color: var(--bs-gray);
}

@media (max-width: 576px) {
  .list-group-item {
    display: grid;
  }
  .surat-title {
    display: -webkit-box;
    max-width: 250px;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>

