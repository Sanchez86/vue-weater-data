<template>
    <div class="add-location" v-bind:class="{ active: isActive }">

        <button class="add" v-on:click="myFilter">Add location</button>

        <form v-on:submit.prevent="onSubmit">
            <country-select v-model="country" regionName :country="country" topCountry="US" />
            <region-select v-model="region" regionName :country="country" :region="region" v-on:change="title = region" />
            <button class="create" type="submit">ADD</button>
        </form>

    </div>
</template>

<script>

export default{
    data(){
        return {
            title: ''
        }
    },
    data:{
        isActive: false
    },
    methods: {
        myFilter: function() {
            this.isActive = !this.isActive;
            console.log(this.isActive)
        },
        onSubmit() {

            if(this.title){
                const newCity = {
                    id: Date.now(),
                    title: this.title,
                    display: false,
                    data:[]
                };
                this.$emit('add-city', newCity);
                this.title = ''
            }
        }
    },
    data: () => ({
        country: '',
        region: ''
    })
}
</script>

<style scoped>
    .add-location{
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        height: 50px;
        overflow: hidden;
        z-index: 10;
        background-color: #808080;
        transition: 1s;
        background-image: url("../assets/sky.jpg");
    }
    .add-location:after{
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #0003;
    }
    .add-location.active{
        height: 340px;
    }
    .add{
        color: #FFF;
        background-color: #808080;
        text-transform: uppercase;
        text-align: center;
        font-size: 16px;
        border: 0;
        width: 100%;
        height: 50px;
        cursor:pointer;
        margin-bottom: 15px;
        position: relative;
        z-index: 1;
    }

    form{
        width: 100%;
        max-width: 300px;
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
        position: relative;
        z-index: 1;
    }
    select{
        width: 100%;
        height: 48px;
        margin-bottom: 15px;
        background-color: #ffffffdb;
        border: 0;
        padding: 10px;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        background-size: 13px;
        background-repeat: no-repeat;
        background-position: 93%;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjg0LjkyOXB4IiBoZWlnaHQ9IjI4NC45MjlweCIgdmlld0JveD0iMCAwIDI4NC45MjkgMjg0LjkyOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjg0LjkyOSAyODQuOTI5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PHBhdGggZD0iTTI4Mi4wODIsNzYuNTExbC0xNC4yNzQtMTQuMjczYy0xLjkwMi0xLjkwNi00LjA5My0yLjg1Ni02LjU3LTIuODU2Yy0yLjQ3MSwwLTQuNjYxLDAuOTUtNi41NjMsMi44NTZMMTQyLjQ2NiwxNzQuNDQxTDMwLjI2Miw2Mi4yNDFjLTEuOTAzLTEuOTA2LTQuMDkzLTIuODU2LTYuNTY3LTIuODU2Yy0yLjQ3NSwwLTQuNjY1LDAuOTUtNi41NjcsMi44NTZMMi44NTYsNzYuNTE1QzAuOTUsNzguNDE3LDAsODAuNjA3LDAsODMuMDgyYzAsMi40NzMsMC45NTMsNC42NjMsMi44NTYsNi41NjVsMTMzLjA0MywxMzMuMDQ2YzEuOTAyLDEuOTAzLDQuMDkzLDIuODU0LDYuNTY3LDIuODU0czQuNjYxLTAuOTUxLDYuNTYyLTIuODU0TDI4Mi4wODIsODkuNjQ3YzEuOTAyLTEuOTAzLDIuODQ3LTQuMDkzLDIuODQ3LTYuNTY1QzI4NC45MjksODAuNjA3LDI4My45ODQsNzguNDE3LDI4Mi4wODIsNzYuNTExeiIvPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4=);
    }
    .create{
        height: 110px;
        width: 110px;
        min-width: 60px;
        display: block;
        margin: 10px;
        border-radius: 100%;
        border: 0;
        background-color: transparent;
        background-image: url("../assets/sunny.png");
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
        opacity: 0.8;
        transition: .5s;
    }
    .create:hover{
        opacity: 1;
    }
</style>