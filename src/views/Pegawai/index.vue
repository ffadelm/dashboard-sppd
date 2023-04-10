<template>
  <main class="Pegawai-page">
    <div class="table-responsive">
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
        <h1 class="h2">Daftar Seluruh Dosen dan Staff</h1>
      </div>
      <table
        id="table"
        class="table table-striped table-hover table-responsive"
      >
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Nama</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Jabatan</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(lecturer, index) in lecturers.data"
            :key="index"
          >
            <th scope="row">{{ index+1 }}</th>
            <td>{{ lecturer.name }}</td>
            <td>{{ lecturer.username }}</td>
            <td>{{ lecturer.email }}</td>
            <td>{{ lecturer.jabatan }}</td>
            <td>
              <div class="btn-group">
                <router-link
                  to="/"
                  class="btn btn-sm btn-outline-warning"
                >Ubah</router-link>
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
    // reactive data/state
    let lecturers = ref([]);

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

    // function destroy(id, index) {
    //   axios
    //     .delete(`http://103.100.27.29/sppd/public/api/user/${id}`)
    //     .then(() => {
    //       letters.value.data.splice(index, 1);
    //     })
    //     .catch((err) => {
    //       console.log(err.response.data);
    //     });
    // }

    return {
      lecturers,
      // destroy,
    };
  },
};
</script>