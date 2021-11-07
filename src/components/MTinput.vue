<template>
    <div>
        <div  v-if="editable === true">
            <input 
                :value="value" 
                @blur="updateValue()"
                v-on:keyup.enter="signalEnter()"
            >
        </div>

        <div v-else>
            {{ value }}
        </div>

    </div>
</template>

<script>
export default {
    props:{
        editable: {
            type: Boolean,
            default: false
        }, 
        value: {
            type: [String, Number]
        }
    },

    methods: {
        updateValue(){
            const inputValue = event.target.value;
            this.$emit("input", inputValue);
        },

        signalEnter(){
            this.$emit('keyup', new KeyboardEvent("keyup", {
                keyCode: 13
            }));
        }
    }

}
</script>

<style>

</style>