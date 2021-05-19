<template>
    <div class="">
        <h2>Weater data: <u>{{dataCity.name}}</u></h2>

        {{dataCity}}
    </div>
</template>

<script>
    export default {
        props: {
            dataCity: {
                type: Object,
                required: true
            },
        }
    }
</script>

<style scoped>

</style>