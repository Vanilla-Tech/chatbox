<template>
  <div v-if="showError" class="errorMessage"> {{errormessage}}</div>
</template>
<script>
export default {
    name:'message',
    props: ['errormessage'],
    methods:{
        // closeErrorAlert(){
        //     this.$emit('onCloseErrorAlert');
        // }
    },
    computed : {
        showError(){
            return this.errormessage != null && this.errormessage != '';
        }
    }
}
</script>

