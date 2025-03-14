import { defineStore } from 'pinia'
export const Stores_Searching = defineStore('searching',{
    actions : {
        Requests_Working(){
            return new Promise((resolve, reject) => {
                axios.post('/users/search/providers').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },


    },




})