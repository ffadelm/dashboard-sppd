<template>
  <main class="surat-page">
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Surat Perintah Perjalanan Dinas</h1>
          <router-link
            class="btn btn-success btn-sm mb-3"
            to="/create/sppd"
            :class="{'visually-hidden': userRole === '1'}"
          >Buat SPPD baru</router-link>
        </div>

        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="searchInput"
            v-model="searchKeyword"
          >
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchSurat"
          >Cari</button>
        </div>

        <div class="table-responsive">

          <table
            id="table"
            class="table table-striped table-hover table-sm"
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">No. Surat</th>
                <th scope="col">Judul Surat</th>
                <th scope="col">Penerima Perintah</th>
                <th scope="col">Status Validasi</th>
                <th scope="col">Status Surat</th>
                <th scope="col">Action</th>
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
                  style="max-width: 200px;"
                >{{ letter.judul }}</td>
                <td>{{ letter.user_id.name }}</td>
                <td class="text-center">
                  <div
                    v-if="letter.validasi === 1"
                    class="dot green"
                  ></div>
                  <div
                    v-else-if="letter.validasi === 0"
                    class="dot red"
                  ></div>
                </td>
                <td>
                  <div
                    v-if="letter.diserahkan === 1"
                    class="text-success"
                  >Selesai</div>
                  <div
                    v-else-if="letter.diserahkan === 0"
                    class="text-danger"
                  >Belum Selesai</div>
                </td>
                <td>
                  <div class="btn-group">
                    <router-link
                      :to="`/show/sppd/${letter.id}`"
                      class="btn btn-sm btn-outline-info"
                    >Detail</router-link>
                    <router-link
                      :to="`/update/sppd/${letter.id}`"
                      class="btn btn-sm btn-outline-warning"
                      :class="{ 'visually-hidden': letter.diserahkan === 1 || userRole === '1'}"
                    >Ubah</router-link>
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click.prevent="destroy(letter.id, index)"
                      :class="{ 'visually-hidden': letter.diserahkan === 1 || userRole === '1'}"
                    >Hapus</button>
                  </div>
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
    </div>
  </main>

</template>

<script>
import axios from "axios";
import { onMounted, ref, computed } from "vue";

export default {
  setup() {
    const letters = ref([]);
    const currentPage = ref(1);
    const perPage = 10;
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");
    const userJabatan = localStorage.getItem("jabatan");

    const searchKeyword = ref("");

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
          .get("http://127.0.0.1:8000/api/surat")
          .then(({ data }) => {
            letters.value = data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    function searchSurat() {
      if (userRole === "0") {
        axios
          .get(
            `http://127.0.0.1:8000/api/surats?search=${searchKeyword.value}&user_id=${userId}`
          )
          .then(({ data }) => {
            letters.value = data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get(`http://127.0.0.1:8000/api/surats?search=${searchKeyword.value}`)
          .then(({ data }) => {
            letters.value = data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    function destroy(id, index) {
      swal({
        title: "Apakah anda yakin?",
        text: "Setelah dihapus, data tidak dapat dikembalikan!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(`http://127.0.0.1:8000/api/surat/${id}`)
            .then((response) => {
              console.log(response.data);
              letters.value.splice(index, 1);
            })
            .catch((err) => {
              console.log(err);
            });

          swal("Data berhasil dihapus!", {
            icon: "success",
          });
        }
      });
    }

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
      destroy,
      currentPage,
      totalPages,
      currentData,
      goToPage,
      searchKeyword,
      searchSurat,
      userRole,
      startIndex,
    };
  },
};
</script>

<style>
.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}
</style>

