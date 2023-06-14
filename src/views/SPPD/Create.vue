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
      <form
        @submit.prevent="store()"
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
            placeholder="Contoh: Surat Perintah Perjalanan Dinas"
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
            placeholder="klik 1x untuk generate nomor surat"
            required
            @click="generateNomorSurat"
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
            placeholder="Contoh: Rektor UMY, Dekan Fakultas, Kepala Jurusan, dst."
          />
        </div>

        <div class="form-group">
          <label
            for="anggota_mengikuti"
            class="form-label"
          >Anggota yang mengikuti</label>
          <div
            class="row align-items-start flex-column flex-md-row mb-4"
            v-for="(anggota, index) in anggotaMengikuti"
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
              class="btn btn-secondary btn-sm mt-2"
            >Tambah Anggota</button>
          </div>
          <div class="note">
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
            placeholder="Contoh: Jl. Raya Kampus, Kampus UMY, Yogyakarta"
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
            placeholder="Contoh: Perjalanan dinas ke kampus UMY untuk mengikuti kegiatan seminar"
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
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  computed: {
    filteredUsers() {
      return this.users.data
        ? this.users.data.filter((user) => user.role !== 1)
        : [];
    },
  },
  setup() {
    // Data binding
    const surat = reactive({
      user_id: null,
      judul: "",
      nomor_surat: "",
      pemberi_perintah: "",
      anggota_mengikuti: [],
      lokasi_tujuan: "",
      keterangan: "",
      tgl_awal: "",
      tgl_akhir: "",
    });

    const userId = localStorage.getItem("userId");
    const userIdInt = parseInt(userId);
    const anggotaMengikutiInput = ref("");
    const anggotaMengikuti = ref([]);

    function addAnggotaMengikuti() {
      anggotaMengikuti.value.push({
        name: "",
        sebagai: "",
      });
    }

    function removeAnggotaMengikuti(index) {
      anggotaMengikuti.value.splice(index, 1);
    }

    const validation = ref([]);
    const router = useRouter();

    function store() {
      surat.anggota_mengikuti = anggotaMengikuti.value;
      surat.user_id = userIdInt;

      axios
        .post("http://127.0.0.1:8000/api/surat", surat)
        .then(() => {
          router.push("/surat-perintah");
          swal({
            title: "Sukses!",
            text: "Data Berhasil Ditambahkan!",
            icon: "success",
            button: "OK",
          });
        })
        .catch((error) => {
          validation.value = error.response.data;
        });
    }

    function toRomanNumerals(number) {
      const romanNumerals = {
        1: "I",
        2: "II",
        3: "III",
        4: "IV",
        5: "V",
        6: "VI",
        7: "VII",
        8: "VIII",
        9: "IX",
        10: "X",
        11: "XI",
        12: "XII",
      };

      return romanNumerals[number];
    }

    function generateNomorSurat() {
      const tahunSekarang = new Date().getFullYear();
      const bulanSekarang = toRomanNumerals(new Date().getMonth() + 1);
      const nomorRandom = Math.floor(Math.random() * 600);
      const nomorSurat = nomorRandom.toString().padStart(4, "0");
      surat.nomor_surat = `${nomorSurat}/A.7-II/TI/${bulanSekarang}/${tahunSekarang}`;
    }

    return {
      surat,
      validation,
      router,
      store,
      anggotaMengikutiInput,
      addAnggotaMengikuti,
      anggotaMengikuti,
      removeAnggotaMengikuti,
      generateNomorSurat,
    };
  },
};
</script>

<style>
option {
  max-height: 150px;
  overflow-y: auto;
}
</style>