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
        <h1 class="h2">Daftar Seluruh Pegawai</h1>
      </div>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Nama</th>
            <th scope="col">Jabatan</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(employee, index) in employees.data"
            :key="index"
          >
            <th scope="row">{{ index+1 }}</th>
            <td>{{ employee.name }}</td>
            <td>{{ employee.jabatan }}</td>
            <td>
              <div class="btn-group">
                <router-link
                  to="/pegawai/show/"
                  class="btn btn-sm btn-outline-info"
                >Detail</router-link>
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
    let employees = ref([]);

    onMounted(() => {
      // get data employees dari API
      axios
        .get("http://sppd-api.herokuapp.com/api/user")
        .then(({ data }) => {
          employees.value = data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return {
      employees,
    };
  },
};
</script>