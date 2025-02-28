<script>
import { useQuasar} from 'quasar'
import {Stores_Profile} from "@/stores/profile/profile.js";
import {Stores_Auth} from "@/stores/auth/auth.js";
import Profile_Saved from "@/views/profile/components/Profile_Saved.vue";
import Profile_Invoices from "@/views/profile/components/Profile_Invoices.vue";
import Profile_Invoices_show from "@/views/profile/components/Profile_Invoices_show.vue";
import Profile_Plans from "@/views/profile/components/Profile_Plans.vue";

export default {
  name: "Profile",
  mounted() {
    this.Get_Profile();
  },
  components: {
    'profile_saved' : Profile_Saved,
    'profile_invoices' : Profile_Invoices,
    'profile_invoices_show' : Profile_Invoices_show,
    'profile_plans' : Profile_Plans,
  },
  data(){
    return {
      loading:true,
      edit_loading:false,
      user:null,
      dialog_edit:false,
      edit_items:{
        name:null,
        age:null,
      },
      errors :[],
      $q: useQuasar(),

    }
  },
  methods:{
    Get_Profile(){
      Stores_Profile().Index().then((res)=>{
        this.user=res.data.result;
        this.edit_items.name=this.user.name;
        this.edit_items.age=this.user.age;
        this.loading=false;
      }).catch((error)=>{
        return this.Methods_Notify_Error_Server();
      })

    },
    Edit_Profile(){
      this.edit_loading=true;
      Stores_Profile().Edit(this.edit_items).then((res)=>{
        this.user=res.data.result;
        this.edit_items.name=this.user.name;
        this.edit_items.age=this.user.age;
        this.edit_loading=false;
        this.dialog_edit=false;
        return this.Methods_Notify_Message_Success("اطلاعات کاربری باموفقیت ویرایش شد")

      }).catch((error)=>{
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.edit_loading=false;

      })

    },
    Logout(){
      this.$q.dialog({
        title: 'آیا اطمینان دارید',
        message: 'از حساب کاربری خود خارج شوید ؟',
        ok: {
          glossy: true,
          rounded: true,
          color : "green-7"
        },
        cancel: {
          glossy: true,
          rounded: true,
          color: 'red-7'
        },
        persistent: true
      }).onOk(() => {
        Stores_Auth().AuthLogout();
        this.Methods_Notify_Message_Success("از حساب کاربری خود خارج شدید")
        this.$router.push('/auth');
      }).onCancel(() => {

      }).onDismiss(() => {

      })
    }
  }
}
</script>

