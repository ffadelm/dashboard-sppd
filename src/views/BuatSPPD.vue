<template>
  <main class="BuatSPPD-page">
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
      <h1 class="h2">Buat Surat Perintah Perjalanan Dinas</h1>
    </div>
    <div class="mt-3">
      <form class="row g-3">
        <div class="form-group">
          <label
            for="nama"
            class="form-label"
          >Nama Pegawai</label>
          <input
            type="nama"
            class="form-control"
            id="nama"
            autocomplete="off"
          />
        </div>
        <div class="col-md-6">
          <label
            for="nomorSurat"
            class="form-label"
          >Nomor Surat</label>
          <input
            type="nomor"
            class="form-control"
            id="nomorSurat"
            autocomplete="off"
          />
        </div>
        <div class="col-md-6">
          <label
            for="pejabat"
            class="form-label"
          >Pejabat yang memberi perintah</label>
          <input
            type="pejabat"
            class="form-control"
            id="pejabat"
            autocomplete="off"
          />
        </div>
        <div class="col-12">
          <label
            for="alamat"
            class="form-label"
          >Alamat Tujuan</label>
          <input
            type="text"
            class="form-control"
            id="alamat"
            autocomplete="off"
          />
        </div>
        <div class="form-group">
          <label
            for="keterangan"
            class="form-label"
          >Keterangan</label>
          <input
            type="text"
            class="form-control"
            id="keterangan"
            autocomplete="off"
          />
        </div>
        <div class="col-md-6">
          <label
            for="tglMulai"
            class="form-label"
          >Tanggal Mulai</label>
          <input
            type="date"
            class="form-control"
            id="tglMulai"
          />
        </div>
        <div class="col-md-6">
          <label
            for="tglSelesai"
            class="form-label"
          >Tanggal selesai</label>
          <input
            type="date"
            class="form-control"
            id="tglSelesai"
          />
        </div>
        <div class="form-group">
          <button
            type="submit"
            class="btn btn-primary"
          >Simpan</button>
          <router-link
            class="btn btn-secondary"
            to="/surat-perintah"
          >Kembali</router-link>
        </div>
      </form>
    </div>
  </main>
</template>