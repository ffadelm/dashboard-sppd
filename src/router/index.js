import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import SuratPerintah from '../views/SPPD/index.vue'
import Done from '../views/SPPD/Done.vue'
import Laporan from '../views/Laporan/LaporanSPPD.vue'
import DetailLaporan from '../views/Laporan/detailLaporan.vue'
import CreateLaporan from '../views/Laporan/CreateLaporan.vue'
import CreateSPPD from '../views/SPPD/Create.vue'
import UpdateSPPD from '../views/SPPD/Update.vue'
import ShowSPPD from '../views/SPPD/Show.vue'
import Login from '../views/Login.vue'

import User from '../views/User/index.vue'
import CreateUser from '../views/User/CreateUsers.vue'
import UpdateUser from '../views/User/UpdateUser.vue'

import panelTask from '../views/panelTask.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/dashboard',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/user',
            component: User
        },
        {
            path: '/user/create',
            component: CreateUser
        },
        {
            path: '/user/update/:id',
            component: UpdateUser
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
        },
        {
            path: '/detail-laporan/:id',
            component: DetailLaporan
        },
        {
            path: '/create/laporan',
            component: CreateLaporan
        },
        {
            path: '/panel-task',
            component: panelTask
        },
        {
            path: '/surat-selesai',
            component: Done
        }
    ]
})

export default router