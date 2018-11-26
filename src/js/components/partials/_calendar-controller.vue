<template>
<div class="il-calendar--controller">
    <h4>Eventos para o dia <span id="event-day" v-if="checkCurrentDate">{{currentDate}}</span></h4>
    <!--main content-->
    <div class="il-calendar--controller__content">
        <div class="il-events__list" v-for="(item,index) in timeLine">
            <div class="il-events__time-line">
                <span>{{item.start}}</span>
                <span>{{item.end}}</span>
            </div>

            <div class="il-events__btn">
                <i class="mdi mdi-12px mdi-plus il-plus" @click="eventCreate(index)" :title="`Clique para criar um evento as ${item.start}:00`" :style="getStatusStylePlus(index)"></i>
                <i class="mdi mdi-12px mdi-minus il-minus" @click="eventDelete(index)" title="Clique para eliminar esse evento" :style="getStatusStyleMinus(index)"></i>
            </div>

            <div :class="setEventClass(index)">
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
                            <td v-for="cronogram in item.cronogram"><a href
                            ="#" :title="cronogram">{{cronogram.slice(0,15)}}</a></td>
                            <td><a href="#" @click="eventEdit(index)" class="il-link">editar</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>

    <!--params-->
    <il-params v-if="checkShowParams"></il-params>

    <!--search-->
    <il-calendar-search v-if="checkShowSearch"></il-calendar-search>

    <!--edit-->
    <il-edit v-if="checkShowEdit"></il-edit>

    <!--save schedule-->
    <a id="btn-save" href="#" class="il-btn--flat" title="Clique para salvar esses eventos" @click.prevent="saveSchedule()" v-if="hasEventsAndSchedule">
        <i class="mdi mdi-12px mdi-check il-color-texture--bg"></i>
    </a>
</div>
</template>

<script>
import calendar from '../../common/calendarConfig.js';
import Search from "./_calendar-search.vue";
import Param from "./_calendar-param.vue";
import Edit from "./_calendar-edit.vue";

export default {
    name: "CalendarController",

    components: {
        ilCalendarSearch: Search,
        ilParams: Param,
        ilEdit: Edit
    },

    computed: {

        checkCurrentDate() {
            let currentDate = this.$parent.dataNow.day;
            if (currentDate) {
                this.currentDate = currentDate;
                return true
            }
            return false;
        },

        checkShowSearch() {
            if (this.showSearch) {
                return true
            }
            return false
        },

        checkShowParams() {
            if (this.showParam) {
                return true
            }
            return false
        },

        checkShowEdit() {
            if (this.showEdit) {
                return true
            }
            return false
        }

    },

    created() {
        this.currentDates = calendar.calendarConfig.configToday.currentDates;
        this.dataNow = calendar.calendarConfig.configToday.dataNow;
        this.timeLineConfig = calendar.calendarConfig.timeLineConfig;
        this.setEventItem()
    },

    mounted() {
        this.makeTimeline();
    },

    data() {
        return {
            currentDates: {},
            dataNow: {},
            timeLineConfig: {},
            eventItem: {},
            timeLine: [],
            events: [],
            client: {},
            schedule: [],
            timeLineEdit: null,
            currentDate: null,
            currentEvent: null,
            showSearch: false,
            showParam: false,
            showEdit: false,
            hasEventsAndSchedule: false
        }
    },

    methods: {

        setEventItem() {
            this.eventItem = calendar.calendarConfig.eventItem;
        },

        makeTimeline() {
            let total = this.timeLineConfig.end + 1 - this.timeLineConfig.start;
            for (let i = 0; i < total; i++) {
                let hour = this.timeLineConfig.start + i + ':00';
                let halfHour = this.timeLineConfig.start + i + ':30';
                this.timeLine.push({
                    start: hour,
                    end: halfHour,
                    eventClass: 'il-events__item',
                    hasEvent: false,
                    keySchedule: null,
                    cronogram: null
                })
                this.events.push({
                    statusPlus: 'block',
                    statusMinus: 'none'
                });
            }
        },

        setEventClass(index) {
            if (this.schedule.length > 0 && this.timeLine[index].hasEvent) {
                return this.timeLine[index].eventClass + ' il-show__event';
            }
            if (this.schedule.length == 0) {
                this.hasEventsAndSchedule = 0;
            }
            return this.timeLine[index].eventClass; // + ' il-show__event'
        },

        getStatusStylePlus(index) {
            return `display:${this.events[index].statusPlus}`;
        },

        getStatusStyleMinus(index) {
            return `display:${this.events[index].statusMinus}`;
        },

        eventEdit(index) {
            this.client = {
                cod: this.timeLine[index].cronogram.code,
                name: this.timeLine[index].cronogram.name
            }
            this.timeLine[index].eventClass = 'il-events__item'
            this.timeLineEdit = index;
            this.showEdit = true;
        },

        eventDelete(index) {
            let decision = window.confirm('Realmente deseja remover esse evento?');
            let newSchedule = [];
            if (decision) {
                let schedule = this.schedule;
                schedule.splice(this.timeLine[index].keySchedule, 1);
                this.timeLine[index].hasEvent = false;
                this.timeLine[index].keySchedule = null;
                this.timeLine[index].cronogram = null;
                this.events[index].statusMinus = "none";
                this.events[index].statusPlus = "block";
                this.timeLine[index].eventClass = 'il-events__item';
            }
            return
        },

        eventCreate(index) {
            this.currentEvent = index;
            this.showSearch = true;
        },

        setTimeLine(code, name) {
            this.client = {
                cod: code,
                name: name
            };
            this.timeLine[this.currentEvent].hasEvent = true;
            this.timeLine[this.currentEvent].keySchedule = this.currentEvent;
            this.events[this.currentEvent].statusMinus = "block";
            this.events[this.currentEvent].statusPlus = "none";
            this.showSearch = false;
            this.showParam = true;
        },

        finishEvents(params) {
            this.timeLine[this.currentEvent].cronogram = [
                this.client.cod,
                this.client.name,
                params.start,
                params.end,
                params.type,
                params.transport,
                params.tara,
                params.status
            ];
            this.prepareSchedule();
        },

        finishEditEvents(edit) {
            this.timeLine[this.timeLineEdit].cronogram = [
                edit.cod,
                edit.name,
                edit.start,
                edit.end,
                edit.type,
                edit.transport,
                edit.tara,
                edit.status
            ];
            let newSchedule = this.schedule;
            newSchedule.forEach((schedule, key) => {
                if (schedule.keyTimeLine == this.timeLineEdit) {
                    this.schedule[key].cronogram = this.timeLine[this.timeLineEdit].cronogram;
                    this.showEdit = false;
                    this.timeLineEdit = null
                }
            })
        },

        prepareSchedule() {
            let newSchedule = {
                keyTimeLine: this.currentEvent,
                cronogram: this.timeLine[this.currentEvent].cronogram
            }

            this.schedule.push(newSchedule);
            this.showParam = false;
            this.hasEventsAndSchedule = true;
            this.setEventClass(this.currentEvent)
        },

        saveSchedule(){
            let confirm = window.confirm('Realmente deseja fechar os eventos para o dia ' + this.currentDates.currentDay + ' ?');
            if(confirm){
                this.$parent.newSchedule = this.schedule;
                this.$parent.saveSchedule()
            } else {
                return
            }
            
        }

    }

}
</script>
