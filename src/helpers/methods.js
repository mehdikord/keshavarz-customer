import {QSpinnerGears, useQuasar} from 'quasar'
import moment from "moment-jalaali";


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

        Methods_FormatUnixTimestamp(unixTimestamp) {
            const date = new Date(unixTimestamp * 1000);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },

        Methods_Date_Gregorian_To_Jalali(date){
            return moment(date, 'YYYY-M-D').format('jYYYY-jMM-jDD')
        },
        Methods_Parse_Weather_Code(code){
            let icon;
            let text;
            switch(code){
                case 0 :
                    icon = '01d.svg';
                    text = 'clear sky'
                    break;
                case 1:
                case 2:
                case 3:
                    icon = '02d.svg';
                    text = 'few clouds';
                    break;
                case 45:
                case 48:
                    icon = '50d.svg';
                    text = 'mist'
                    break;
                case 51:
                case 53:
                case 55:
                case 56:
                case 57:
                case 61:
                case 63:
                case 65:
                case 66:
                case 67:
                    icon = '10d.svg';
                    text = 'rain';
                    break;
                case 71:
                case 73:
                case 75:
                case 77:
                case 85:
                case 86:
                    icon = '13d.svg';
                    text = 'snow'
                    break;
                case 80:
                case 81:
                case 82:
                    icon = '09d.svg';
                    text = 'shower rain';
                    break;
                case 95:
                case 96:
                case 99:
                    icon = '11d.svg';
                    text = 'thunderstorm';
                    break;
                default:
                    icon = '';
                    text = 'unknown';
                    break;
            }
            return {icon:icon, text:text};
        }


    }

}