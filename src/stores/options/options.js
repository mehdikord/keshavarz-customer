import { defineStore } from 'pinia'
export const Stores_Options = defineStore('options',{
    actions : {
        All(){
            return new Promise((resolve, reject) => {
                axios.get('options').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        }
    },




})