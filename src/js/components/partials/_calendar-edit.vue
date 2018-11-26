<template>
<div :class="classEdit" v-if="checkNeedEdit">
    <form id="il-params" class="il-form--edit" @submit.prevent="checkEdit()">
        <div class="il-form--fields">
            <input type="text" v-model="edit.cod" class="il-input" />
            <input type="text" v-model="edit.name" class="il-input" />
            <input type="text" v-model="edit.start" class="il-input" />
            <input type="text" v-model="edit.end" class="il-input" />
            <input type="text" v-model="edit.type" class="il-input" />
            <input type="text" v-model="edit.transport" class="il-input" />
            <input type="text" v-model="edit.status" class="il-input" />
            <input type="text" v-model="edit.tara" class="il-input" />
        </div>
            <div class="il-form--fields">
                <button type="submit" class="il-btn il-btn--transparent il-btn--big auto">Salvar</button>
            </div>
    </form>
</div>
</template>

<style>
.il-calendar--edit {
    position: absolute;
    z-index: 2;
    top: 0;
    left: -100%;
    width: 0;
    height: 0;
    background: #B2C4CB;
    text-align: center;
    padding: .45rem;
    opacity: 0;
}

form.il-form--edit {
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

form.il-form--edit .il-form--fields {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.il-form--fields input[type='text'].il-input {
    width: 100%;
    height: 1.8rem;
    outline: none;
    border: 1px solid rgb(194, 188, 188);
    padding: 0.55rem 0.45rem;
    margin: 0.25rem 0;
    font-size: 0.98rem;
    border-radius: 3px;
    color: #3d3434;
    background-color: #dddcdc;
}

.il-calendar--edit__show {
    transition: 450ms;
    top: 10%;
    left: 5%;
    width: 90%;
    height: 100%;
    opacity: 1;
}

@media screen and(min-width: 800px) {
    .il-calendar--edit__show {
        width: 80%;
        left: 10%;
        height: 100%;
    }
}

@media screen and(min-width: 1024px) {
    .il-calendar--edit__show {
        width: 90%;
        left: 5%;
        height: 100%;
    }
}
</style>

<script>
export default {
    name: 'Edit',

    computed: {
        checkNeedEdit() {
            if (this.$parent.showEdit) {
                this.setCurrentTimeLine();
                this.classEdit = 'il-calendar--edit il-calendar--edit__show';
                return true
            } else {
                this.classEdit = 'il-calendar--edit';
                return false
            }
        }
    },

    data() {
        return {
            classEdit: 'il-calendar--edit',
            currentTimeLine: null,
            edit: {
                cod      : null,
                name     : null,
                start    : null,
                end      : null,
                type     : null,
                transport: null,
                status   : null,
                tara     : null
            }
        }
    },

    methods: {
        checkEdit() {
            if (this.edit.cod == null || this.edit.name == null || this.edit.start == null || this.edit.end == null || this.edit.type == null || this.edit.transport == null || this.edit.status == null || this.edit.tara == null) {
                alert('Preencha todos os campos');
                return false
            }
            /**create the events items */
            this.$parent.finishEditEvents(this.edit);

        },

        setCurrentTimeLine() {
                this.currentTimeLine = this.$parent.timeLineEdit;
            let timeLine             = this.$parent.timeLine[this.currentTimeLine].cronogram;
                this.edit.cod        = timeLine[0];
                this.edit.name       = timeLine[1];
                this.edit.start      = timeLine[2];
                this.edit.end        = timeLine[3];
                this.edit.type       = timeLine[4];
                this.edit.transport  = timeLine[5];
                this.edit.status     = timeLine[6];
                this.edit.tara       = timeLine[7];

            this.$parent.showEdit = true;
        }
    }
}
</script>
