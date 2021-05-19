<template>
    <li class="item">
        <span>
            <label v-bind:class="{show: city.display}">
                <span>Show</span>
                <input type="radio"
                       name="cityName"
                v-on:change="city.display = !city.display; $emit('checked-city', city.id)"/>
                <strong>{{index+1}}</strong>
                {{city.title}}
            </label>
        </span>
        <button class="delete"
                v-on:click="$emit('remove-city', city.id)">
        &times;</button>
    </li>
</template>

<script>
    export default {
        props: {
            city: {
                type: Object,
                required: true
            },
            index:{
               type: Number,
               required: true
            }
        }
    }
</script>

<style scoped>
    .item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid green;
        margin: 15px auto;
        padding: 10px;
    }
    label{
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor:pointer;
    }
    input{
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
    strong{
        margin-right: 10px;
    }
    .delete{
        display: block;
        border-radius: 100%;
        border:0;
        background-color: palevioletred;
        color:#fff;
        width: 20px;
        height: 20px;
        cursor:pointer;
    }
    .show{
        /*text-decoration: line-through;*/
    }
</style>