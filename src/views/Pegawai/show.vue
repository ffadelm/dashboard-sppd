<template>
  <main>
    <p>
      <router-link
        to="/pegawai"
        class="text-decoration-none"
      >Pegawai</router-link>/ Info Pegawai/ faysal
    </p>
    <div class="card">
      <div class="card-header">
        <h3>Info Pegawai</h3>
      </div>
      <div class="card-body">
        <table class="table table-striped table-sm">
          <tbody>
            <tr>
              <th>Nama</th>
              <td>Faysal</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>fffm@mail.com</td>
            </tr>
            <tr>
              <th>No. Telepon</th>
              <td>9000000</td>
            </tr>
            <tr>
              <th>Alamat</th>
              <td>98098</td>
            </tr>
            <tr>
              <th>Jabatan</th>
              <td>786565</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>9872662</td>
            </tr>
          </tbody>
        </table>
        <router-link
          to="/pegawai"
          class="btn text-bg-secondary"
        >Kembali</router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style>
</style>