import { defineStore } from 'pinia'
export const Stores_Lands = defineStore('lands',{
    actions : {
        Index(){
            return new Promise((resolve, reject) => {
                axios.get('/users/lands').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Store(params){
            return new Promise((resolve, reject) => {
                axios.post('/users/lands',params).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Remove(id){
            return new Promise((resolve, reject) => {
                axios.delete('/users/lands/'+id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

    },




})