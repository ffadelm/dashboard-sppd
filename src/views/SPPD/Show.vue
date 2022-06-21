<template>
  <main>
    <div class="card">
      <div class="card-header text-center">
        <h4 class="card-title">Melakukan diskusi terbatas bersama BPK dan BPKP untuk mendapatkan data</h4>
        <p>005/SPD/2022</p>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <tr>
            <th>1</th>
            <th>Pejabat yang berwenang memberi perintah</th>
            <td>Faysal Fadel Maulana</td>
          </tr>

          <tr>
            <th>2</th>
            <th>Nama Pegawai yang diperintahkan</th>
            <td>Ichi Ocha</td>
          </tr>

          <tr>
            <th>3</th>
            <th>Anggota yang Mengikuti</th>
            <td>
              1. Faysal <br>
              2. Maulana <br>
              3. Fadel
            </td>
          </tr>

          <tr>
            <th>4</th>
            <th>Lokasi Tujuan</th>
            <td>Jr. Monginsidi No. 901, Banjarmasin 11561, Gorontalo</td>
          </tr>

          <tr>
            <th>5</th>
            <th>Keterangan</th>
            <td class="col-lg-8">Quis rerum harum et animi. Quos non eum illo sunt numquam eligendi magnam. Debitis aliquid illum neque ratione iure beatae ipsam aliquid. Voluptates harum quod debitis consequatur.</td>
          </tr>

          <tr>
            <th>6</th>
            <th>Tanggal Mulai</th>
            <td>20/10/2019</td>
          </tr>

          <tr>
            <th>7</th>
            <th>Tanggal Akhir</th>
            <td>20/10/2019</td>
          </tr>

        </table>

        <div class=" btn-group d-grid gap-2 d-md-block">
          <router-link
            to="/surat-perintah"
            class="btn btn-outline-danger"
            type="button"
          >Kembali</router-link>
          <router-link
            to="/surat-perintah"
            class="btn btn-success px-4"
            type="button"
          >Cetak</router-link>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style>
</style>