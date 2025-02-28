import { defineStore } from 'pinia'
export const Stores_Plans = defineStore('plans',{
    actions : {
        Active(){
            return new Promise((resolve, reject) => {
                axios.get('users/plans/active').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Own(){
            return new Promise((resolve, reject) => {
                axios.get('users/plans/own').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        All(){
            return new Promise((resolve, reject) => {
                axios.get('users/plans/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
    },




})