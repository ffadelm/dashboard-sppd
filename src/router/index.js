import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pegawai from '../views/Pegawai.vue'
import SuratPerintah from '../views/SPPD/SuratPerintah.vue'
import Laporan from '../views/LaporanSPPD.vue'
import CreateSPPD from '../views/SPPD/Create.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/pegawai',
            component: Pegawai
        },
        {
            path: '/surat-perintah',
            component: SuratPerintah
        },
        {
            path: '/create/sppd',
            component: CreateSPPD
        },
        {
            path: '/laporan',
            component: Laporan
        }
    ]
})

export default router