<template>
<div :class="classParam" v-if="checkNeedParam">
    <!--<il-delay></il-delay>-->
    <form id="il-params" class="il-form--params" @submit.prevent="setTimeLine">
        <div class="il-form--fields">
            <input type="text" v-model="params.start" placeholder="Previsão de início" class="il-input" />
            <input type="text" v-model="params.end" placeholder="Previsão de término" class="il-input" />
            <input type="text" v-model="params.type" placeholder="Carga ou descarga" class="il-input" />
            <input type="text" v-model="params.transport" placeholder="Camionete, caminhão..." class="il-input" />
            <input type="text" v-model="params.status" placeholder="Previsto ou Encerrado" class="il-input" />
            <input type="text" v-model="params.tara" placeholder="Tara do veículo, 10 ton, 15 ton..." class="il-input" />
        </div>
        <div class="il-form--fields">
            <button type="submit" class="il-btn il-btn--transparent il-btn--big auto">Criar o evento</button>
        </div>
    </form>
</div>
</template>

<script>
export default {
    name: 'Params',

    computed: {
        checkNeedParam() {
            if (this.$parent.showParam) {
                this.classParam = 'il-calendar--param il-calendar--param__show';
                return true
            } else {
                this.classParam = 'il-calendar--param';
                return false
            }
        }
    },

    data() {
        return {
            classParam: 'il-calendar--param',
            params: {
                start: null,
                end: null,
                type: null,
                transport: null,
                status: null,
                tara: null
            }
        }
    },

    mounted() {
        let currentEvent = this.$parent.currentEvent;
        let timeLine = this.$parent.timeLine[currentEvent];
        this.params.start = timeLine.start;
        this.params.end = timeLine.end;
    },

    methods: {
        setTimeLine() {
            /**check fields null */
            if(this.params.start == null || this.params.end == null || this.params.type == null || this.params.transport == null || this.params.status == null || this.params.tara == null){
                alert('Preencha todos os campos');
                //this.classParam = 'il-calendar--param';
                return false
            }
            /**create the events items */
            this.$parent.finishEvents(this.params);

        }
    }
}
</script>
