<template>
<div>
    <!--HEADER-->
    <il-header></il-header>

    <!--LOAD-->
    <il-loader v-if="checkLoad"></il-loader>

    <!--ALERTS-->
    <il-alerts v-if="checkAlert"></il-alerts>

    <!--/* ====== Main APP ====== */-->
    <main>
        <!--<il-calendar></il-calendar>-->
        <!--ROUTES-->
        <router-view></router-view>
    </main>
    
</div>
</template>

<script>
import Header from "./components/includes/HeaderComponent.vue";

import Load from './components/partials/_load.vue';
import Alerts from "./components/partials/_alerts.vue";

export default {
    name: 'App',

    components: {
        ilHeader  : Header,
        ilLoader  : Load,
        ilAlerts  : Alerts
    },

    created(){
        this.showLoad = true;
    },

    data() {
        return {
            alerts: {
                class: '',
                message: null,
                active: false
            },
            showLoad: false,
        }
    },

    computed: {
        
        checkLoad() {
            if (this.showLoad) {
                return true
            }
            return false
        },

        checkAlert() {
            if (this.alerts.active) {
                return true;
            }
            return false
        }
    },

    methods: {
        setAlerts(msgType, m) {

            let delay = 4000;
            this.alerts.class = '';
            this.alerts.message = m;
            this.alerts.active = true;
            switch (msgType) {
                case 'success':
                    this.alerts.class = 'il-alert il-alert--success';
                    break;
                case 'info':
                    this.alerts.class = 'il-alert il-alert--info';
                    break;
                case 'danger':
                    this.alerts.class = 'il-alert il-alert--danger';
                    break;
                case 'warning':
                    this.alerts.class = 'il-alert il-alert--warning';
                    break;
            }
            setTimeout(() => {
                this.alerts.class = 'il-alert il-alert--hidden';
                this.alerts.message = '';
                this.alerts.active = false;
            }, delay);
        },
    }
}
</script>
