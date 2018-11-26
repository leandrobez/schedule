<template>
<section class="il-section il-section--calendar" v-if="showLoad">
    <div class="il-container--wrapper">
        <div class="il-calendar--container">
            <router-link :to="{name:'calendar'}" :class="getLinkClass('calendar')">Calendário</router-link>
            <router-link :to="{name:'report'}" :class="getLinkClass('report')">Relatório</router-link>
            <h2>Aqui vai o relatório</h2>
        </div>
    </div>
</section>
</template>

<script>
export default {
    name: 'Relatorio',

    computed: {
        showLoad() {
            if (this.$parent.showLoad) {
                this.endLoad()
                return false
            }
            return true
        }
    },

    methods: {
        getLinkClass(link) {
            return 'il-link'
        },

        endLoad() {
            setTimeout(() => {
                this.$parent.showLoad = false
            }, 3000)
        }
    }
}
</script>
