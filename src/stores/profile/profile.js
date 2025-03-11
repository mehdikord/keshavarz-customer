import { defineStore } from 'pinia'
export const Stores_Profile = defineStore('profile',{
    actions : {
        Index(){
            return new Promise((resolve, reject) => {
                axios.get('/users/profile').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Edit(items){
            return new Promise((resolve, reject) => {
                axios.put('/users/profile',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
    },




})