import {Stores_Auth} from "@/stores/auth/auth.js";

export default {
    created() {
        window.axios.defaults.headers.common['Authorization'] = "Bearer "+Stores_Auth().AuthGetToken;
    },

}