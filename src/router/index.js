import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pegawai from '../views/Pegawai.vue'
import BuatSPPD from '../views/BuatSPPD.vue'

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
            path: '/buat-sppd',
            component: BuatSPPD
        }
    ]
})

export default router