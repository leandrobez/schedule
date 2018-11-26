import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

/**components for client */
import Calendar from '../components/includes/CalendarComponent.vue';
import Report from '../components/includes/ReportComponent.vue';

/**Routes for app */
const routes = [

    {
        path: '/',
        name: 'home',
        component: Calendar
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: Calendar
    },
    {
        path: '/report',
        name: 'report',
        component: Report
    },
];

const router = new VueRouter({
    routes
});

export default router;