import { defineStore } from 'pinia'
export const Stores_Auth = defineStore('auth',{
    state : ()=>({
        user : null,
        token : null
    }),
    actions : {
        AuthLogin(user,token){
            this.user = user;
            this.token = token
            localStorage.setItem('customer_keshavarz_token', token)
            localStorage.setItem('customer_keshavarz_user', JSON.stringify(user));
        },
        AuthLogout(){
            this.user = null;
            this.token = null
            localStorage.removeItem('customer_keshavarz_token')
            localStorage.removeItem('customer_keshavarz_user');
        },
        AuthSyncData(){
            if (localStorage.getItem('customer_keshavarz_token')){
                this.token = localStorage.getItem('customer_keshavarz_token');
            }
            if (localStorage.getItem('customer_keshavarz_user')){
                this.user = JSON.parse(localStorage.getItem('customer_keshavarz_user'));
            }
        }
    },
    getters :{
        AuthGetUser(){
            return this.user;
        },
        AuthGetToken(){
            return this.token;
        },
        AuthGetCheckAuth(){
            return !!this.token;
        }
    }




})