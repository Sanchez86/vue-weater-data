<template>
    <form v-on:submit.prevent="onSubmit">
        <div>
            <country-select v-model="country" regionName :country="country" topCountry="US" />
            <region-select v-model="region" regionName :country="country" :region="region" v-on:change="title = region" />
        </div>
        <button type="submit">Create</button>
    </form>
</template>

<script>
export default{
    data(){
        return {
            title: ''
        }
    },
    methods: {
        onSubmit() {

            if(this.title){
                const newCity = {
                    id: Date.now(),
                    title: this.title,
                    display: false
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
    form{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 15px;
    }
    select{
        width: 100%;
        height: 48px;
        margin-bottom: 15px;
    }
    button{
        height: 60px;
        width: 60px;
        min-width: 60px;
        display: block;
        margin: 10px;
        border-radius: 100%;
    }
</style>