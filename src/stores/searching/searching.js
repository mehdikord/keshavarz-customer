import { defineStore } from 'pinia'
export const Stores_Searching = defineStore('searching',{
    actions : {
        Searching(params){
            return new Promise((resolve, reject) => {
                axios.post('/users/search/providers',params).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Searching_Send_Request(params){
            return new Promise((resolve, reject) => {
                axios.post('users/search/requests',params).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Searching_Remove_Request(params){
            return new Promise((resolve, reject) => {
                axios.post('users/search/requests',params).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Searching_Provider_Profile(id){
            return new Promise((resolve, reject) => {
                axios.get('users/search/providers/profile/'+id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Searching_Request_Users(id){
            return new Promise((resolve, reject) => {
                axios.get('users/search/requests/users/'+id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Searching_Cities(name){
            return new Promise((resolve, reject) => {
                axios.get('public/cities',{params : {name : name}}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },


    },




})