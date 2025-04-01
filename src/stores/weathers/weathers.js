import { defineStore } from 'pinia'
export const Stores_Weathers = defineStore('weathers',{
    actions : {
        Weathers_Index(params){
            return new Promise((resolve, reject) => {
                axios.post('public/weathers/exclude',params).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        }
    },




})