<template>
  <q-card class="q-mt-md q-mx-xs " flat>
    <template v-if="loading">
      <global_loading_colorful class="q-pb-lg" size="90" text="درحال دریافت اطلاعات کاربری"></global_loading_colorful>
    </template>
    <template v-else>
      <q-card-section>
        <div class="row animation-fade-in">
          <div class="col-md-2 col-sm-3 col-xs-3 q-px-sm">
            <img src="assets/images/icons/profile.png" class="profile-image" alt="">
          </div>
          <div class="col-md-10 col-sm-9 col-xs-9 q-px-sm">
            <div class="">
              <strong v-if="user.name" class="profile-name text-teal-8">{{user.name}}</strong>
              <strong v-else class="profile-name text-grey-7">( نام وارد نشده )</strong>
            </div>
            <div class="q-mt-sm">
              <strong class="profile-phone text-grey-9">{{user.phone}}</strong>
            </div>
            <div class="q-mt-sm">
              <span class="text-grey-8">سن : </span>
              <strong class=" text-red-8">{{user.age ?? '---'}}</strong>
            </div>
          </div>
          <div class="col-12 q-mt-md">
            <q-btn @click="dialog_edit=true" class="profile-btn q-mr-xs" glossy color="indigo-6"  label="ویرایش اطلاعات " icon="fa-duotone fa-regular fa-edit"></q-btn>
            <q-btn @click="Logout" class="profile-btn" color="red-7" glossy   label="خروج از حساب" icon="fa-duotone fa-regular fa-arrow-left-from-arc"></q-btn>
          </div>
        </div>
        <q-dialog
            v-model="dialog_edit"
            position="top"
        >
          <q-card style="width: 90vw;">
            <q-card-section>
              <label for="" class="text-blue-8"><strong>ویرایش اطلاعات کاربری</strong></label>
            </q-card-section>
            <q-separator/>
            <q-card-section class="q-mt-sm">
              <div class="q-px-sm">
                <q-input v-model="edit_items.name" outlined rounded label="نام کامل" :error="this.Methods_Validation_Check(errors,'name')">
                  <template v-slot:prepend>
                    <q-icon name="fa-duotone fa-solid fa-user text-purple-7" />
                  </template>
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
                  </template>
                </q-input>
              </div>
              <div class="q-px-sm q-mt-sm">
                <q-input v-model="edit_items.age" outlined rounded label="سن" type="number" :error="this.Methods_Validation_Check(errors,'age')">
                  <template v-slot:prepend>
                    <q-icon name="fa-duotone fa-solid fa-calendar-circle-user text-purple-7" />
                  </template>
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'age')" />
                  </template>
                </q-input>
              </div>
            </q-card-section>
            <q-card-actions align="right" class="q-mb-sm q-px-md q-mt-sm">
              <q-btn @click="Edit_Profile" :loading="edit_loading" size="sm" class="submit-btn" color="blue-8"  rounded glossy label="ویرایش اطلاعات" icon="fa-duotone fa-solid fa-check-circle" />
              <q-btn size="sm" class="submit-btn" color="grey-8"  rounded glossy label="بستن" icon="fa-duotone fa-solid fa-times-circle" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-section>

    </template>
  </q-card>
  <q-separator class="q-mt-sm"/>
  <q-card flat>
    <q-card-section class="q-px-sm">
      <div class="row">
        <div class="col-sm-4 col-xs-3 q-px-xs text-center">
          <router-link :to="{name: 'profile_saved'}">
            <div v-if="this.$route.name === 'profile_saved'" class="item-box cursor-pointer" style="border: 1px dashed #0882e3;background-color:#0882e3 ">
              <q-icon name="fa-duotone fa-bookmark fa-solid" color="white" size="38px"></q-icon>
              <div class="q-mt-md">
                <strong class="font-13 text-white">
                  ذخیره شده
                </strong>
              </div>
            </div>
            <div v-else class="item-box cursor-pointer" style="border: 1px dashed #0882e3">
              <q-icon name="fa-duotone fa-bookmark fa-solid" color="blue-7" size="38px"></q-icon>
              <div class="q-mt-md">
                <strong class="font-13 text-grey-9">
                  ذخیره شده
                </strong>
              </div>
            </div>
          </router-link>

        </div>
        <div class="col-sm-4 col-xs-3 q-px-xs text-center">
          <router-link :to="{name: 'profile_plans'}">
            <div v-if="this.$route.name === 'profile_plans'" class="item-box cursor-pointer" style="border: 1px dashed #d81b60;background-color:#d81b60 ">
              <q-icon name="fa-duotone fa-stars fa-solid" color="white" size="38px"></q-icon>
              <div class="q-mt-md">
                <strong class="font-13 text-white">
                  اشتراک ها
                </strong>
              </div>
            </div>
            <div v-else class="item-box cursor-pointer" style="border: 1px dashed #d81b60">
              <q-icon name="fa-duotone fa-stars fa-solid" color="pink-7" size="38px"></q-icon>
              <div class="q-mt-md">
                <strong class="font-13 text-grey-9">
                  اشتراک ها
                </strong>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-sm-4 col-xs-3 q-px-xs text-center">
          <router-link :to="{name: 'profile_invoices'}">
          <div v-if="['profile_invoices','profile_invoices_show'].includes(this.$route.name)" class="item-box cursor-pointer" style="border: 1px dashed #512da8;background-color: #512da8">
            <q-icon name="fa-duotone fa-file-invoice-dollar fa-solid" color="white" size="38px"></q-icon>
            <div class="q-mt-md">
              <strong class="font-13 text-white">
                پرداخت ها
              </strong>
            </div>
          </div>
          <div v-else class="item-box cursor-pointer" style="border: 1px dashed #512da8">
            <q-icon name="fa-duotone fa-file-invoice-dollar fa-solid" color="deep-purple-8" size="38px"></q-icon>
            <div class="q-mt-md">
              <strong class="font-13 text-grey-9">
                پرداخت ها
              </strong>
            </div>
          </div>
          </router-link>
        </div>
        <div class="col-sm-4 col-xs-3 q-px-xs text-center">
          <div class="item-box cursor-pointer" style="border: 1px dashed #00796b">
            <q-icon name="fa-duotone fa-messages-question fa-solid" color="teal-8" size="38px"></q-icon>
            <div class="q-mt-md">
              <strong class="font-13 text-grey-9">
                تیکت ها
              </strong>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <profile_saved v-if="this.$route.name === 'profile_saved'"></profile_saved>
  <profile_invoices_show v-if="this.$route.name === 'profile_invoices_show'"></profile_invoices_show>
  <profile_invoices v-if="this.$route.name === 'profile_invoices'"></profile_invoices>
  <profile_plans v-if="this.$route.name === 'profile_plans'"></profile_plans>

  <q-card class="q-mt-sm" flat>
    <q-card-section class="q-px-sm">
      <div class="row bg-deep-purple-2 rounded-borders">
        <div class="col-xs-7 col-sm-7">
          <div class="q-pa-md">
            <strong class="text-deep-purple-8 font-lalezar font-weight-100 font-22">آیا میدانستید ؟ </strong>
            <div class="q-mt-xs font-13">
              شما میتوانید درخواست رنگ موی دلخواه خود را به تیم پرگولا ارسال کنید
            </div>
            <div class="q-mt-md">
              <q-btn color="indigo-8" style="width: 100%;padding-top: 8px;padding-bottom: 8px" class="font-13" rounded glossy icon="fa-duotone fa-solid fa-palette" label="ثبت رنگ مو جدید"></q-btn>
            </div>
          </div>
        </div>
        <div class="col-xs-5 col-sm-5">
          <img class="q-mt-md" src="assets/images/background/think.svg" alt="">
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>

<style scoped>
.profile-image {
  width: 100px;
}
.profile-name{
  font-size: 16px;
}
.profile-btn{
  font-size: 13px !important;
}
.submit-btn{
  font-size: 13px !important;
}

@media only screen and (max-width: 768px) {
  .profile-image {
    width: 75px;
  }
  .profile-name{
    font-size: 15px;
  }
  .profile-phone{
    font-size: 14px;
  }
  .profile-btn{
    font-size: 12px !important;
    width: 40%;
  }
  .submit-btn{
    font-size: 12px !important;
  }
  .item-box{
    padding:8px 5px;
    border-radius: 6px;
  }
}

</style>