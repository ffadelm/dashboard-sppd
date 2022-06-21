import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pegawai from '../views/Pegawai/index.vue'
import SuratPerintah from '../views/SPPD/index.vue'
import Laporan from '../views/LaporanSPPD.vue'
import CreateSPPD from '../views/SPPD/Create.vue'
import UpdateSPPD from '../views/SPPD/Update.vue'
import ShowSPPD from '../views/SPPD/Show.vue'
import Login from '../views/Login.vue'



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path:'/login',
            component: Login
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
            path: '/update/sppd/:id',
            component: UpdateSPPD
        },
        {
            path: '/show/sppd/:id',
            component: ShowSPPD
        },
        {
            path: '/laporan',
            component: Laporan
        }
    ]
})

export default router