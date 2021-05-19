<template>
    <ul>
        <CityListItem
            v-for="(city, i) of cities"
            v-bind:city="city"
            v-bind:index="i"
            v-on:remove-city="removeCity"
            v-on:checked-city="checkedCity"
        />
    </ul>
</template>

<script>
    import CityListItem from '@/components/CityListItem'
    export default {
        props:['cities'],
        components: {
            CityListItem
        },
        methods: {
            removeCity(id){
                this.$emit('remove-city', id);
            },
            checkedCity(id){
                this.$emit('checked-city', id);
            }
        }
    }
</script>

<style scoped>
    ul{
        padding: 0;
    }
</style>