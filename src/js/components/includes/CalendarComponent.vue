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

                console.log(agenda);

            } else {
                /**check if exist events for dayCurrent or other events */
                let agenda = JSON.stringify(agenda);
                //*run array and search currentMonth*/
            }
            /*let containerAlert = document.querySelector('.il-alert');
            let alertInfo = document.querySelector('.il-alert p');
            let currentCronogram = cronogram;
            let newAgendaMonth = {
                month: window.localStorage.getItem('monthCurrent'),
                cronogram: null
            };
            newAgendaMonth.cronogram = new Array();
            newAgendaMonth.cronogram.push(currentCronogram);
            agenda.push(newAgendaMonth);
            let data = JSON.stringify(agenda);
            if (!window.localStorage.getItem('agenda')) {
                window.localStorage.setItem('agenda', data);
            } else {
                alert('jácriada a agenda');
            }
            alertInfo.innerHTML =
                'Os eventos do dia ' +
                window.localStorage.getItem('dayCurrent') +
                ' foram salvos na sua agenda.';
            containerAlert.classList.add('il-alert--show');
            containerAlert.classList.add('il-alert--posisione');
            setTimeout(() => {
                alertInfo.innerHTML = 'O arquivo foi salvo com sucesso.';
                containerAlert.classList.remove('il-alert--show');
                containerAlert.classList.remove('il-alert--posisione');
            }, 4000);*/
        },

        checkHasSchedule(){
            //check if has agenda in localStorage
            //if(window.localStorage.getItem('agenda')){
                let agenda = window.localStorage.getItem('agenda')
            //}

        }

    }
}
</script>
