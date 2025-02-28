import { defineStore } from 'pinia'
export const Stores_Colors = defineStore('colors',{
    actions : {
        All(){
            return new Promise((resolve, reject) => {
                axios.get('colors').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Grouping(params){
            return new Promise((resolve, reject) => {
                axios.get('colors/grouping',{params : params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        }
    },




})