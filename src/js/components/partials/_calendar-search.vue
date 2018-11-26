<template>
<div :class="classSearch" v-if="checkNeedSearch">
    <!--<il-delay></il-delay>-->

    <form id="il-client" class="il-form--search">
        <input type="search" name="search" @keyup="execSearch()" class="il-input--seach" v-model="search" placeholder="Escolha o cliente">
        <i @click="closeSearch()" class="mdi mdi-24px mdi-close"></i>
    </form>

    <div class="il-search--result" v-if="checkResult">
        <div class="il-search--result__row" v-for="(result,index) in searchResult">
            <span @click="setChoices(result.cod,result.name)">{{result.cod}} - {{result.name}}</span>
        </div>
    </div>
</div>
</template>

<script>
require("lodash");
//import axios from "axios";
let datas = require('../../bd/databank.json');

export default {
    name: "CalendarSearch",

    components: {

    },

    data() {
        return {
            classSearch: 'il-calendar--search',
            searchResult: [],
            notResult: null,
            search: ''
        }
    },

    computed: {

        checkNeedSearch() {
            if (this.$parent.showSearch) {
                this.classSearch = 'il-calendar--search il-calendar--search__show';
                this.searchResult = [];
                return true
            } else {
                this.classSearch = 'il-calendar--search';
                return false
            }
        },

        checkResult() {
            if (this.searchResult.length > 0) {
                return true
            }
            return false;
        }

    },

    methods: {

        closeSearch() {
            // form search close
            this.$parent.showSearch = false;
            this.classSearch = 'il-calendar--search';
            this.search = '';
            this.searchResult = [{
                cod: null,
                name: null
            }];
        },

        execSearch() {
            let word = this.search;
            let str;
            let r = [];
            let alert = null
            if (word.length > 3) {
                datas.forEach((item, index) => {
                    str = item.cliente.search(word.toUpperCase());
                    if (str == 0) {
                        //datas[index].key = index;
                        r.push({
                            cod: item.cod,
                            name: item.cliente
                        });
                        if (r.length > 0) {
                            this.searchResult = r
                        }
                    } else {
                        alert = 'nada encontrado para ' + word;
                    }
                });

                /*_.debounce(function () {
                    if (this.searchResult[0].cod == null && this.searchResult[0].name == null) {
                        alert('nada encontrado para ' + word)
                    }
                }, 300)*/
            }
            /*if (alert) {
                window.alert(alert)
                return false
            }*/
        },

        setChoices(cod, n) {
            this.$parent.setTimeLine(cod, n);
        }
    }
}
</script>
