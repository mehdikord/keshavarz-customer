import { defineStore } from 'pinia'
export const Stores_Services = defineStore('service',{
    actions : {
        Coloring_Create(items){
            return new Promise((resolve, reject) => {
                axios.post('/users/services/coloring',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Store_Answer(items){
            return new Promise((resolve, reject) => {
                axios.post('/users/questions',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Get_Answer(){
            return new Promise((resolve, reject) => {
                axios.get('/users/questions').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Remove_Answer(id){
            return new Promise((resolve, reject) => {
                axios.delete('/users/questions/'+id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },



    },




})