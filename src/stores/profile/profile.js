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
        Locations(){
            return new Promise((resolve, reject) => {
                axios.get('public/provinces').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Edit(items){
            return new Promise((resolve, reject) => {
                axios.post('/users/profile',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Edit_Image(items){
            let data = new FormData();
            if (items.image){data.append('image', items.image,items.image.name);}
            return new Promise((resolve, reject) => {
                axios.post('/users/profile/image',items,{headers: {'Content-Type': 'multipart/form-data'}}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

    },




})