import {QSpinnerGears, useQuasar} from 'quasar'


export default {
    data(){
        return {
            VUE_APP_ASSET:null,
        }
    },
    created() {
        // this.VUE_APP_ASSET = import.meta.env.VITE_API_ASSET_URL

    },

    mounted() {
        const $q = useQuasar();

    },
    methods:{

        //All notifications methods
        Methods_Notify_Generator(message,color='pink-7',icon='fas fa-envelope-open-text',caption=null,timeout=null,position='top'){
            this.$q.notify({
                message: message,
                color : color,
                icon : icon,
                progress : true,
                classes : 'glossy',
                caption : caption,
                timeout : timeout,
                badgeColor : 'dark',
                badgeClass : 'glossy',
                position : position
            })
        },
        Methods_Notify_Generator_Spinner(message,color='pink-7'){
            this.$q.notify({
                message: message,
                color : color,
                progress : true,
                classes : 'glossy',
                spinner : QSpinnerGears
            })
        },
        Methods_Notify_Generator_Avatar(message,color='pink-7',avatar='assets/images/logo.png'){
            this.$q.notify({
                message: message,
                color : color,
                progress : true,
                classes : 'glossy',
                avatar : avatar
            })
        },

        //Default notification types
        Methods_Notify_Message_Success(message){
            this.Methods_Notify_Generator(message,'green-7','fa-duotone fa-regular fa-check');
        },

        Methods_Notify_Message_Error(message){
            this.Methods_Notify_Generator(message,'red-7','fa-duotone fa-regular fa-times ');
        },

        //Default notification message
        Methods_Notify_Update(){
            this.Methods_Notify_Generator('اطلاعات باموفقیت بروزرسانی شد','green-7','fa-duotone fa-regular fa-check ');
        },
        Methods_Notify_Create(){
            this.Methods_Notify_Generator('اطلاعات باموفقیت ثبت شد','green-7','fa-duotone fa-regular fa-check ');

        },
        Methods_Notify_Delete(){
            this.Methods_Notify_Generator('اطلاعات باموفقیت حذف شد','green-7','fa-duotone fa-regular fa-check ');

        },

        Methods_Notify_Error_Server(){
            this.Methods_Notify_Generator('خطای سرور : سرور پاسخگو نیست !','red-7','fa-duotone fa-regular fa-times ');
        },

        Methods_Notify_Error_Internal(){
            this.Methods_Notify_Generator('خطای داخلی : سیستم پاسخگو نیست !','red-7','fa-duotone fa-regular fa-times ');
        },

        Methods_Notify_Error_NotFound(){
            this.Methods_Notify_Generator('آیتم مورد نظر یافت نشد ! اطلاعات را بررسی کنید','red-7','fa-duotone fa-regular fa-times ');
        },

        //Validations check and error message methods
        Methods_Validation_Check(errors=[],field){
            return !!(errors[field] && errors[field].length);
        },
        Methods_Validation_Notify(){
            this.Methods_Notify_Generator('اطلاعات ارسالی ناقص است!','red-7','fa-duotone fa-regular fa-triangle-exclamation')
        },

        Methods_Validation_Errors(errors=[],field){
            return errors[field] && errors[field].length ? errors[field] : {};
        },

        //text shorter
        Methods_Text_Shorter(text,count=25){

            let text_count=text.length;
            if(text_count<= count){
                return text
            }else{
                return text.substring(0,count)+ " ..." ;
            }

        },

        //Get today date with format
        Methods_Date_Today(format = "jYYYY-jMM-jDD"){
            return moment().format(format)
        },

        Methods_Date_Jalali_To_Gregorian(date){
            return moment(date, 'jYYYY/jM/jD').format('YYYY-M-D')
        },

        Methods_Date_Gregorian_To_Jalali(date){
            return moment(date, 'YYYY-M-D').format('jYYYY-jMM-jDD')
        }


    }

}