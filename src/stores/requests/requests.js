import { defineStore } from 'pinia'
export const Stores_Requests = defineStore('requests',{
    actions : {
        Requests_Pending(){
            return new Promise((resolve, reject) => {
                axios.get('/users/search/requests/pending').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Requests_Actives(){
            return new Promise((resolve, reject) => {
                axios.get('/users/search/requests/actives').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Requests_Working(){
            return new Promise((resolve, reject) => {
                axios.get('/users/search/requests/working').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Requests_Done(){
            return new Promise((resolve, reject) => {
                axios.get('/users/search/requests/done').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Requests_Canceled(){
            return new Promise((resolve, reject) => {
                axios.get('/users/search/requests/canceled').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Requests_Show(id){
            return new Promise((resolve, reject) => {
                axios.get('/users/search/requests/'+id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Requests_Cancel(id){
            return new Promise((resolve, reject) => {
                axios.delete('/users/search/requests/cancel/'+id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },


    },




})