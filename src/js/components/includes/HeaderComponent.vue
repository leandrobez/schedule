<template>
<header class="il-container--item il-header il-color-background--tertiary__alt">
    <nav class="il-nav">
        <router-link :to="{name:'calendar'}" :class="getLinkClass('calendar')">Calendário</router-link>
        <router-link :to="{name:'report'}" :class="getLinkClass('report')">Relatório</router-link>
    </nav>
    <div class="il-container--wrapper">
        <h1 class="text-center il-color-texture--border il-section--title">{{title}}</h1>
    </div>
</header>
</template>

<script>
export default {
    name: 'Header',

    data() {
        return {
            title: "DiaryOnline",
        }
    },

    methods: {

        getLinkClass(link) {
            let currentRoute = this.$route.name;
            let theClass = null;
            switch (link) {
                case 'home':
                    if (link == currentRoute) {
                        theClass = 'il-generic--anchor il-anchor--active'
                    } else {
                        theClass = 'il-generic--anchor';
                    }
                    break;
                case 'calendar':
                    if (link == currentRoute) {
                        theClass = 'il-generic--anchor il-anchor--active'
                    } else {
                        theClass = 'il-generic--anchor';
                    }
                    break;
                case 'report':
                    if (link == currentRoute) {
                        theClass = 'il-generic--anchor il-anchor--active'
                    } else {
                        theClass = 'il-generic--anchor';
                    }
                    break;
            }
            return theClass
        }
        
    }
}
</script>
