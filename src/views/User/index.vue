<template>
  <main class="Pegawai-page">
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Daftar Seluruh Dosen dan Staff</h1>
          <router-link
            class="btn btn-success btn-sm mb-3"
            to="/user/create"
          >Tambah User</router-link>
        </div>
        <div class="table-responsive">
          <table
            id="table"
            class="table table-striped table-hover"
          >
            <thead>
              <tr>
                <th scope="col">NIDN</th>
                <th scope="col">Nama</th>
                <th scope="col">Jabatan</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(lecturer, index) in paginatedLecturers"
                :key="index"
                v-show="lecturer.name !== 'admin'"
              >
                <td>{{lecturer.nidn}}</td>
                <td>{{ lecturer.name }}</td>
                <td>{{ lecturer.jabatan }}</td>
                <td>
                  <div class="btn-group">
                    <router-link
                      :to="`/user/update/${lecturer.id}`"
                      class="btn btn-sm btn-outline-warning"
                    >Ubah</router-link>
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click.prevent="destroy(lecturer.id, index)"
                    >Hapus</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <nav>
          <ul class="pagination justify-content-center">
            <li
              class="page-item"
              :class="{ 'disabled': currentPage === 1 }"
            >
              <button
                class="page-link"
                @click="setCurrentPage(1)"
                :disabled="currentPage === 1"
              >&laquo;</button>
            </li>
            <li
              class="page-item"
              :class="{ active: currentPage === page }"
              v-for="page in totalPages"
              :key="page"
            >
              <button
                class="page-link"
                @click="setCurrentPage(page)"
              >{{ page }}</button>
            </li>
            <li
              class="page-item"
              :class="{ 'disabled': currentPage === totalPages }"
            >
              <button
                class="page-link"
                @click="setCurrentPage(totalPages)"
                :disabled="currentPage === totalPages"
              >&raquo;</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { onMounted, ref, computed } from "vue";

export default {
  setup() {
    // reactive data/state
    let lecturers = ref([]);
    let currentPage = ref(1);
    const itemsPerPage = 10;

    onMounted(() => {
      // get data lecturers dari API
      axios
        .get("http://127.0.0.1:8000/api/user")
        .then(({ data }) => {
          lecturers.value = data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

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
            .delete(`http://127.0.0.1:8000/api/user/${id}`)
            .then((response) => {
              console.log(response.data);
              lecturers.value.data.splice(index, 1);
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

    // Computed property for pagination
    const paginatedLecturers = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      if (lecturers.value.data) {
        return lecturers.value.data.slice(startIndex, endIndex);
      }
      return [];
    });

    // Computed property for total pages
    const totalPages = computed(() => {
      if (lecturers.value.data) {
        return Math.ceil(lecturers.value.data.length / itemsPerPage);
      }
      return 0;
    });

    function setCurrentPage(page) {
      currentPage.value = page;
    }

    return {
      lecturers,
      paginatedLecturers,
      currentPage,
      totalPages,
      destroy,
      setCurrentPage,
    };
  },
};
</script>
