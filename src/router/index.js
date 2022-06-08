import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pegawai from '../views/Pegawai/index.vue'
import showPegawai from '../views/Pegawai/show.vue'
import SuratPerintah from '../views/SPPD/index.vue'
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
            path: '/pegawai/show/',
            component: showPegawai
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