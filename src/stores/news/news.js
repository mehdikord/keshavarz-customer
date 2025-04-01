import { defineStore } from 'pinia'
export const Stores_News = defineStore('news',{
    actions : {
        All(params){
            return new Promise((resolve, reject) => {
                axios.get('public/news',{params : params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Latest(params){
            return new Promise((resolve, reject) => {
                axios.get('public/news/latest',{params : params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

    },




})