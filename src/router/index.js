import { createRouter, createWebHistory } from 'vue-router';


import store from '../store'; 
import PainelShowroom from '../views/index.vue';  

const routes = [
    { path: '/', name: 'Home', component: PainelShowroom },
    { path: '/showroom', name: 'Painel', component: PainelShowroom }, 
]

const router = new createRouter({
    // mode: 'history',
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.layout && to.meta.layout == 'auth') {
        store.commit('setLayout', 'auth');
    } else {
        store.commit('setLayout', 'app');
    }
    next(true);
});

export default router;