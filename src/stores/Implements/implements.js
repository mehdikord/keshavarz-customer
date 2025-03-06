import { defineStore } from 'pinia'
export const Stores_Implements = defineStore('implements',{
    actions : {
        Categories(){
            return new Promise((resolve, reject) => {
                axios.get('public/implements/categories').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        All(params){
            return new Promise((resolve, reject) => {
                axios.get('public/implements/implements',{params : params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

    },




})