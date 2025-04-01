<script>
import {Stores_Auth} from "@/stores/auth/auth.js";

export default {
  name: "Auth",
  created() {
    if (localStorage.getItem('customer_keashavarz_otp_phone')){
      this.phone_form=false;
      this.phone = localStorage.getItem('customer_keashavarz_otp_phone')
    }

  },
  data(){
    return {
      phone_loading:false,
      code_loading:false,
      phone_form:true,
      phone:null,
      code:null,
      errors:[]
    }
  },
  methods:{
    Send_Phone(){
      this.phone_loading=true;
      axios.post("/users/auth",{phone : this.phone}).then(res => {
        this.Methods_Notify_Message_Success("کد احراز هویت به شماره موبایل شما ارسال شد");
        localStorage.setItem('customer_keashavarz_otp_phone',this.phone);
        this.phone_form = false;
        this.phone_loading=false;
      }).catch(error => {
        if (error.response.status === 409){
          this.Methods_Notify_Message_Error(error.response.data.error)
        }else{
          this.Methods_Notify_Error_Server();
        }
        this.phone_loading=false;

      })


    },
    Send_Code(){
      this.code_loading=true;
      let data = {
        code : this.code,
        phone : this.phone
      }
      axios.post("/users/auth/check",data).then(res => {
        Stores_Auth().AuthLogin(res.data.result.user,res.data.result.token)
        localStorage.removeItem('customer_keashavarz_otp_phone');
        this.Methods_Notify_Message_Success("باموفقیت وارد حساب کاربری خود شدید");
        this.$router.push({name : 'index'})
      }).catch(error => {
        if (error.response.status === 422) {
          this.errors = error.response.data;
          this.Methods_Validation_Notify();
        }else if (error.response.status === 409){
          this.Methods_Notify_Message_Error(error.response.data.error)
        }else{
          this.Methods_Notify_Error_Server();
        }
        this.code_loading=false;

      })



    },


  }
}
</script>

<template>
  <q-card flat class="q-pt-xl">
    <q-card-section >
      <div class=" text-center q-mt-md res-page-title font-lalezar text-teal-6 animation-fade-in">
        ورود به حساب کاربری کشاورز
      </div>
      <div class="text-center q-mt-md">
        <img v-if="phone_form" class="bg-image" src="assets/images/background/mobile-login-animate.svg" alt="" >
        <img v-else class="bg-image" src="assets/images/background/sms-animate.svg" alt="" >

      </div>
    </q-card-section>
    <q-card-section class="q-pt-none" >
      <template v-if="phone_form">
        <div class="row justify-center animation-fade-in">
          <div class="col-sm-9 col-xs-10 col-md-6 col-lg-4 col-xl-4 text-center">
            <strong class="text-teal-8">شماره موبایل خود را وارد کنید</strong>
            <div class="q-mt-md">

              <q-input  v-model="phone" type="number" dir="ltr" outlined rounded color="blue-grey-4" placeholder="09XX XXX XXXX" >
                <template v-slot:append>
                  <q-icon name="fa-duotone fa-regular fa-mobile-button text-blue" />
                </template>


              </q-input>
            </div>
            <div class="q-mt-lg text-center">
              <q-btn @click="Send_Phone" :loading="phone_loading" class="auth-btn"  rounded label="ورود به حساب " color="teal-6" style="width: 100%"></q-btn>
            </div>
          </div>
        </div>

      </template>
      <template v-else>
        <div class="row justify-center animation-fade-in">
          <div class="col-sm-9 col-xs-10 col-md-6 col-lg-4 col-xl-4 text-center">
            <strong class="text-teal-7">کد پیامک شده به شماره موبایل را وارد کنید</strong>
            <div class="q-mt-md">
              <q-input :error="this.Methods_Validation_Check(errors,'code')" v-model="code" dir="ltr" outlined rounded color="blue-grey-4" placeholder="X X X X X X" >
                <template v-slot:append>
                  <q-icon name="fa-duotone fa-regular fa-message-sms text-blue-9" />
                </template>
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'code')" />
                </template>
              </q-input>
            </div>
            <div class="q-mt-lg text-center">
              <q-btn @click="Send_Code" :loading="code_loading" class="auth-btn" rounded label="ارسال کد و ورود به حساب " color="teal-7" style="width: 100%"></q-btn>
              <div class="q-mt-lg">
                <strong @click="phone_form = true" class="text-blue-8 cursor-pointer">ویرایش شماره موبایل</strong>
              </div>
            </div>
          </div>
        </div>

      </template>


    </q-card-section>
  </q-card>
</template>

<style scoped>
.bg-image{
  max-width: 390px;
}
.auth-btn{
  font-size: 16px;
  padding: 12px 0;
}
@media only screen and (max-width: 768px) {

  .bg-image{
    max-width: 270px;
  }
  .auth-btn{
    font-size: 14px;
    padding: 14px 0;
  }

}




</style>