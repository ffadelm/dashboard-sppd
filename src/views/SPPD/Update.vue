<template>

  <main class="BuatSPPD-page">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Ubah Surat Perintah Perjalanan Dinas</h1>
    </div>
    <div class="mt-3">
      <form
        @submit.prevent="update()"
        class="row g-3"
      >
        <div class="form-group visually-hidden">
          <label
            for="nama"
            class="form-label"
          >Nama Pemohon</label>
          <input
            v-model="surat.user_id"
            type="text"
            class="form-control"
            id="nama"
            autocomplete="off"
            disabled
          />
        </div>

        <div class="form-group">
          <label
            for="judul"
            class="form-label"
          >Judul Surat</label>
          <input
            v-model="surat.judul"
            type="text"
            class="form-control"
            id="judul"
            autocomplete="off"
            required
          />
        </div>

        <div class="col-md-6">
          <label
            for="nomorSurat"
            class="form-label"
          >Nomor Surat</label>
          <input
            v-model="surat.nomor_surat"
            type="nomor"
            class="form-control"
            id="nomorSurat"
            autocomplete="off"
            disabled
            required
          />
        </div>
        <div class="col-md-6">
          <label
            for="pejabat"
            class="form-label"
          >Pemberi Perintah</label>
          <input
            v-model="surat.pemberi_perintah"
            type="text"
            class="form-control"
            id="pejabat"
            autocomplete="off"
            required
          />
        </div>

        <div class="form-group">
          <label
            for="anggota_mengikuti"
            class="form-label"
          >Anggota yang mengikuti</label>
          <div
            class="row align-items-start flex-column flex-md-row mb-4"
            v-for="(anggota, index) in surat.anggota_mengikuti"
            :key="index"
          >
            <div class="col">
              <input
                v-model="anggota.name"
                type="text"
                class="form-control"
                :id="'anggota_mengikuti_' + index"
                autocomplete="off"
                :placeholder="'Nama Anggota ' + (index + 1)"
                required
              >
            </div>
            <div class="col mt-2 mt-md-0">
              <input
                v-model="anggota.sebagai"
                type="text"
                class="form-control"
                :id="'sebagai_anggota_' + index"
                autocomplete="off"
                placeholder="Penanggung Jawab, Pengawas, dll."
                required
              >
            </div>
            <div class="col-auto mt-2 mt-md-0">
              <button
                @click="removeAnggotaMengikuti(index)"
                class="btn btn-danger btn-sm"
              >Hapus</button>
            </div>
          </div>
          <div class="tombol">
            <button
              @click="addAnggotaMengikuti"
              class="btn btn-secondary btn-sm"
            >Tambah Anggota</button>
          </div>
          <div class="note mt-1">
            <small class="form-text text-muted">Jika tidak ada anggota yang ikut, cukup kosongkan saja.</small>
          </div>
        </div>

        <div class="col-12">
          <label
            for="alamat"
            class="form-label"
          >Alamat Tujuan</label>
          <textarea
            v-model="surat.lokasi_tujuan"
            type="address"
            class="form-control"
            id="alamat"
            autocomplete="off"
            style="height: 100px;"
            required
          />
        </div>
        <div class="form-group">
          <label
            for="keterangan"
            class="form-label"
          >Deskripsi</label>
          <textarea
            v-model="surat.keterangan"
            type="text"
            class="form-control"
            id="keterangan"
            autocomplete="off"
            style="height: 100px;"
            required
          />
        </div>
        <div class="col-md-6">
          <label
            for="tglMulai"
            class="form-label"
          >Tanggal Mulai</label>
          <input
            v-model="surat.tgl_awal"
            type="date"
            class="form-control"
            id="tglMulai"
            required
          />
        </div>
        <div class="col-md-6">
          <label
            for="tglSelesai"
            class="form-label"
          >Tanggal selesai</label>
          <input
            v-model="surat.tgl_akhir"
            type="date"
            class="form-control"
            id="tglSelesai"
            required
          />
        </div>
        <div class="form-group">
          <button
            type="submit"
            class="btn btn-success"
          >Simpan</button>
          <router-link
            class="btn btn-outline-danger ms-2"
            to="/surat-perintah"
          >Kembali</router-link>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //data binding
    let surat = reactive({
      user_id: null,
      judul: "",
      nomor_surat: "",
      pemberi_perintah: "",
      anggota_mengikuti: [
        {
          name: "",
          sebagai: "",
        },
      ],
      lokasi_tujuan: "",
      keterangan: "",
      tgl_awal: "",
      tgl_akhir: "",
      validasi: "",
    });

    // const anggotaMengikutiInput = ref("");
    const anggotaMengikuti = ref([]);

    function addAnggotaMengikuti(event) {
      event.preventDefault();

      surat.anggota_mengikuti.push({
        name: "",
        sebagai: "",
      });
    }

    function removeAnggotaMengikuti(index) {
      surat.anggota_mengikuti.splice(index, 1);
    }

    const validation = ref("");

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios
        .get(`https://api.sppd.tatiumy.com/api/surat/${route.params.id}`)
        .then(({ data }) => {
          surat.user_id = data.data.user_id.name;
          surat.judul = data.data.judul;
          surat.nomor_surat = data.data.nomor_surat;
          surat.pemberi_perintah = data.data.pemberi_perintah;
          surat.anggota_mengikuti = data.data.anggota_mengikuti;
          surat.lokasi_tujuan = data.data.lokasi_tujuan;
          surat.keterangan = data.data.keterangan;
          surat.tgl_awal = data.data.tgl_awal;
          surat.tgl_akhir = data.data.tgl_akhir;
          surat.validasi = data.data.validasi;

          console.log(data.data.anggota_mengikuti);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    });

    const userId = localStorage.getItem("userId");
    const userIdInt = parseInt(userId);

    function update() {
      surat.user_id = userIdInt;

      axios
        .put(`https://api.sppd.tatiumy.com/api/surat/${route.params.id}`, surat)
        .then((response) => {
          console.log(response);
          router.push("/surat-perintah");
          swal({
            title: "Sukses!",
            text: "Data Berhasil Diubah!",
            icon: "success",
            button: "OK",
          });
        })
        .catch((error) => {
          validation.value = error.response.data;
        });
    }

    return {
      surat,
      validation,
      router,
      update,
      anggotaMengikuti,
      addAnggotaMengikuti,
      removeAnggotaMengikuti,
    };
  },
};
</script>