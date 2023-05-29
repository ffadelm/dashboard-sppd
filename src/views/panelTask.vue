<template>
  <div class="card">
    <div class="card-header fs-3">
      Panel Surat Belum Divalidasi
    </div>
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li
          v-for="surat in suratBelumValidasi"
          :key="surat.id"
          class="list-group-item"
        >
          <div class="surat-info">
            <div
              class="surat-title fs-5"
              style="max-width: 50rem;"
            >{{ surat.judul }}</div>
            <div class="
              surat-date">{{ tanggal(surat.created_at) }}</div>
          </div>
          <button
            class="validasi-button btn btn-success"
            @click="validasiSurat(surat)"
          >
            Validasi
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
        .get("http://127.0.0.1:8000/api/surat")
        .then((response) => {
          const suratData = response.data.data;
          this.suratBelumValidasi = suratData.filter(
            (surat) => surat.validasi === 0
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
        .put(`http://127.0.0.1:8000/api/surat/${suratId}`, { validasi: 1 })
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
  padding: 1rem;
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
  .card-header {
    font-size: 1.5rem;
  }
  .card {
    padding-left: 6rem;
  }

  .validasi-button {
    white-space: normal;
    width: 100%;
    margin-top: 1rem;
  }
}
</style>

