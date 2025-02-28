//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Imports packages and libs
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar,Notify,LoadingBar,Dialog } from 'quasar'
import quasarLang from 'quasar/lang/fa-IR'
import quasarIconSet from 'quasar/icon-set/mdi-v7'
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import methods from './helpers/methods.js';
import before_created from "@/helpers/before_created.js";
import './helpers/axios.js';
// Import icon libraries
import '@quasar/extras/mdi-v7/mdi-v7.css'
// Import CSSs
import 'quasar/dist/quasar.css'
import 'assets/css/app.css'
import 'assets/css/font.css'
import 'assets/css/animations.css'
import 'assets/css/responsive.css'
import moment from "moment-jalaali";
import {Stores_Auth} from "@/stores/auth/auth.js";





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// App configs and uses
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const app = createApp(App)
app.use(router)
app.use(Quasar, {
        plugins: {
            Notify,
            LoadingBar,
            Dialog
        }, // import Quasar plugins and add here
    lang: quasarLang,
    iconSet: quasarIconSet,

})


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Globals Filters
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.config.globalProperties.$filters={

    text_shorter(text,count=25){

        let text_count=text.length;
        if(text_count<= count){
            return text
        }else{
            return text.substring(0,count)+ " ..." ;
        }

    },
    date_jalali(value,format='jYYYY/jM/jD  H:m:s'){
        return moment(value).format(format);
    },

    number_format(value){
        if (value){
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Globals components
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import Global_Loadings_Colorful from "@/components/global/loading/Global_Loadings_Colorful.vue";
import Global_Validations_Errors from "@/components/global/validations/Global_Validations_Errors.vue";
import Global_Searching from "@/components/global/loading/Global_Searching.vue";
import Global_Empty from "@/components/global/loading/Global_Empty.vue";

app.component("global_loading_colorful",Global_Loadings_Colorful)
app.component("global_searching",Global_Searching)
app.component("global_empty",Global_Empty)
app.component("global_validations_errors",Global_Validations_Errors)



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.mixin(before_created);
app.mixin(methods);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia);
Stores_Auth().AuthSyncData();
app.mount('#app')


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

