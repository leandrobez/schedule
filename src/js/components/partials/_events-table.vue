<template>
<div :class="eventClass" v-if="checkShowEvents">
    <table class="il-table il-event--head">
        <thead>
            <tr>
                <th class="il-td--med">Cod</th>
                <th class="il-td--big">Nome</th>
                <th class="il-td--small">Início</th>
                <th class="il-td--small">Término</th>
                <th class="il-td--small">Tarefa</th>
                <th class="il-td--small">Transporte</th>
                <th class="il-td--small">Ton</th>
                <th class="il-td--small">Status</th>
                <th class="il-td--small">Ação</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td v-for="event in events">{{event}}</td>
                <td><a href="#" @click="eventEdit()" class="il-link">editar</a></td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
export default {
    name: 'Events',

    props:[eventItem],

    data() {
        return {
            events: [],
            showEvents: null,
            eventClass: ''
        }
    },

    computed: {
        checkShowEvents() {
            if (this.$parent.showEvents == null) {
                return false
            }
            this.eventClass = this.$parent.timeLine[this.$parent.showEvents].eventClass + ' il-show__event';
            this.showEvents = this.$parent.showEvents;
            this.generateEventItens();
            return true
        }
    },

    methods: {
        
        generateEventItens() {
            if (this.$parent.showEvents == null) {
                return
            }
            let items = this.$parent.timeLine[this.$parent.showEvents].cronogram;
            this.$parent.schedule.push(items)
            let events = [
                items.cod,
                items.name,
                items.start,
                items.end,
                items.type,
                items.transport,
                items.status,
                items.tara
            ];

            this.events = events;
            return
        },

        eventEdit() {
            let index = this.showEvents ;
            this.$parent.eventEdit(index)
        }
    }
}
</script>
