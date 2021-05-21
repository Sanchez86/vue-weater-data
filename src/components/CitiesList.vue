<template>
    <ul class="list" v-bind:class="{active: test}">
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
    import CityListItem from '@/components/CityListItem';

    let test = false;

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
                test = true;
                console.log('test',test);
            }
        }
    }
</script>

<style scoped>
    .list{
        padding: 0;
        max-height: 100vh;
        overflow-y: scroll;
        transition: .5s;
    }
    .app.open .list{
        max-height: 58vh;
    }
    .list::-webkit-scrollbar {
        width: 2px;
        padding-left: 10px;
    }

    .list::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    .list::-webkit-scrollbar-thumb {
        background-color: #03a9f4;
    }
</style>