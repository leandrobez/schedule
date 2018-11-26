<template>
<div :class="getClass()">
    <p>{{$parent.alerts.message}}</p>
</div>
</template>

<script>
export default {
    name: "Alerts",

    data() {
        return {
            alertMessage: null
        }
    },

    methods: {

        getClass() {
            if (this.$parent.alerts.class) {
                //this.alertMessage = this.$parent.alerts.message;
                return `${this.$parent.alerts.class} il-alert--posisione`;
            }
        }
    }
}
</script>
