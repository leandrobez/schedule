<template>
<div class="il-calendar--content">
    <div class="il-calendar--front">

        <div class="il-current--date" v-if="checkCurrentTimeLabel">
            <h1 class="il-year">{{$parent.dataNow.year}}</h1>
            <h1 class="il-today">{{$parent.dataNow.day}} de {{labelCurrentTime}}</h1>
        </div>

        <div class="il-choices--month">
            <i class="mdi mdi-12px mdi-minus" id="prev-month" @click="changeSchedule(false, true)" title="Mês anterior"></i>
            <i class="mdi mdi-12px mdi-plus" id="next-month"  @click="changeSchedule(true, false)" title="Mês seguinte"></i>
        </div>

        <div class="il-current--month" v-if="checkWeekLabels">
            <ul class="il-weeks--days">
                <li v-for="label in weekLabels">{{label}}</li>
            </ul>

            <div class="il-weeks" v-if="checkListWeeks">
                <div class="il-week--item" v-for="(item,index) in listWeeks">
                    <span v-for="(days,key) in item" :class="days.divClass"  @click="changeDay(days.divClick,index,key)">{{days.divClick}}</span>
                </div>
            </div>
        </div>

    </div>

</div>
</template>

<script>
import calendar from '../../common/calendarConfig.js';

