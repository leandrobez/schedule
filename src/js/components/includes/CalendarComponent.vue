<template>
<section class="il-section il-section--calendar" v-if="showLoad">
    <div class="il-container--wrapper">
        <div class="il-calendar--container">
            <il-calendar-content></il-calendar-content>
            <il-calendar-controller></il-calendar-controller>
        </div>
    </div>
</section>
</template>

<script>
import Content from "../partials/_calendar-content.vue";
import Controller from "../partials/_calendar-controller.vue";

export default {
    name: "Calendar",

    components: {
        ilCalendarContent: Content,
        ilCalendarController: Controller,
    },

    computed: {

        showLoad() {
            if (!this.$parent.showLoad) {
                return true
            }
            return false
        }
    },

    mounted() {
        this.setConfigToday();
        this.checkHasSchedule();
    },

    data() {
        return {
            dataNow: {
                month: null,
                day: null,
                year: null,
                now: null,
                min: null
            },
            currentDates: {
                currentDate: null,
                currentDay: null,
                currentYear: null,
                currentMonth: null
            },
            hasSchedule: false,
            timeLineForToday: [],
            newSchedule: []
        }
    },

    methods: {

        setConfigToday() {
            let today = new Date();
            this.dataNow.month = today.getMonth() + 1;
            this.dataNow.day = today.getDate();
            this.dataNow.year = today.getFullYear();
            this.dataNow.now = today.getHours();
            this.dataNow.min = today.getMinutes();
            this.currentDates.currentMonth = today.getMonth() + 1;
            this.currentDates.currentDay = today.getDate();
            this.currentDates.currentYear = today.getFullYear();
            let currentDate = `${this.dataNow.day}/${this.dataNow.month}/${this.dataNow.year}`;
            this.currentDates.currentDate = currentDate;
            this.$parent.showLoad = false;
        },

        setParentAlert(msgType, msg) {
            this.$parent.alerts.active = true;
            this.$parent.setAlerts(msgType, msg);
        },

        saveSchedule() {

            let agenda = []
            let cronogram = [];
            let details = [];
            /**check if has agenda */
            if (!window.localStorage.getItem('agenda')) {
                let schedule = this.newSchedule;
                schedule.forEach((detail, index) => {
                    details.push({
                        timeLine: detail.keyTimeLine,
                        events: detail.cronogram
                    })
                });
                cronogram.push({
                    day: this.currentDates.currentDay,
                    details: details
                });
                agenda.push({
                    month: this.currentDates.currentMonth,
                    cronogram: cronogram
                });
                let data = JSON.stringify(agenda);
                window.localStorage.setItem('agenda', data);
                let msgType = 'success',
                    msg = 'Os eventos do dia ' +
                    this.currentDates.currentDay +
                    ' foram salvos na sua agenda.'
                this.setParentAlert(msgType, msg)

                //console.log(agenda);

            } else {
                let msgType = 'success',
                    msg = 'Não há eventos para ' +
                    this.currentDates.currentDay +
                    '. Crie agora.'
                this.setParentAlert(msgType, msg)
            }

        },

        checkHasSchedule() {
            this.$parent.showLoad = true;
            let msgType = 'info',
                msg = 'Aguarde enquanto o sistema sincroniza a sua agenda...';
            this.$parent.setAlerts(msgType, msg);
            //check if has agenda in localStorage
            let agenda = window.localStorage.getItem('agenda') ? JSON.parse(window.localStorage.getItem('agenda')) : null;
            let timeLineForToday = [];
            if (agenda) {
                agenda.forEach(items => {
                    if (items.month == this.currentDates.currentMonth) {
                        let cronograms = items.cronogram;
                        cronograms.forEach(days => {
                            if (days.day == this.currentDates.currentDay) {
                                timeLineForToday = days.details;
                            } else {
                                this.notAgenda();
                            }
                        })
                    } else {
                        this.notAgenda();
                    }
                });
                if (timeLineForToday.length > 0) {
                    //console.log(timeLineForToday)
                    this.makeEvents(timeLineForToday);
                } else {
                    this.notAgenda()
                }
            } else {
                this.notAgenda()
            }

        },

        makeEvents(timeLineForToday) {
            timeLineForToday.forEach(detail => {
                this.timeLineForToday.push({
                    keyTimeLine: detail.timeLine,
                    cronogram: detail.events
                })
            });
            setTimeout(() => {
                this.hasSchedule = true
                this.$parent.showLoad = false;
            }, 3000)
        },

        notAgenda() {
            setTimeout(() => {
                this.hasSchedule = false;
                this.$parent.showLoad = false;
            }, 1000);
            let msgType = 'warning',
                msg = 'Não existem eventos para esse dia. Crie agora...';
            this.$parent.setAlerts(msgType, msg);
        }

    }
}
</script>