export default {
    name: "CalendarContent",

    data() {
        return {
            currentDates: {},
            dataNow: {},
            labelCurrentTime: null,
            listMonthsDay: [],
            listWeeks: [],
            weekLabels: []
        }
    },

    computed: {

        checkCurrentTimeLabel() {
            if (this.labelCurrentTime) {
                return true
            }
            return false
        },

        checkListWeeks() {
            if (this.listWeeks.length > 0) {
                return true
            }
            return false
        },

        checkWeekLabels() {
            if (this.weekLabels.length > 0) {
                return true
            }
            return false
        }
    },

    created() {
        this.currentDates = calendar.calendarConfig.configToday.currentDates;
        this.dataNow = calendar.calendarConfig.configToday.dataNow;
    },

    mounted() {
        this.setWeekLabels();
        this.createListDate();
    },

    methods: {

        changeDay(day, i, k) {
            let spanHtml = this.listWeeks;
            this.dataNow.day =
                this.currentDates.currentDay =
                this.$parent.dataNow.day =
                this.$parent.currentDates.currentDay = day;
            let currentDate = `${this.dataNow.day}/${this.dataNow.month}/${this.dataNow.year}`;
            this.$parent.currentDates.currentDate = currentDate;
            spanHtml.forEach((span, index) => {
                span.forEach((item, key) => {
                    if (item.divClass == 'il-today') {
                        spanHtml[index][key].divClass = ''
                    }
                });
            });
            spanHtml[i][k].divClass = 'il-today';
            this.listWeeks = spanHtml;
            /**check for agenda */
            this.$parent.checkHasSchedule();

        },

        changeSchedule(n, p) {
            let day = this.currentDates.currentDay;
            let month = this.currentDates.currentMonth;
            let year = this.currentDates.currentYear;
            if (n && !p) {
                if (month < 12) {
                    this.currentDates.currentDay =
                        this.$parent.dataNow.day =
                        this.$parent.currentDates.currentDay = 1;
                    this.currentDates.currentMonth =
                        this.$parent.dataNow.month =
                        this.$parent.currentDates.currentMonth = month + 1;
                    this.dataNow.month = month + 1;
                    this.dataNow.day = 1;
                } else {
                    this.currentDates.currentDay =
                        this.$parent.dataNow.day =
                        this.$parent.currentDates.currentDay = 1;
                    this.currentDates.currentMonth =
                        this.$parent.dataNow.month =
                        this.$parent.currentDates.currentMonth = 1;
                    this.currentDates.currentYear =
                        this.$parent.dataNow.year =
                        this.$parent.currentDates.currentYear = year + 1;
                    this.dataNow.month = 1;
                    this.dataNow.day = 1;
                    this.dataNow.year = year + 1;
                }

            } else {
                /**to back the calendar */
                if (month == 1) {
                    this.currentDates.currentDay =
                        this.$parent.dataNow.day =
                        this.$parent.currentDates.currentDay = 1;
                    this.currentDates.currentMonth =
                        this.$parent.dataNow.month =
                        this.$parent.currentDates.currentMonth = 12;
                    this.currentDates.currentYear =
                        this.$parent.dataNow.year =
                        this.$parent.currentDates.currentYear = year - 1;
                    this.dataNow.month = 12;
                    this.dataNow.day = 1;
                    this.dataNow.year = year - 1;
                } else {
                    this.currentDates.currentDay =
                        this.$parent.dataNow.day =
                        this.$parent.currentDates.currentDay = 1;
                    this.currentDates.currentMonth =
                        this.$parent.dataNow.month =
                        this.$parent.currentDates.currentMonth = month - 1;
                    this.dataNow.month = month - 1;
                    this.dataNow.day = 1;
                }
            }
            let today = new Date();
            this.dataNow.now = today.getHours();
            this.dataNow.min = today.getMinutes();
            this.createListDate();
        },

        getMonth(m) {
            return calendar.calendarConfig.monthLabels.short[m];
        },

        setLabelCurrentTime() {
            this.labelCurrentTime = calendar.calendarConfig.monthLabels.long[this.dataNow.month - 1];
        },

        setWeekLabels() {
            this.weekLabels = calendar.calendarConfig.weekLabels.short;
        },

        createListDate() {
            let lastDayOfPrevMonth = null,
                lastDayOfMonth = null,
                month = null,
                months = [],
                numberMonth = calendar.calendarConfig.configToday.currentDates.currentMonth - 1,
                y = this.dataNow.year;
            this.setLabelCurrentTime();
            if (numberMonth == 0) {
                lastDayOfPrevMonth = new Date(y, 0, 0).getDate();
            } else {
                lastDayOfPrevMonth = new Date(y, numberMonth, 0).getDate();
            }

            lastDayOfMonth = new Date(y, numberMonth + 1, 0).getDate();
            month = calendar.calendarConfig.monthLabels.short[numberMonth];

            let weekConfig = this.searchPrevs(numberMonth);
            if (weekConfig) {
                for (var d = 1; d <= lastDayOfMonth; d++) {
                    weekConfig.push(d);
                }
                let weekDay = this.getArrayWeeks(weekConfig);
                months.push({
                    month: month,
                    positionKey: numberMonth,
                    structure: {
                        weekday: weekDay,
                        lastDayOfM: lastDayOfMonth
                    }
                });
                this.displayWeekDays(months[0].structure.weekday);
            }
        },

        searchPrevs(date) {
            let y = this.dataNow.year
            let pos = new Date(y, date, 1).getDay();
            let lastDayOfMonthPrev = null;
            if (date == 0) {
                lastDayOfMonthPrev = new Date(y, date, 0).getDate();
            } else {
                lastDayOfMonthPrev = new Date(y, date - 1, 0).getDate();
            }
            let nrPrevs = 0;
            let firstPrev = null;
            let prevs = null;
            if (pos != 0) {
                nrPrevs = pos;
                prevs = new Array();
                firstPrev = lastDayOfMonthPrev - (pos - 1);
                for (var i = 0; i < nrPrevs; i++) {
                    prevs[i] = firstPrev + i;
                }
            }
            return prevs;
        },

        getArrayWeeks(weekConfig) {
            let weeks = weekConfig.length;
            let weekTemp = null;
            let count = 0;
            let start = 0;
            let nrElements = 7;
            let restElement = weeks % 7;
            let countArrays = (weeks - restElement) / 7;
            let weekday = new Array();
            if (countArrays > 0) {
                for (var i = 0; i <= countArrays - 1; i++) {
                    weekday[i] = weekConfig.splice(start, nrElements);
                    weekTemp = weekConfig;
                    count = i;
                }
                weekday[count + 1] = weekTemp;
                if (weekday[count + 1].length < 7) {
                    let rest = 7 - weekday[count + 1].length;
                    for (let r = 1; r <= rest; r++) {
                        weekday[count + 1][weekday[count + 1].length] = r;
                    }
                }
            }
            return weekday
        },

        displayWeekDays(weekDays) {
            //console.log(weekDays);
            let today = this.dataNow.day;
            let spanHtml = [];
            let divClick = '';
            let divClass = '';
            let divClassToday = 'il-today';
            let lastDayOfM = weekDays.lastDayOfM;
            weekDays.forEach((week, index) => {
                week.forEach((day, key) => {
                    divClick = day;
                    switch (index) {
                        case 0:
                            let checkPrev = week[6];
                            if (day > checkPrev) {
                                divClass = 'il-next--month';
                            } else {
                                if (today == day) {
                                    divClass = "il-today";
                                } else {
                                    divClass = ''
                                }
                            }
                            break;
                        case 1:
                            if (today == day) {
                                divClass = "il-today";
                            } else {
                                divClass = ''
                            }
                            break;
                        case 2:
                            if (today == day) {
                                divClass = "il-today";
                            } else {
                                divClass = ''
                            }
                            break;
                        case 3:
                            if (today == day) {
                                divClass = "il-today";
                            } else {
                                divClass = ''
                            }
                            break;
                        case 4:
                            let checkNext = week[0];
                            if (day < checkNext) {
                                divClass = 'il-next--month';
                            }
                            break;
                        case 5:
                            checkNext = week[0];
                            if (day < checkNext) {
                                divClass = 'il-next--month';
                            }
                            break;
                    }
                    spanHtml.push({
                        divClass,
                        divClick
                    });
                });
                this.listWeeks[index] = spanHtml;
                spanHtml = [];
            });
        },

    }
}
</script>
